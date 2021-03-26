<template>
  <div>
    <v-container fluid>
      <section v-if="dataPkg.data_guru != ''">
        <v-row>
          <v-col>
            <h1>Conrim PKG</h1>
          </v-col>         
        </v-row>

        {{dataPkg}}
        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <v-card
              elevation="4"
              class="mx-auto mt-5"

            >
              <v-card-title class="justify-center">Konfirmasi</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form
                  ref="formConfirmPkg"
                  v-model="validConfirmPkg"
                  lazy-validation
                >

                <v-textarea
                  v-model="masukan"
                  label="Masukkan Untuk Guru"
                  :rules="masukanRules"
                  filled
                  auto-grow
                ></v-textarea>
                  

                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="info"
                  class="mr-4"
                >
                  Confirm
                </v-btn>

                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  class="mr-4"
                  @click="batal"
                >
                  Batal
                </v-btn>

                <v-btn
                  color="success"
                  class="mr-4"
                  @click="simpan"
                >
                  Simpan
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-card
              elevation="4"
              class="mx-auto mt-5"
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
                <strong>Nama : </strong>{{ dataGuru.name }}
                <br>
                <strong>Email : </strong>{{ dataGuru.email }}
                <br>
                <strong>NIP : </strong>{{ dataGuru.nip }}
              </v-card-subtitle>
              <v-divider></v-divider>
              <v-card-subtitle>
                <strong>Tanggal : </strong>{{ dataPkg.tanggal }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <section v-else>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            lg="6"
            md="8"
            align-self="center"
          >
            <v-card
              elevation="4"
              class="mx-auto mt-5 "
              max-width="80%"
            >
              <v-card-title class="justify-center">Alert !</v-card-title>

              <v-divider></v-divider>
              
              <center>
                <h1>Silahkan Mulai dari Awal !</h1>
              </center>

              <v-card-text>
                
              </v-card-text>
              <v-card-subtitle>
                Navigase di App Drawer ..
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import 'vue-sweetalert2';

export default {
  name: 'pkgConfirm',

  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,
      validConfirmPkg: false,

      dataGuru: {},
      currentPhotoProfile: '',

      masukan: '',
      masukanRules: [
        v => !!v  || 'Masukan di Perlukan !',
      ]
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      prevUrl : 'prevUrl/prevUrl',
      dataPkg: 'pkg/dataPkg'
    }),
  },

  mounted() {
    this.getCurrentDataGuru()
  },

  methods: {
    ...mapActions({
      setAlert  : 'alert/set',
      setDialog : 'dialog/set',
      setAuth   : 'auth/set',
      setMasukan : 'pkg/doSetMasukan',
      setClear : 'pkg/doSetClear'
    }),

    async simpan(e) {
      e.preventDefault()

      if (!this.$refs.formConfirmPkg.validate()) {
        this.setAlert({
          status : true,
          color  : 'error',
          text  : 'Isi Data dengan Lengkap !',
        })
      } else {

        const sw = await this.$swal.fire({
          title: 'Are you sure?',
          text: `Anda Akan Menyimpan nya ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes !'
        })
        
        if (sw.value) {
        
          try {
          
            this.setDialog({
              status : true,
            })

            await this.setMasukan(this.masukan)

            let config = {
              headers: {
                'Authorization': this.user.api_token,
              }
            }

            let formData = new FormData()

            this.dataPkg.indikator.forEach(element => {
              formData.append('pernyataan[]', element)
            });

            formData.append('data_guru', this.dataPkg.data_guru)
            formData.append('tanggal', this.dataPkg.tanggal)
            formData.append('masukan', this.dataPkg.masukan)
            

            let checkRole 

            if(this.user.profile.role == 'guru') {
              checkRole = 'teman-sejawat'
            } else if(this.user.profile.role == 'siswa') {
              checkRole = 'siswa'
            } else {
              checkRole = 'orang-tua'
            }

            await axios.post(`${this.api_url}/user/survey/store/${checkRole}`, formData, config)

            this.setClear()

            this.$router.push(`/${checkRole}/home`)

            this.setDialog({
              status : false,
            })

          } catch (error) {
            this.setAlert({
              status : true,
              color  : 'error',
              text  : error,
            })
          }

        }

      }

    },

    async getCurrentPP() {

      let completeFileName = this.dataGuru.profile_picture
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

    async getCurrentDataGuru() {
      try {
        
        this.setDialog({
          status : true,
        })
        
        let config = {
          headers: {
            'Authorization': this.user.api_token,
          }
        }

        const response = await axios.get(this.api_url + '/admin/data/guru/specific/' + this.dataPkg.data_guru, config)

        this.dataGuru = response.data.data

        if (this.dataGuru.profile_picture) {
          this.getCurrentPP()
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

    async beforeRouteUpdate (to, from, next) {
      if (parseInt(to.params.idQuestion) == 14) {
        const sw = await this.$swal.fire({
          title: 'Are you sure?',
          text: `Anda Akan Mereset Penilaian !`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes !'
        })
        
        if (sw.value) {
          this.$router.go('/')
        } else {
          next(false)
        }
      } else{
        next()
      }
    },

    batal() {
      this.$router.go('/')
    }

  }

}
</script>

<style>

</style>