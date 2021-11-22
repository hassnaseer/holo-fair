<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="light-blue darken-2">
                      <v-card-title class="white--text">Welcome Back!</v-card-title>
                      <v-card-text class="white--text mt-12">
                        <h3
                            class="text-center py-5"
                        >To Keep connected with us please login with your personnel info
                        or you forget you password please filled the field and reset your password.</h3>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark v-on:click="login">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 light-blue--text text--accent-3 py-4">Forget Password</h1>
                        <v-form @submit.prevent="submitForget" ref="form">
                          <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              type="email"
                              label="Email"
                              placeholder="Email"
                              prepend-inner-icon="mdi-account"
                              required
                          />
                          <div class="text-center my-12">
                            <v-btn color="light-blue darken-2 px-8" :loading="loading" type="submit" dark>Send</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                  </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-snackbar top color="green" v-model="snackbar">
      Please check your email as well look into spam.
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    loading:false,
    snackbar:false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods:{
   async submitForget(){
      if (this.$refs.form.validate()){
        try{
        let result = await axios.post (`${process.env.VUE_APP_SERVER_URL}/api/v1/forget-password`,{
          email:this.email,
          password: this.password
        });
        let message = JSON.stringify(result.data.meta.message);
        setTimeout(()=> {
        this.loading = false
        this.$notify({
        group: 'foo',
        type:"success",
        title: 'Success',
        text: message,
      });
        },1000)
        this.$router.push({ path: '/login'})
           localStorage.setItem("emailId",this.email);
        }catch(e){
          let message = JSON.stringify(e.response.data.meta.message);
          this.$notify({
        group: 'foo',
        type:"error",
        title: 'Success',
        text: message,
      });
        }
      }
    },
    login () {
        this.$router.push({ path: '/Login'})
    }
  },
  props: {
    source: String
  }
};
</script>
<style>
.forget{
  cursor: pointer;
}
</style>