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
      ref="formAddGuru"
      v-model="validAddGuruForm"
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
            v-model="form.password"
            :rules="formRules.passwordRules"
            :append-icon="showPassTextInput ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassTextInput ? 'text' : 'password'"
            @click:append="showPassTextInput = !showPassTextInput"
            filled
            required
            class="mb-2"
          ></v-text-field>
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
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-btn
            :disabled="!validAddGuruForm"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Add
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Reset
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'addGuruForm',
  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,
      validAddGuruForm: false,
      showPassTextInput: false,
      form: {
        name: '',
        email: '',
        password: '',
        jam_mengajar: '',
        nip: ''
      },
      formRules: {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~`!$%@#£€*?&^()<>,.\-+=_|/;:'"{}[\s]{6,}$/.test(v) || "Use At Least 6 Characters, with Letter and Number"
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

    async submit(e) {
      e.preventDefault()

      if (!this.$refs.formAddGuru.validate()) {
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
              'Authorization': this.user.api_token
            }
          }

          let formData = new FormData()

          formData.append('email', this.form.email)
          formData.append('password', this.form.password)
          formData.append('jam_mengajar', this.form.jam_mengajar)
          formData.append('nip', this.form.nip)
          formData.append('name', this.form.name)


          const response = await axios.post(this.api_url + '/admin/data/guru/create', formData, config)

          this.setDialog({
            status : false,
          })

          this.setAlert({
            status : true,
            color  : 'success',
            text  : response.data.message,
          })
          

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
      this.$refs.formAddGuru.resetValidation()
      
      this.form.email = ''
      this.form.password = ''
      this.form.jam_mengajar = ''
      this.form.nip = ''
      this.form.name = ''
      
    },
    
  }
}
</script>

<style>

</style>