<template>
  <div>
    <v-container fluid>
      <h1>Edit Data Orang Tua</h1>

      <v-card>
        <v-card-title>
          Edit
        </v-card-title>

        <v-card-text>
          <EditOrangTuaForm/>
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
    EditOrangTuaForm: () => import( /* webpackChunkName: "addOrangTuaForm" */ '@/components/Admin/OrangTua/EditForm.vue'),
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