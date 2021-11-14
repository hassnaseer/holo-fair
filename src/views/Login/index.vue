<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
                  <v-row>
                    <v-col cols="12" md="4" class="light-blue darken-2">
                      <v-card-title class="white--text">HoloFair Portal</v-card-title>
                      <v-card-text class="white--text">
                        <h2
                            class="py-5"
                        > JOIN <strong>LEADING</strong> 3D VIRTUAL EVENTS PLATFORMS IN SECONDS </h2>
                        <span class="text-center">Create your own online custom event, access your events dashboard, and edit your venues easily.</span>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn outlined dark class="px-8" v-on:click="signup">SIGN UP</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                            class="text-center display-2 light-blue--text py-4"
                        >Sign in to HoloFair App</h1>
                        <v-form @submit.prevent="submitHandler" ref="form">
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
                            <h3 class="text-center mt-4 forget" v-on:click="forget">Forgot your password ?</h3>
                          </v-card-text>
                          <v-card-actions class="justify-center">
                            <div class="text-center">
                              <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Login</v-btn>
                            </div>
                          </v-card-actions>
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
      Login Successfully
    </v-snackbar>
        <v-snackbar top color="green" v-model="snackbarerror">
      invalid credentials success
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    loading:false,
    snackbar:false,
    snackbarerror: false,
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
    async submitHandler(){
      if (this.$refs.form.validate()){
        let result = await axios.post ("https://holo-fair.herokuapp.com/api/v1/login",{
          email:this.email,
          password: this.password
        });
        let accesstoken = JSON.stringify(result.data.data.token);
        let user = JSON.stringify(result.data.data.user.id);
        let message = JSON.stringify(result.data.meta.message);
        // alert(JSON.stringify(result.data.meta))
      if (result.status === 200){
        setTimeout(()=> {
       this.loading = false
       this.$notify({
        group: 'foo',
        type:"success",
        position:"top left",
        title: 'Success',
        text: message,
      });
        },1000)
        localStorage.setItem("token", accesstoken );
        localStorage.setItem("userid", user );
        window.isSignedIn = true;
        // Bus.$emit("loggedIn/");
        // alert("ok")
        this.$router.push({ path: '/overview'})
      }else{
      //   setTimeout(()=> {
      //  this.loading = false
      //  this.$notify({
      //   group: 'foo',
      //   type:"warn",
      //   position:"top left",
      //   title: 'Success',
      //   text: message,
      // });
      //   },1000)
      alert("error")
      }
      
      }
    },
    forget () {
      this.$router.push({ path: '/forgetpassword'})
    },
    signup (){
      this.$router.push({ path: '/signup'})
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