<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <section v-if="guest === false">
          <v-list-item>
            <v-list-item-content>
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

              <v-list-item-title class="title mt-2">
                {{user.profile.name}}
              </v-list-item-title>

              <v-list-item-subtitle class="mt-2 mb-2">
                {{user.profile.email}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
        </section>

        <v-list-item 
          link
          :to="`/admin/home`"
        >

          <v-list-item-action>
            <v-icon>mdi-shield-home-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-list-item 
          link
          :to="`/admin/profile/${this.user.profile.id}`"
        >

          <v-list-item-action>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-list-item 
          link
          :to="`/admin/data-guru`"
        >

          <v-list-item-action>
            <v-icon>mdi-account-supervisor-circle-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Data Guru</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-list-item 
          link
          :to="`/admin/data-siswa`"
        >

          <v-list-item-action>
            <v-icon>mdi-account-supervisor-circle-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Data Siswa</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

         <v-list-item 
          link
          :to="`/admin/data-orang-tua`"
        >

          <v-list-item-action>
            <v-icon>mdi-account-supervisor-circle-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Data Orang Tua</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-list-item 
          link
          :to="`/admin/pkg/create`"
        >

          <v-list-item-action>
            <v-icon>mdi-clipboard-account-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Mulai PKG</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-list-item 
          link
          :to="`/admin/hasil-pkg`"
        >

          <v-list-item-action>
            <v-icon>mdi-file-document-multiple-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Hasil PKG</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <section v-if="guest === false">
          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-btn
                color="red"
                class="white--text"
                @click="logOutSSO"
              >
                Logout
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </section>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :color="$vuetify.theme.dark ? 'grey-darken4' : 'primary'"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>El Mundo</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-switch
        v-model="goDark"
        color="blue darken-1"
        class="mt-5"
        :append-icon="$vuetify.theme.dark ? 'mdi-moon-waning-crescent' : 'mdi-weather-sunny'"
      >
      </v-switch>

    </v-app-bar>

    <Alert />
    <Dialog />

    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-main>

    <v-footer
      :color="$vuetify.theme.dark ? 'grey-darken4' : 'primary'"
      app
    >
      <span class="white--text">Infra Team</span>
      
      <v-spacer></v-spacer>

      <span class="white--text">&copy; {{ tahun }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'admin-home',

  components: {
    Alert: () => import( /* webpackChunkName: "alert" */ '@/components/Alert.vue'),
    Dialog: () => import( /* webpackChunkName: "dialogLoading" */ '@/components/Dialog.vue'),
  },

  mounted() {
    this.getTahun()
    this.getThemeDataLS()
    this.checkExpiration()
    this.getCurrentPP()
  },

  data: () => ({
    drawer: false,
    currentPhotoProfile: '',
    navDrawer: [
      { title: 'Home', icon: 'mdi-shield-home-outline', to: '/admin/home' },
      { title: 'Profile', icon: 'mdi-account-circle-outline', to: '/admin/profile' },
      { title: 'Data Guru', icon: 'mdi-account-supervisor-circle-outline', to: '/admin/data-guru' },
      { title: 'PKG', icon: 'mdi-clipboard-account-outline', to: '/admin/mulai-pkg' },
      { title: 'Hasil PKG', icon: 'mdi-file-document-multiple-outline', to: '/admin/hasil-pkg' },
    ],
    tahun: '',
    app_theme_key: process.env.VUE_APP_LS_THEME_KEY,
    api_url: process.env.VUE_APP_API_ENDPOINT,
  }),

  computed: {
    ...mapGetters({
      user: 'auth/user',
      guest: 'auth/guest',
    }),

    goDark: {
      get() {
        const theme = JSON.parse(localStorage.getItem(this.app_theme_key))
        return theme
      },
      set(v) {
        this.$vuetify.theme.dark = v
        localStorage.setItem(this.app_theme_key, v)
      }
    },
  },

  methods: {
    ...mapActions({
      setAlert  : 'alert/set',
      setDialog : 'dialog/set',
      setAuth   : 'auth/set'
    }),

    getTahun() {
      this.tahun = new Date().getFullYear()
    },

    async getCurrentPP() {
      if (this.guest === false) {
        let completeFileName = this.user.profile.profile_picture

        if(completeFileName !== null) {
          let fileName  = completeFileName.split('.').shift()
          let fileExt = completeFileName.split('.').pop()

          let newUrlPP = `${this.api_url}/files/profile-picture/${fileName}/${fileExt}`

          let testGCS = await axios.get(newUrlPP)

          if(testGCS.data.includes('https://storage.googleapis.com/pkg-biasa.appspot.com/')) {
            this.currentPhotoProfile = `https://storage.googleapis.com/pkg-biasa.appspot.com/data-aplikasi/profile-picture/${completeFileName}`
          } else {
            this.currentPhotoProfile = newUrlPP
          }

        } else {
          this.currentPhotoProfile = ''
        }
        
      } else {
        this.currentPhotoProfile = ''
      }

    },

    async logOutSSO() {
      await localStorage.clear()
      this.$router.go(0)
    },

    getThemeDataLS() {
      const theme = localStorage.getItem(this.app_theme_key);


      if (theme) {
          if (theme == "true") {
              this.$vuetify.theme.dark = true;
          } else {
              this.$vuetify.theme.dark = false;
          }
      }
    },

    checkExpiration() {

      if(this.guest === false) {
        //Get nilai expiresIn
        const expiresIn = localStorage.getItem('sesiLogin')
        const checkTime = moment().format()

        console.log(expiresIn)
        console.log(checkTime)

        //Cek nilai nya
        if (moment(checkTime).isAfter(expiresIn)) {
          this.logOutSSO()
        } 

      }

    }
  }


}
</script>

<style>

</style>