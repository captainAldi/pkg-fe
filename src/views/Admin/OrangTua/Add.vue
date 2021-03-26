<template>
  <div>
    <v-container fluid>
      <h1>Create new Data</h1>

      <v-card>
        <v-card-title>
          Add
        </v-card-title>

        <v-card-text>
          <AddOrangTuaForm/>
        </v-card-text>

      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'addGuru',
  components: {
    AddOrangTuaForm: () => import( /* webpackChunkName: "addOrangTuaForm" */ '@/components/Admin/OrangTua/AddForm.vue'),
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