<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
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
                        <v-btn outlined dark @click="step=3" class="px-8">SIGN UP</v-btn>
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
                            <h3 class="text-center mt-4 forget" @click="step++">Forgot your password ?</h3>
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
                </v-window-item>
                <v-window-item :value="2">
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
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
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
                </v-window-item>
                <v-window-item :value="3">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="light-blue darken-2">
                      <v-card-title class="white--text">Welcome Back!</v-card-title>
                      <v-card-text class="white--text mt-12">
                        <h3
                            class="text-center py-5"
                        >To Keep connected with us please login with your personnel info</h3>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step=1">Sign in</v-btn>
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
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-snackbar top color="green" v-model="snackbar">
      Login success
    </v-snackbar>
    <v-snackbar top color="green" v-model="snackbarr">
      Sign Up Successfully.
    </v-snackbar>
  </v-app>
</template>

<script>
const userId = '1'
export default {
  data: () => ({
    step:1,
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
    submitHandler(){
      if (this.$refs.form.validate()){
        this.loading = true
        setTimeout(()=> {
          this.loading = false
          this.snackbar = true
        },3000)
      }
      this.$router.push({ path: '/overview', params: { userId } })
    },
    submitSignup(){
      if (this.$refs.form.validate()){
        this.loading = true
        setTimeout(()=> {
          this.loading = false
          this.snackbarr = true
        },1000)
      }
    },
    submitForget(){
      alert("Email sent successfully")
    },
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