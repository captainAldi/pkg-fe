<template>
  <div>
    <v-container fluid>
      <h1>Data Guru Admin</h1>

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
          small
          class="mx-2"
          icon
          color="success" 
          to="/admin/data-guru/create"
        >
            <v-icon dark>mdi-plus-box-multiple-outline</v-icon>
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

        this.tableLoading = false
      } catch (error) {
        console.log(error.response.message)
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

    }
  }
}
</script>

<style>

</style>