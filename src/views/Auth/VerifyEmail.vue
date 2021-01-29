<template>
  <div>
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
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="150"
          max-width="250"
          class="mt-5 mx-auto"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
      </v-col>
    </v-row>

    <!-- Form -->
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
          <v-card-title class="justify-center">Verify on Process</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <VerifyEmail/>
          </v-card-text>
          <v-card-subtitle>            
            Please Wait ...
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VerifyEmail from '../../components/Auth/VerifyEmail'

export default {
  name: 'verifyEmail',
  components: {
    VerifyEmail
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>

</style>