<template>
  <div>
    <!-- Alert Jika Gagal -->
    <v-alert 
      :type="alertObject.type"
      v-model="alertObject.status"
      dismissible
    >
      <li
        v-for="(value, key) of alertObject.message"
        :key="key"
      >
        <template v-for="item in value"> {{item}} </template>
      </li>
    </v-alert>

    <v-form
      ref="formEditProfile"
      v-model="validEditProfileForm"
      lazy-validation
    >
      <v-text-field
        v-model="form.name"
        label="Nama ..."
        :rules="formRules.nameRules"
        filled
        required
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="form.email"
        label="E-Mail ..."
        :rules="formRules.emailRules"
        filled
        required
        class="mb-2"
      ></v-text-field>

      <span>Jika Tidak Ingin di Ubah Biarkan Kosong</span>
      <v-text-field
        label="Password ..."
        v-model="password"
        :rules="passwordRules"
        :append-icon="showPassTextInput ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassTextInput ? 'text' : 'password'"
        @click:append="showPassTextInput = !showPassTextInput"
        filled
        required
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="form.no_hp"
        label="No HP ..."
        :rules="formRules.noHpRules"
        filled
        type="number"
        required
        class="mb-2"
      ></v-text-field>

      <section
        v-if="user.profile.role == 'admin' || user.profile.role == 'guru'"
      >
        <v-text-field
          v-model="form.nip"
          label="NIP ..."
          :rules="formRules.nipRules"
          filled
          required
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="form.jam_mengajar"
          label="Jam Mengajar ..."
          :rules="formRules.jamMengajarRules"
          filled
          type="number"
          required
          class="mb-2"
        ></v-text-field>

        <v-combobox
          v-model="form.mata_pelajaran"
          label="Mata Pelajaran"
          :rules="mataPelajaranRules"
          multiple
          filled
          small-chips
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </section>

      <section
        v-if="user.profile.role == 'admin' || user.profile.role == 'guru'"
      >
        <v-combobox
          v-model="form.kelas"
          label="Kelas"
          :rules="kelasRules"
          multiple
          filled
          small-chips
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </section>

      <section
        v-if="user.profile.role == 'siswa'"
      >
        <v-combobox
          v-model="form.kelas"
          label="Kelas"
          :rules="kelasRules"
          filled
          small-chips
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </section>

      <section
        v-if="user.profile.role == 'siswa' && form.parent "
      >
        <v-text-field
            v-model="form.parent.name"
            label="Nama Orang Tua..."
            filled
            disabled
            required
            class="mb-2"
          ></v-text-field>
      </section>


      <section
        v-if="currentPhotoProfile != ''"
      >
        <v-img
          :lazy-src="currentPhotoProfile"
          :src="currentPhotoProfile"
          max-width="250"
          aspect-ratio="1"
          alt="pic"
          class="mb-2 mx-auto"
        ></v-img>

        <center>
          <span>Jika Tidak Ingin di Ubah Biarkan Kosong</span>
        </center>
      </section>

      <section
        v-else
      >
        <v-img
          :lazy-src="require('@/assets/aplikasi/noimage.png')"
          :src="require('@/assets/aplikasi/noimage.png')"
          max-width="250"
          alt="pic"
          aspect-ratio="1"
          class="mb-2 mx-auto"
        ></v-img>

      </section>

      <v-file-input
        chips
        label="Profile Picture"
        @change="logFile"
        filled
        class="mb-2"
        :rules="profilePictureRules"
        show-size
        accept=".png,.jpg,.jpeg"
      >
      </v-file-input>
      

      <v-btn
        :disabled="!validEditProfileForm"
        color="success"
        class="mr-4"
        @click="submit"
      >
        Edit
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'editProfileForm',
  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,
      validEditProfileForm: false,
      showPassTextInput: false,
      idProfile: '',
      currentPhotoProfile: '',
      form: {
        name: '',
        email: '',
        jam_mengajar: '',
        nip: '',
        profilePictureLama: '',
        mata_pelajaran: [],
        no_hp: '',
        kelas: ''
      },
      fileData: null,
      password: null,
      formRules: {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        jamMengajarRules: [
          v => !!v || 'Jam Mengajar is required',
        ],
        nipRules: [
          v => !!v || 'NIP is required',
        ],
        nameRules: [
          v => !!v || 'Nama is required',
        ],
        noHpRules: [
          v => !!v || 'Mata Pelajaran is required',
        ],
      },
      alertObject: {
        type: 'success',
        message: {},
        status: false
      },
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

    passwordRules() {
      let rules

      if(this.password) {
        rules =  [
          v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~`!$%@#£€*?&^()<>,.\-+=_|/;:'"{}[\s]{6,}$/.test(v) || "Use At Least 6 Characters, with Letter and Number"
        ]
      } else {
        rules = []
      }

      return rules
    },

    mataPelajaranRules() {
      let rules

      if(this.user.profile.role == 'admin') {
        rules = [
          v => !!v || 'Mata Pelajaran is required',
        ]
      } else if (this.user.profile.role == 'guru') {
        rules = [
          v => !!v || 'Mata Pelajaran is required',
        ]
      } else {
        rules = []
      }

      return rules
    },

    kelasRules() {
      let rules

      if(this.user.profile.role == 'orang tua') {
        rules = []
      } else {
        rules = [
          v => !!v || 'Kelas is required',
        ]
      }

      return rules
    },

    profilePictureRules() {
      let rules

      if(this.fileData != null) {
        rules =  [
          v => !!v || 'Profile Picture is required',
          v => !v || v.size < (3072 * 1024) || 'File Terlalu Besar > 3 MB !',
          v => !v || /^\S+$/.test(v.name) || 'Nama File Tidak Boleh ada Spasi'
        ]
      } else {
        rules = []
      }

      return rules
    },

  },
  methods: {
    ...mapActions({
      setAlert  : 'alert/set',
      setAuth   : 'auth/set',
      setDialog : 'dialog/set'
    }),

    logFile(e) {
      this.fileData = e
    },

    ambilDataUrl() {
      this.idProfile = this.$route.params.id
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

        const response = await axios.get(this.api_url + '/profile/' + this.idProfile, config)

        this.form = response.data.data

        if(response.data.data.mata_pelajaran != null) {
          let arrayMapel = response.data.data.mata_pelajaran.split(', ')

          this.form.mata_pelajaran = arrayMapel
        }

        if(response.data.data.kelas != null) {
          if(this.user.profile.role == 'guru' || this.user.profile.role == 'admin') {
            let arrayKelas = response.data.data.kelas.split(', ')

            this.form.kelas = arrayKelas
          } 
        }

        if(this.form.profile_picture) {
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

    async getCurrentPP() {

      let completeFileName = this.form.profile_picture
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

    async submit(e) {
      e.preventDefault()

      if (!this.$refs.formEditProfile.validate()) {
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
          
          let config = {
            headers: {
              'Authorization': this.user.api_token,
              'Content-Type': 'multipart/form-data',
            }, 
          }

          let formData = new FormData()

          formData.append('email', this.form.email.toLowerCase())
          formData.append('name', this.form.name)
          formData.append("_method", "PATCH");

          if(this.password != null) {
            formData.append('password', this.password)
          }

          if(this.fileData !== null) {
            formData.append('profile_picture', this.fileData)
            formData.append('fileName', this.fileData.name)
          } 

          formData.append('no_hp', this.form.no_hp)

          if(this.user.profile.role == 'admin' || this.user.profile.role == 'guru') {
            this.form.kelas.forEach(element => {
              formData.append('kelas[]', element)
            })

            this.form.mata_pelajaran.forEach(element => {
              formData.append('mata_pelajaran[]', element)
            })

            formData.append('jam_mengajar', this.form.jam_mengajar)
            formData.append('nip', this.form.nip)
          } else {
            formData.append('kelas', this.form.kelas)
          } 

          const response = await axios.post(this.api_url + '/profile/' + this.idProfile, formData, config)

          this.setAuth(response.data.result)

          this.setDialog({
            status : false,
          })

          this.setAlert({
            status : true,
            color  : 'success',
            text  : response.data.message,
          })

          this.$router.go('/')
          

        } catch (error) {
          this.setDialog({
            status : false,
          })

          // if (error.response.status === 422) {
          //   this.setAlert({
          //     status : true,
          //     color  : 'error',
          //     text  : 'Inputan tidak Valid !',
          //   })
          // } else {
          //   this.setAlert({
          //     status : true,
          //     color  : 'error',
          //     text  : 'Internal Server Error !',
          //   })
          // }

          // this.alertObject.status = true
          // this.alertObject.type = 'error'
          // this.alertObject.message = error.response.data

          console.log(error)
          
        }
      }

    },

    reset() {
      this.$refs.formEditProfile.resetValidation()
      
      this.form.email = ''
      this.password = ''
      this.form.jam_mengajar = ''
      this.form.nip = ''
      this.form.name = ''
      
    },
    
  }
}
</script>

<style>

</style>