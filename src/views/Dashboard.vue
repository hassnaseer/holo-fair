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
          <v-btn block class="mb-3 white--text" color="light-blue darken-2">
            Publish Event
          </v-btn>
          <v-btn block class="white--text" color="light-blue darken-2">
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
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      {
        action: 'mdi-silverware-fork-knife',
        items: [
          { title: 'Basics', route: '/setup/basic' },
          { title: 'Registration Page',route:'/profile' },
          { title: 'Attendees Roles' },
        ],
        title: 'Setup',
      },
      {
        action: 'mdi-school',
        items: [
            { title: 'Lobby' },
            { title: 'Auditorium' },
            { title: 'Exhibition Hall' },
            { title: 'Meeting Room' },
              ],
        title: 'Venues',
      },
      {
        action: 'mdi-school',
        items: [
          { title: 'Attendees' }
        ],
        title: 'People',
      },
      {
        action: 'mdi-school',
        items: [
          { title: 'Email Attendees' }
        ],
        title: 'Marketing',
      },
      {
        action: 'mdi-school',
        items: [
          { title: 'Live Analytics' },
          { title: 'Reports' },
        ],
        title: 'Analytics',
      },
    ],
  }),
  methods:{
    loader(){
      alert("Orevie button")
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
</style>