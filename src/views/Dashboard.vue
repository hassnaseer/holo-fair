<template>
  <div>
    <v-navigation-drawer
        v-model="drawer" app>
      <img src="../../public/HoloFair-by-Outreal-XR-Logo.png" alt="" class="img pt-2 pl-5">
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
        <div class="px-5 pb-2">
          <v-btn block class="mb-2 white--text" color="light-blue darken-2" @click="Publishevent">
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
            class="white--text d-none d-sm-inline-block"
            color="light-blue"
            @click="loader"
        >
          Preview Eevents
        </v-btn>
        <v-menu
            open-on-hover
            offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar class="ml-12"
                      v-bind="attrs"
                      v-on="on"
            >
              <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                  class="mr-12"
              >
            </v-avatar>
          </template>
          <v-list class="pa-2" >
            <v-list-item to="/profile" link active-class="bg-active">
              Edit Profile
            </v-list-item>
            <v-list-item @click="loader" link class="pa-4 d-block d-sm-none">
              Accept Terms
            </v-list-item>
          </v-list>
        </v-menu>
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
.img{
  width: 200px;
}
</style>