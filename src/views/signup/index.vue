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
                        >To Keep connected with us please login with your personnel info</h3>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark v-on:click="login">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 light-blue--text text--accent-3 py-4">Create Account</h1>
                        <v-form @submit.prevent="submitSignup" ref="form">
                          <v-card-text>
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                type="email"
                                label="Email"
                                placeholder="Email"
                                prepend-inner-icon="mdi-account"
                                required
                            />
                            <v-text-field
                                v-model="password"
                                :rules="passwordRules"
                                :type="passwordShow?'text':'password'"
                                label="Password"
                                placeholder="Password"
                                prepend-inner-icon="mdi-key"
                                :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                                @click:append="passwordShow = !passwordShow"
                                required
                            />
                          </v-card-text>
                          <div class="text-center mt-n5">
                            <v-btn color="light-blue darken-2" type="submit" @click="step=1" dark>SIGN UP</v-btn>
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
    <v-snackbar top color="green" v-model="snackbarr">
      Sign Up Successfully.
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    loading:false,
    snackbar:false,
    passwordShow:false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be 6  characters or more!',
    ],
  }),
  methods:{
    async submitSignup(){
      if (this.$refs.form.validate()){
        this.loading = true
        let result = await axios.post ("https://holo-fair.herokuapp.com/api/v1/signup",{
          email:this.email,
          password: this.password
        });
        // alert(JSON.stringify(result.data.meta.message))
        let message = JSON.stringify(result.data.meta.message);
 if (result.status === 201){
        setTimeout(()=> {
       this.loading = false
       this.$notify({
        group: 'foo',
        position:"top left",
        title: 'Success',
        text: message,
      });
        },1000)
        this.$router.push({ path: '/login'})
      }else{
        setTimeout(()=> {
       this.loading = false
        this.$notify({
        group: 'foo',
        type:"warn",
        position:"top left",
        title: 'Success',
        text: "message",
      });
        },1000)
      } 
      }
    },
    login(){
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