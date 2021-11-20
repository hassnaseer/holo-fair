<template>
  <div>
    <v-navigation-drawer
        v-model="drawer" app>
      <img src="../../public/HoloFair-by-Outreal-XR-Logo.png" alt="" class="img pt-2 pl-5">
      <v-list class="pa-2">
        <v-list-item to="/overview" link active-class="bg-active">
          <v-list-item-title class="overview">OverView</v-list-item-title>
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
      <v-toolbar-title>{{count}}</v-toolbar-title>
      <div class="ml-auto">
        <v-btn
            class="white--text d-none d-sm-inline-block mr-2"
            color="light-blue"
            v-if="this.$route.meta.button"
             @click="showModal"
        >
          Send Announcement
        </v-btn>
            <a-modal v-model="visible" title="Text Message" @ok="handleOk" okText="Save">
              <!-- <div class="mb-2"> -->
                <a-textarea
                  v-model="value"
                  placeholder="Controlled autosize"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              <!-- </div> -->
                <v-checkbox
                          v-model="checkboxloby"
                          label="To users in lobby"
                          required
                        ></v-checkbox>
                        <v-checkbox
                          v-model="checkboxauditorium"
                          label="to users in auditorium"
                          required
                        ></v-checkbox>
                        <v-checkbox
                          v-model="checkboxhall"
                          label="to users in exhibition hall"
                          required
                        ></v-checkbox>
                        <v-checkbox
                          v-model="checkboxroom"
                          label="to users in meeting room"
                          required
                        ></v-checkbox>
          </a-modal>
        <v-btn
            class="white--text d-none d-sm-inline-block"
            color="light-blue"
            @click="loader"
        >
          Preview Events
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
        <strong>Copyrights © 2021 Outreal XR, UAE. All rights reserved.</strong>
        <div v-if="value >3 ">
          <h1>hassam here</h1>
        </div>
        <div v-else></div>
      </v-col>
    </v-footer>
    <v-snackbar top color="green" v-model="snackbar">
      Event Has been Published Successfully. :)
    </v-snackbar>
  </div>
</template>
<script>

// let value = JSON.stringify(this.$route.value);

export default {
    beforeRouteEnter (to, from, next) {
      const token = localStorage.getItem('token')
  if(token){
    next()
  }
  else
    next('/login')
  },
  data: () => ({
    loading:false,
    snackbar:false,
    value:'',
    checkboxroom:'',
    checkboxhall:'',
    checkboxloby:'',
    checkboxauditorium:'',
    visible: false,
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
  computed:  {
    count (){
      return JSON.stringify(this.$route.name)
    },
    button (){
      return this.$route.meta.button;
    }
  },
  methods:{
     showModal() {
      this.visible = true;
    },
    handleOk(){
      alert(this.value)
      this.visible = false;
    },
    loader(){   
      alert('data here')
    },
    logout(){
      this.$router.push({ path: '/login'})
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
              setTimeout(()=> {
       this.loading = false
       this.$notify({
        group: 'foo',
        type:"success",
        position:"top left",
        title: 'Successful.',
        text: "User Logout Successfully",
      });
        },1000)
    },
    Publishevent(){
      this.$confirm(
        {
          title: 'Are you sure you want to Publish this event?',
        message: 'Are you sure you want to logout?',
          button: {
            no: 'No',
            yes: 'Yes'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm 
          */
          callback: confirm => {
            if (confirm) {
              // ... do something
            }
          }
        }
      )
      // this.loading = true
      // setTimeout(()=> {
      //   this.loading = false
      //   this.snackbar = true
      // },3000)
    }
  }
}
</script>
<style>
.overview{
  margin-left: 0px !important;
}
.img{
  width: 200px;
}
.v-list-item__title{
  margin-left: 20px;
}
</style>