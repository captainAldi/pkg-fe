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
      ref="formAddOrangTua"
      v-model="validAddOrangTuaForm"
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
            v-model="form.no_hp"
            label="No HP ..."
            :rules="formRules.noHpRules"
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
            :disabled="!validAddOrangTuaForm"
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
      validAddOrangTuaForm: false,
      showPassTextInput: false,
      form: {
        name: '',
        email: '',
        password: '',
        no_hp: '',
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

      if (!this.$refs.formAddOrangTua.validate()) {
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

          formData.append('name', this.form.name)
          formData.append('email', this.form.email)
          formData.append('password', this.form.password)
          formData.append('no_hp', this.form.no_hp)

          const response = await axios.post(this.api_url + '/admin/data/orang-tua/create', formData, config)

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
      this.$refs.formAddOrangTua.resetValidation()
      
      this.form.email = ''
      this.form.password = ''
      this.form.name = ''
      this.form.no_hp = ''
      
    },
    
  }
}
</script>

<style>

</style>