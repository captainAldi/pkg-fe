<template>
  <div>
    <v-container fluid>
      <h1>Edit Data Guru</h1>

      <v-card>
        <v-card-title>
          Edit
        </v-card-title>

        <v-card-text>
          <EditGuruForm/>
        </v-card-text>

      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'editGuru',
  components: {
    EditGuruForm: () => import( /* webpackChunkName: "addGuruForm" */ '@/components/Admin/Guru/EditForm.vue'),
  },
  data() {
    return {

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

    
    
  }
}
</script>

<style>

</style>