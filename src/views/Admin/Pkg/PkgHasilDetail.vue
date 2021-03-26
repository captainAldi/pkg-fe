<template>
  <div>
    <v-container fluid v-if="pkgDetail.length != 0">
      <v-row>
        <v-col
          cols="12"
        >
          <h1>Ini detail PKG</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="2"
        >
          <v-card
            elevation="4"
            class="mx-auto"
            max-width="100%"
            ripple
          >
            <v-card-title class="justify-center">
              <section
                v-if="currentPhotoProfile != ''"
              >
                <center>
                  <v-avatar size="80">
                    <img
                      :src="currentPhotoProfile"
                      alt="Avatar"
                    >
                  </v-avatar>
                </center>
              </section>


              <section
                v-else
              >
                <center>
                  <v-avatar>
                    <img
                      :src="require('@/assets/aplikasi/noimage.png')"
                      alt="Avatar"
                    >
                  </v-avatar>
                </center>
              </section>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle>
              <strong>Nama : </strong>{{ pkgDetail.dataUser.name }}
              <br>
              <strong>Email : </strong>{{ pkgDetail.dataUser.email }}
              <br>
              <strong>NIP : </strong>{{ pkgDetail.dataUser.nip }}
              <br>
              <strong>No HP : </strong>{{ pkgDetail.dataUser.no_hp }}
              <br>
              <strong>Mata Pelajaran : </strong>{{ pkgDetail.dataUser.mata_pelajaran }}
              <br>
              <strong>Kelas : </strong>{{ pkgDetail.dataUser.kelas }}
            </v-card-subtitle>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="2"
        >
          <v-card
            color="green darken-2"
            dark
            elevation="4"
            ripple
          >
            <v-card-title>
              {{pkgDetail.countKeteranganAmatBaik}}
            </v-card-title>

            <v-card-subtitle>Amat Baik</v-card-subtitle>

            <v-divider></v-divider>

            <v-card-subtitle><strong>Nilai >= 91</strong></v-card-subtitle>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="2"
          elevation="4"
        >
          <v-card
            color="light-blue darken-2"
            dark
            ripple
          >
            <v-card-title>
              {{pkgDetail.countKeteranganBaik}}
            </v-card-title>

            <v-card-subtitle>Baik</v-card-subtitle>

            <v-divider></v-divider>

            <v-card-subtitle><strong>Nilai >= 76</strong></v-card-subtitle>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="2"
          elevation="4"
        >
          <v-card
            color="cyan darken-2"
            dark
            ripple
          >
            <v-card-title>
              {{pkgDetail.countKeteranganCukup}}
            </v-card-title>

            <v-card-subtitle>Cukup</v-card-subtitle>

            <v-divider></v-divider>

            <v-card-subtitle><strong>Nilai >= 61</strong></v-card-subtitle>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="2"
          elevation="4"
        >
          <v-card
            color="orange darken-2s"
            dark
            ripple
          >
            <v-card-title>
              {{pkgDetail.countKeteranganSedang}}
            </v-card-title>

            <v-card-subtitle>Sedang</v-card-subtitle>

            <v-divider></v-divider>

            <v-card-subtitle><strong>Nilai >= 51</strong></v-card-subtitle>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="2"
          elevation="4"
        >
          <v-card
            color="red darken-2"
            dark
            ripple
          >
            <v-card-title>
              {{pkgDetail.countKeteranganKurang}}
            </v-card-title>

            <v-card-subtitle>Kurang</v-card-subtitle>

            <v-divider></v-divider>

            <v-card-subtitle>
              <strong v-html="'Nilai =< 50'"></strong>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-col
          cols="12"
          md="6"
        >
           <v-card
            elevation="4"
            ripple
          >
            <v-card-title>
              Tabulasi Data
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
              color="red lighten-1" 
              @click="exportPDF"
            >
              <v-icon dark>mdi-file-pdf-outline</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-card-subtitle>
              <v-data-table
                :headers="headers"
                :items="pkgDetail.dataFeedback"
                :search="search"
                mobile-breakpoint="0"
              >
                <template v-slot:item="row">
                  <tr>
                    <td>{{row.index + 1}}</td>
                    <td>{{row.item.user.name}}</td>
                    <td>{{row.item.nilai_akhir}}</td>
                    <td>{{ row.item.pengguna.name }}</td>
                    <td>{{row.item.keterangan}}</td>
                    <td>{{row.item.tanggal}}</td>
                    <td>{{row.item.masukan}}</td>
                    <td>
                      <v-btn
                        small
                        class="mx-2"
                        icon
                        color="pink" 
                        :disabled="row.item.pengguna.role != 'admin'"
                        @click="showDetail(row.item)"
                      >
                          <v-icon dark>mdi-file-document-multiple-outline</v-icon>
                      </v-btn>
                    </td>
                  </tr>
              </template>
              </v-data-table>
            </v-card-subtitle>

            <v-divider></v-divider>

            <v-card-subtitle><strong>Hasil PKG</strong></v-card-subtitle>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
           <v-card
            elevation="4"
            ripple
          >
            <v-card-title>
              Chart Tahunan Oleh Kepala Sekolah
            </v-card-title>

            <v-card-subtitle>
              <BarChart :chartdata="dataChart" :options="optionChart"/>
            </v-card-subtitle>

            <v-divider></v-divider>

            <v-card-subtitle><strong>Hasil PKG</strong></v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'pkgHasilDetail',
  components: {
    BarChart: () => import( /* webpackChunkName: "barChart" */ '@/components/Admin/Pkg/BarChart.vue'),
  },
  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,

      pkgDetail: [],
      idProfile: '',
      currentPhotoProfile: '',

      headers: [
        { text: 'No', value: 'index', sortable: false},
        {
          text: 'Nama',
          align: 'start',
          value: 'user',
        },
        { text: 'Nilai', value: 'nilai_akhir' },
        { text: 'Penilai', value: 'pengguna.name', sortable: false },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Masukan', value: 'masukan' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      search: '',

      dataChart: {},
      optionChart: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.ambilDataUrl()
    this.getCurrentData()
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

    ambilDataUrl() {
      this.idProfile = this.$route.params.idGuru
    },

    async getCurrentData() {
      try {
        
        this.setDialog({
          status : true,
        })
        
        let config = {
          headers: {
            'Authorization': this.user.api_token,
          }
        }

        const response = await axios.get(this.api_url + '/admin/feedback/hasil/' + this.idProfile, config)

        this.pkgDetail = response.data.data

        if (this.pkgDetail.dataUser.profile_picture) {
          this.getCurrentPP()
        }

        this.dataChart = {
          labels: this.pkgDetail.chartFeedbackTahun,
          datasets: [{
            label: "Nilai Akhir PKG",
            data: this.pkgDetail.chartFeedbackNilai,
            borderWidth: 1,
            backgroundColor: 'rgba(60,141,188,0.9)',
          }]
        }

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
          text  : error.response.data.message,
        })
      }
    },

    async getCurrentPP() {

      let completeFileName = this.pkgDetail.dataUser.profile_picture
      let fileName  = completeFileName.split('.').shift()
      let fileExt = completeFileName.split('.').pop()

      let newUrlPP = `${this.api_url}/files/profile-picture/${fileName}/${fileExt}`

      let testGCS = await axios.get(newUrlPP)

      if(testGCS.data.includes('https://storage.googleapis.com/pkg-biasa.appspot.com/')) {
        this.currentPhotoProfile = `https://storage.googleapis.com/pkg-biasa.appspot.com/data-aplikasi/profile-picture/${completeFileName}`
      } else {
        this.currentPhotoProfile = newUrlPP
      }

    },

    showDetail(item) {
      this.$router.push(`/admin/hasil-pkg/${this.idProfile}/${item.id}`)
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

        const response = await axios.get(`${this.api_url}/admin/cetak/pkg/${this.idProfile}`, config)

        const downloadUrl = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));

        // Get Date Time
        let dateTimeNow = new Date()

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${this.pkgDetail.dataUser.id}-${dateTimeNow.getDate()}${dateTimeNow.getMonth()}${dateTimeNow.getFullYear()}-${dateTimeNow.getHours()}${dateTimeNow.getMinutes()}.pdf`); //any other name + extension
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