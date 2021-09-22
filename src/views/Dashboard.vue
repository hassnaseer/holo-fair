<template>
  <div>
    <v-navigation-drawer
        v-model="drawer" app>
      <img src="../../public/HoloFair-by-Outreal-XR-Logo.png" alt="">
<!--      <div class="text-center display-1 light-blue&#45;&#45;text  ma-3">HoloFair App</div>-->
      <v-list class="pa-2">
        <v-list-item to="/overview" link active-class="bg-active">
          <v-list-item-title>Over View</v-list-item-title>
        </v-list-item>
        <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            active-class="bg-active"
            router :to="item.route"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-title >{{ item.title }}</v-list-title>
            </v-list-item-content>
          </template>

          <v-list-item
              v-for="child in item.items"
              :key="child.title"
              router :to="child.route"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block class="mb-3 white--text" color="light-blue darken-2" @click="Publishevent">
            Publish Event
          </v-btn>
          <v-btn block class="white--text" color="light-blue darken-2" @click="logout" :loading="loading">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-lg-none"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <div class="ml-auto">
        <v-btn
            class="white--text"
            color="light-blue"
            @click="loader"
        >
          Accept Terms
        </v-btn>
          <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-avatar class="ml-5 avatar">
                <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                    v-bind="attrs"
                    v-on="on"
                >
              </v-avatar>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Profile</span>
              </v-card-title>
              <v-form @submit.prevent="submitHandler" ref="form">
                <v-card-text>
                  <v-container grid-list-md>
                    <v-row>
                      <v-avatar class="mx-auto mb-3" size="140"
                      >
                        <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="John"
                            class="mr-12"
                        >
                      </v-avatar>
                    </v-row>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md6>
                        <v-label>First Name</v-label>
                        <v-text-field required outlined class="mt-2"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-label>Last Name</v-label>
                        <v-text-field required outlined class="mt-2"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-label>Email</v-label>
                        <v-text-field outlined required v-model="email"
                                      :rules="emailRules" class="mt-2"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-label>Contact Number</v-label>
                        <v-text-field outlined type="number" required class="mt-2"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-label>Address</v-label>
                        <v-text-field outlined type="address" required class="mt-2"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-label>City</v-label>
                        <v-select
                            :items="['Lahore', 'Canada', 'India', 'America']"
                            outlined
                            required
                            class="mt-2"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-label>State</v-label>
                        <v-select
                            :items="['Punjab', 'Canada', 'India', 'America']"
                            outlined
                            required
                            class="mt-2"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-label>Zip Code</v-label>
                        <v-select
                            :items="['54000', '51700', '98000', '6100']"
                            outlined
                            required
                            class="mt-2"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-label>Country</v-label>
                        <v-select
                            :items="['Pakistan', 'Canada', 'India', 'America']"
                            outlined
                            required
                            class="mt-2"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12>
                        <v-label>Password</v-label>
                        <v-text-field outlined
                                      v-model="password"
                                      :rules="passwordRules"
                                      :type="passwordShow?'text':'password'"
                                      @click:append="passwordShow = !passwordShow"
                                      required
                                      class="mt-2"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-btn type="submit" color="light-blue darken-2 px-8" class="p-4 ml-8" dark>Save</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
      </div>
    </v-app-bar>
      <router-view></router-view>
    <v-footer>
      <v-col
          text
          cols="12"
      >
        <strong>Copyrights © 2020 Outreal XR, UAE. All rights reserved.</strong>
      </v-col>
    </v-footer>
    <v-snackbar top color="green" v-model="snackbar">
      Event Has been Published Successfully. :)
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading:false,
    snackbar:false,
    drawer: true,
    valid: false,
    dialog:false,
    firstname: '',
    passwordShow:false,
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be 6  characters or more!',
    ],
    items: [
      {
        action: 'mdi-silverware-fork-knife',
        items: [
          { title: 'Basics', route: '/setup/basic' },
          { title: 'Registration Page',route:'/setup/registration' },
          { title: 'Attendees Roles', route: '/setup/attendeesroles' },
        ],
        title: 'Setup',
      },
      {
        action: 'mdi-school',
        items: [
            { title: 'Lobby', route: '/venues/lobby' },
            { title: 'Auditorium',route: '/venues/auditorium'},
            { title: 'Exhibition Hall', route: '/venues/exhibitionhall' },
            { title: 'Meeting Room', route: '/venues/meetingroom' },
              ],
        title: 'Venues',
      },
      {
        action: 'mdi-school',
        items: [
          { title: 'Attendees', route: '/people/attendees' }
        ],
        title: 'People',
      },
      {
        action: 'mdi-school',
        items: [
          { title: 'Email Attendees', route: '/marketing/emailattendees' }
        ],
        title: 'Marketing',
      },
      {
        action: 'mdi-school',
        items: [
          { title: 'Live Analytics', route: '/analytics/liveanalytics' },
          { title: 'Reports', route: '/analytics/reports' },
        ],
        title: 'Analytics',
      },
    ],
  }),
  methods:{
    submitHandler() {
      this.dialog = false
      alert('profile submit')
    },
    loader(){
      alert("overview button")
    },
    logout(){
      this.$router.push({ path: '/login'})
    },
    Publishevent(){
        this.loading = true
        setTimeout(()=> {
          this.loading = false
          this.snackbar = true
        },3000)
    }
  }
}
</script>
<style>
.bg-active {
  background-color: #03A9F4;
  color : white !important;
}
.v-list-item:hover{
  background-color: #03A9F4;
  color : white !important;
}
.v-text-field--outlined > .v-input__control > .v-input__slot{
  min-height: 45px!important;
}
.avatar{
  cursor: pointer;
}
</style>