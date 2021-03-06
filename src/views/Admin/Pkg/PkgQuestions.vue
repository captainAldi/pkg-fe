<template>
  <div>
    <v-container fluid>
      <section v-if="dataPkg.data_guru != ''">
        <v-row>
          <v-col>
            <h1>Pertanyaan PKG</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <v-card
              elevation="4"
              class="mx-auto mt-5"

            >
              <v-card-title class="justify-center">{{ judulKompetensi.judul }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form
                  ref="formQuestionPkg"
                  v-model="validQuestionPkg"
                  lazy-validation
                >
                  <ol>
                    <section
                      v-for="(item, index) in pertanyaan"
                      :key="index"
                    >
                      <li>{{ item.judul }}</li>
                      <v-radio-group v-model="jawabanParsial[index]" :rules="jawabanRules">
                        <v-radio
                          v-for="(item, index) in jawaban"
                          :key="item"
                          :label="index"
                          :value="item"
                          autofocus
                        >
                        </v-radio>
                      </v-radio-group>
                    </section>
                  </ol>

                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="info"
                  class="mr-4"
                >
                  {{ idKompetensi }} of 14
                </v-btn>

                <v-spacer></v-spacer>
                <v-btn
                  v-if="idKompetensi == 14"
                  color="error"
                  class="mr-4"
                  @click="batal"
                >
                  Batal
                </v-btn>

                <v-btn
                  v-if="idKompetensi == 14"
                  color="error"
                  class="mr-4"
                  @click="finalStep"
                >
                  Final Step
                </v-btn>

                <section
                  v-if="parseInt(idKompetensi) < 14"
                >
                  <v-btn
                    :disabled="!validQuestionPkg"
                    color="success"
                    class="mr-4"
                    @click="nextQuestion"
                  >
                    Next
                  </v-btn>

                  <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
                  >
                    Reset
                  </v-btn>
                </section>
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
  name: 'pkgQuestions',

  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,
      validQuestionPkg: false,

      idKompetensi: null,
      judulKompetensi: '',
      dataGuru: {},
      currentPhotoProfile: '',

      pertanyaan: [],
      jawaban: [],
      jawabanParsial: [],

      jawabanRules: [
        v => v > -1  || 'Jawaban is required',
      ]

    }
  },

  mounted() {
    this.getIdKompetensi()
    this.getCurrentQuestion()
  },

  // watch: {
  //   '$route'() {
  //     // TODO: react to navigation event.
  //     // params cotains the current route parameters
  //     this.getCurrentQuestion()
  //   }
  // },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      prevUrl : 'prevUrl/prevUrl',
      dataPkg: 'pkg/dataPkg'
    }),
  },

  methods: {
    ...mapActions({
      setAlert  : 'alert/set',
      setDialog : 'dialog/set',
      setAuth   : 'auth/set',
      setIndikator : 'pkg/doSetIndikator',
      setDataGuru : 'pkg/doSetDataGuru',
      setTanggal: 'pkg/doSetTanggal',
      setClear: 'pkg/doSetClear'
    }),

    getIdKompetensi() {
      this.idKompetensi = parseInt(this.$route.params.idQuestion)
    },

    async getCurrentQuestion() {
      try {
        this.setDialog({
          status : true,
        })
        
        let config = {
          headers: {
            'Authorization': this.user.api_token,
          }
        }

        const response = await axios.get(this.api_url + '/admin/survey/data-kompetensi/' + this.idKompetensi, config)

        this.pertanyaan = response.data.data.pertanyaan
        this.jawaban = response.data.data.jawaban
        this.judulKompetensi = response.data.data.judul_kompetensi

        if (this.dataPkg.data_guru != '') {
          this.getCurrentDataGuru()
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
          text  : error,
        })
      }
    },

    async nextQuestion() {

      if (!this.$refs.formQuestionPkg.validate()) {
        this.setAlert({
          status : true,
          color  : 'error',
          text  : 'Isi Data dengan Lengkap !',
        })
      } else {

        try {
          
          this.setDialog({
            status : true,
          })

          await this.setIndikator(this.jawabanParsial)

          await this.getDataNilaiKompetensi()

          this.idKompetensi = this.idKompetensi + 1

          this.$router.push(`/admin/pkg/create/${this.idKompetensi}`)

          this.getCurrentQuestion()
          this.reset()

          let optionGoTo = {
            duration: 800,
            offset: 0,
            easing: 'easeInOutCubic',
          }

          this.$vuetify.goTo(1, optionGoTo)


          this.setAlert({
            status : true,
            color  : 'success',
            text  : 'Kompetensi Selanjutnya',
          })

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

    },

    async getDataNilaiKompetensi() {
      try {

        let config = {
          headers: {
            'Authorization': this.user.api_token,
          }
        }

        let formData = new FormData()

        this.jawabanParsial.forEach(element => {
          formData.append('indikator_parsial[]', element)
        });

        const response = await axios.post(this.api_url + '/admin/survey/data-kompetensi/nilai-kompetensi/' + this.idKompetensi, formData, config)

        this.$store.dispatch(`pkg/doSetNilaiKomp${this.idKompetensi}`, response.data.data)

      } catch (error) {
        this.setAlert({
          status : true,
          color  : 'error',
          text  : error,
        })
      }

    },

    reset() {
      this.$refs.formQuestionPkg.resetValidation()
      
      this.jawabanParsial = []
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

    async finalStep() {

       if (!this.$refs.formQuestionPkg.validate()) {
        this.setAlert({
          status : true,
          color  : 'error',
          text  : 'Isi Data dengan Lengkap !',
        })
      } else {

        try {
          
          this.setDialog({
            status : true,
          })

          await this.setIndikator(this.jawabanParsial)

          await this.getDataNilaiKompetensi()

          this.setDialog({
            status : false,
          })

          this.$router.push('/admin/pkg/create/confirm')

          this.setAlert({
            status : true,
            color  : 'success',
            text  : 'Konfirmasi !',
          })

        } catch (error) {
          this.setAlert({
            status : true,
            color  : 'error',
            text  : error,
          })
        }

      }
      
    },

    batal() {
      this.$router.go('/')
    },

  },

  async beforeRouteUpdate (to, from, next) {
    if (parseInt(to.params.idQuestion) < parseInt(from.params.idQuestion)) {
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

}
</script>

<style>

</style>