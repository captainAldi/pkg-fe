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
      ref="formEditGuru"
      v-model="validEditGuruForm"
      lazy-validation
    >

      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.name"
            label="Nama ..."
            :rules="formRules.nameRules"
            filled
            required
            class="mb-2"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.email"
            label="E-Mail ..."
            :rules="formRules.emailRules"
            filled
            required
            class="mb-2"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Password ..."
            v-model="password"
            :rules="passwordRules"
            :append-icon="showPassTextInput ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassTextInput ? 'text' : 'password'"
            @click:append="showPassTextInput = !showPassTextInput"
            filled
            required
          ></v-text-field>
          <div
            class="text-caption mt-n7"
          >
            Jika Tidak Ingin di Ubah Biarkan Kosong
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.nip"
            label="NIP ..."
            :rules="formRules.nipRules"
            filled
            required
            class="mb-2"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.jam_mengajar"
            label="Jam Mengajar ..."
            :rules="formRules.jamMengajarRules"
            filled
            type="number"
            required
            class="mb-2"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
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
        </v-col>
      </v-row>

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
      

      <v-btn
        :disabled="!validEditGuruForm"
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
  name: 'editGuruForm',
  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,
      validEditGuruForm: false,
      showPassTextInput: false,
      idProfile: '',
      currentPhotoProfile: '',
      form: {
        name: '',
        email: '',
        jam_mengajar: '',
        nip: '',
        profilePictureLama: ''
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

      if(this.form.password) {
        rules =  [
          v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~`!$%@#£€*?&^()<>,.\-+=_|/;:'"{}[\s]{6,}$/.test(v) || "Use At Least 6 Characters, with Letter and Number"
        ]
      } else {
        rules = []
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

        const response = await axios.get(this.api_url + '/admin/data/guru/specific/' + this.idProfile, config)

        this.form = response.data.data

        if(this.form.profile_picture) {
          this.getCurrentPP()
        }

        this.setDialog({
          status : false,
        })

      } catch (error) {
        this.setAlert({
          status : true,
          color  : 'error',
          text  : error.response.data.message,
        })
      }
    },

    getCurrentPP() {

      let completeFileName = this.form.profile_picture
      let fileName  = completeFileName.split('.').shift()
      let fileExt = completeFileName.split('.').pop()

      let newUrlPP = `${this.api_url}/files/profile-picture/${fileName}/${fileExt}`

      this.currentPhotoProfile = newUrlPP

       
    },

    async submit(e) {
      e.preventDefault()

      if (!this.$refs.formEditGuru.validate()) {
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

          formData.append('email', this.form.email)
          formData.append('jam_mengajar', this.form.jam_mengajar)
          formData.append('nip', this.form.nip)
          formData.append('name', this.form.name)
          formData.append("_method", "PATCH");

          if(this.password != null) {
            formData.append('password', this.password)
          }

          if(this.fileData !== null) {
            formData.append('profile_picture', this.fileData)
            formData.append('fileName', this.fileData.name)
          } 

          const response = await axios.post(this.api_url + '/admin/data/guru/update/' + this.idProfile, formData, config)

          this.setDialog({
            status : false,
          })

          this.setAlert({
            status : true,
            color  : 'success',
            text  : response.data.message,
          })

          this.getCurrentData()
          

        } catch (error) {
          this.setDialog({
            status : false,
          })

          if (error.response.status === 422) {
            this.setAlert({
              status : true,
              color  : 'error',
              text  : 'Inputan tidak Valid !',
            })
          } else {
            this.setAlert({
              status : true,
              color  : 'error',
              text  : 'Internal Server Error !',
            })
          }

          this.alertObject.status = true
          this.alertObject.type = 'error'
          this.alertObject.message = error.response.data
          
        }
      }

    },

    reset() {
      this.$refs.formEditGuru.resetValidation()
      
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