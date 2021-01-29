<template>
  <div v-if="dataGuru.length != 0">
    <v-row>
      <v-col>
        <h1>Mulai PKG</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          elevation="4"
          class="mx-auto mt-5 "
          max-width="80%"
        >
          <v-card-title class="justify-center">Pilih Guru dan Waktu</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form
              ref="formStartPkg"
              v-model="validStartPkg"
              lazy-validation
            >
              <v-autocomplete
                v-model="idGuru"
                :items="dataGuru"
                :rules="formRules.namaGuruRules"
                item-text="name"
                item-value="id"
                dense
                filled
                label="Guru"
              ></v-autocomplete>

              {{dateChoose}}

              <v-menu
                ref="menuDateChoose"
                v-model="menuDateChoose"
                :close-on-content-click="false"
                :return-value.sync="dateChoose"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateChoose"
                    label="Until"
                    prepend-icon="mdi-calendar-month"
                    readonly
                    clearable
                    v-bind="attrs"
                    v-on="on"
                    :rules="formRules.tanggalPkgRules"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateChoose" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDateChoose = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menuDateChoose.save(dateChoose)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              :disabled="!validStartPkg"
              color="success"
              class="mr-4"
              @click="startPkg"
            >
              Mulai
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Reset
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'startPkg',
  data() {
    return {
      api_url: process.env.VUE_APP_API_ENDPOINT,

      dataGuru: [],
      idGuru: '',

      menuDateChoose: '',
      dateChoose: '',

      validStartPkg: false,
      formRules: {
        namaGuruRules: [
          v => !!v || 'Pilih Guru !',
        ],
        tanggalPkgRules: [
          v => !!v || 'Pilih Tanggal !',
        ],
      }
    }
  },

  computed: {
    ...mapGetters({
      user  : 'auth/user',
      guest : 'auth/guest'
    }),
  },

  mounted() {
    this.getAllGuru()
  },

  methods: {
    ...mapActions({
      setAlert  : 'alert/set',
      setAuth   : 'auth/set',
      setDialog : 'dialog/set',
      setDataGuru : 'pkg/doSetDataGuru',
      setTanggal: 'pkg/doSetTanggal'
    }),

    async getAllGuru() {
      try {
        this.setDialog({
          status : true,
        })
        
        let config = {
          headers: {
            'Authorization': this.user.api_token,
          }
        }

        const response = await axios.get(this.api_url + '/admin/survey/data-guru/', config)

        this.dataGuru = response.data.data

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

    async startPkg(e) {
      e.preventDefault()

      if (!this.$refs.formStartPkg.validate()) {
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
            }
          }

          let formData = new FormData()

          formData.append('id_guru', this.idGuru)
          formData.append('tanggal', this.dateChoose)

          await axios.post(this.api_url + '/admin/survey/create/', formData, config)

          this.setDataGuru(this.idGuru)
          this.setTanggal(this.dateChoose)

          this.$router.push(`/admin/pkg/create/1`)

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
            text  : error.response.data.messages,
          })
        }
      
      }
    },

    reset() {
      this.$refs.formStartPkg.resetValidation()
      
      this.dateChoose = ''
      this.idGuru = ''
      
    },
  }
}
</script>

<style>

</style>