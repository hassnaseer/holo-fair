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
                        <h1 class="text-center display-2 light-blue--text text--accent-3 py-4">Reset Password</h1>
                        <v-form @submit.prevent="submitSignup" ref="form">
                          <v-card-text>
                              <v-text-field
                                v-model="password"
                                :rules="passwordRules"
                                :type="passwordShow?'text':'password'"
                                label="Old Password"
                                placeholder="Old Password"
                                prepend-inner-icon="mdi-key"
                                :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                                @click:append="passwordShow = !passwordShow"
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
                            <v-btn color="light-blue darken-2" type="submit" @click="step=1" dark>Reset</v-btn>
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
      Password Reset Successfully.
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading:false,
    snackbar:false,
    passwordShow:false,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be 6  characters or more!',
    ],
  }),
  methods:{
    submitSignup(){
      if (this.$refs.form.validate()){
        this.loading = true
        setTimeout(()=> {
          this.loading = false
          this.snackbarr = true
        },5000,
        this.$router.push({ path: '/Login'})
        )
        
        this.snackbar = true
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