<template>
  <div>
    <v-container fluid>
      <h1>Data Guru</h1>

      <v-card>
        <v-card-title>
          Data Guru
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-btn
          dark
          small
          class="ma-2"
          color="success" 
          to="/admin/data-guru/create"
        >
          <v-icon dark>mdi-plus-box-multiple-outline</v-icon>
        </v-btn>

        <v-btn
          dark
          small
          color="red lighten-1" 
          @click="exportPDF"
          class="ma-2"
        >
          <v-icon dark>mdi-file-pdf-outline</v-icon>
        </v-btn>

        <v-data-table
          :headers="headers"
          :items="dataGuru"
          :search="search"
          :loading="tableLoading"
          mobile-breakpoint="0"
        >
          <template v-slot:item="row">
              <tr>
                <td>{{row.index + 1}}</td>
                <td>{{row.item.name}}</td>
                <td>{{row.item.email}}</td>
                <td>{{row.item.nip}}</td>
                <td>{{row.item.no_hp}}</td>
                <td>
                  <ul>
                    <li v-for="(item, index) in row.item.mata_pelajaran" :key="index">
                      {{item}}
                    </li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li v-for="(item, index) in row.item.kelas" :key="index">
                      {{item}}
                    </li>
                  </ul>
                </td>
                <td>
                    <v-btn
                      small
                      class="mx-2"
                      icon
                      color="pink" 
                      @click="editData(row.item)"
                    >
                        <v-icon dark>mdi-circle-edit-outline</v-icon>
                    </v-btn>

                    <v-btn
                      small
                      class="mx-2"
                      icon
                      color="pink" 
                      @click="deleteData(row.item)"
                    >
                        <v-icon dark>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </td>
              </tr>
          </template>
        </v-data-table>

      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import 'vue-sweetalert2';

export default {
  name: 'DataGuru',
  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,
      search: '',
      tableLoading: false,
      headers: [
        { text: 'No', value: 'no', sortable: false },
        { text: 'Nama', value: 'name' },
        { text: 'E-Mail', value: 'email' },
        { text: 'NIP', value: 'nip' },
        { text: 'No HP', value: 'no_hp' },
        { text: 'Mata Pelajaran', value: 'mata_pelajaran' },
        { text: 'Kelas', value: 'kelas' },
        { text: 'Actions', value: 'controls', sortable: false },
      ],
      dataGuru: []
    }
  },
  mounted() {
    this.getAllGurus()
  },
  computed: {
    ...mapGetters({
      user  : 'auth/user',
      guest : 'auth/guest'
    }),
  },
  methods: {
    ...mapActions({
      setAlert  : 'alert/set',
      setAuth   : 'auth/set',
      setDialog : 'dialog/set'
    }),
    
    async getAllGurus() {
      try {

        this.tableLoading = true

        let config = {
          headers: {
            'Authorization': this.user.api_token
          }
        }

        let response = await axios.get(this.api_url + '/admin/data/guru/semua', config)

        this.dataGuru = response.data.data

        // Mapping String to Array

        let dataGuruBaru = this.dataGuru.map(element => ({
          id: element.id,
          name: element.name,
          email: element.email,
          role: element.role,
          nip: element.nip,
          profile_picture: element.profile_picture,
          jam_mengajar: element.jam_mengajar,
          email_verified_at: element.email_verified_at,
          kelas: element.kelas != null ? element.kelas.split(', ') : element.kelas,
          no_hp: element.no_hp,
          mata_pelajaran: element.mata_pelajaran != null ? element.mata_pelajaran.split(', ') : element.mata_pelajaran,
          created_at: element.created_at,
          updated_at: element.updated_at
        }))

        this.dataGuru = dataGuruBaru

        this.tableLoading = false
      } catch (error) {
        console.log(error)
      }
    },

    editData(e) {
      this.$router.push('data-guru/edit/' + e.id)
    },

    async deleteData(e) {
      const sw = await this.$swal.fire({
        title: 'Are you sure?',
        text: `Delete "${e.name}" ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      
      if (sw.value) {
        try {
          
          this.setDialog({
            status : true,
          })
          
          let config = {
            headers: {
              'Authorization': this.user.api_token
            }
          }

          const response = await axios.delete(this.api_url + '/admin/data/guru/' + e.id, config)

          this.setDialog({
            status : false,
          })

          this.getAllGurus()

          this.setAlert({
            status : true,
            color  : 'success',
            text  : response.data.message,
          })
          

        } catch (error) {
          this.setAlert({
            status : true,
            color  : 'error',
            text  : error.response.data,
          })
        }
      } 

    },

    async exportPDF() {
      try {
        
        this.setDialog({
          status : true,
        })
        
        let config = {
          headers: {
            'Authorization': this.user.api_token,
          },
          responseType: 'blob',
        }

        const response = await axios.get(`${this.api_url}/admin/data/guru/cetak`, config)

        const downloadUrl = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));

        // Get Date Time
        let dateTimeNow = new Date()

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `data-guru-${dateTimeNow.getDate()}${dateTimeNow.getMonth()}${dateTimeNow.getFullYear()}-${dateTimeNow.getHours()}${dateTimeNow.getMinutes()}.pdf`); //any other name + extension
        document.body.appendChild(link);
        link.click();
        link.remove();  

        this.setDialog({
          status : false,
        })

      } catch (error) {
        this.setDialog({
          status : false,
        })
        
        this.setAlert({
          status : true,
          color  : 'error',
          text  : error,
        })
      }
    }
  }
}
</script>

<style>

</style>