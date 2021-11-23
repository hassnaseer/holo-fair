import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard'
import Login from '../views/Login/index'
import Signup from '../views/signup/index'
import Reset from '../views/resetpassword'
import ForgetPassword from '../views/forgetpassword/index'
import OverView from '../components/Pages/OverView/overView'

Vue.use(Router)

let router = new Router({
  routes:
  [
    {
      path: '/',
      component: Dashboard,
      redirect: '/overview',
      children: [
          {
        path: 'overview',
        name: 'Overview',
        component: () => import('../components/Pages/OverView/overView'),
        meta: { title: 'Overview' }
         },
        {
          path: 'profile2',
          name: 'Profile2',
          component: () => import('../components/Pages/Profile/index'),
          meta: { title: 'Profile2' }
        },
        {
          path: 'chat',
          name: 'Chat',
          component: () => import('../components/Chat/chat'),
          meta: { title: 'Chat' }
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('../components/Pages/Profile/userProfile'),
          meta: { title: 'Profile'}
        },
        {
          path: 'setup/basic',
          name: 'Basic',
          component: () => import('../components/Pages/Setup/Basics/Basic'),
          meta: { title: 'Basic' },
        },
        {
          path: 'setup/registration',
          name: 'Registration',
          component: () => import('../components/Pages/Setup/Registration/Registration'),
          meta: { title: 'Registration' },
        },
        {
          path: 'setup/attendeesroles',
          name: 'Attendess Roles',
          component: () => import('../components/Pages/Setup/AttendeesRoles/Roles'),
          meta: { title: 'Attendess Roles' },
        },
        {
          path: 'venues/lobby',
          name: 'Lobby',
          component: () => import('../components/Pages/Venues/Lobby/Lobby'),
          meta: { title: 'Lobby', button: true  },
        },
        {
          path: 'venues/auditorium',
          name: 'Auditorium',
          component: () => import('../components/Pages/Venues/Auditorium/Auditorium'),
          meta: { title: 'Auditorium', button: true  },
        },
        {
          path: 'venues/exhibitionhall',
          name: 'Exhibition Hall',
          component: () => import('../components/Pages/Venues/ExhibitionHall/exhibitionHall'),
          meta: { title: 'Exhibition Hall', button: true  },
        },
        {
          path: 'venues/meetingroom',
          name: 'Meeting Room',
          component: () => import('../components/Pages/Venues/MeetingRoom/meetingRoom'),
          meta: { title: 'Meeting Room', button: true  },
        },
        {
          path: 'people/attendees',
          name: 'Attendess',
          component: () => import('../components/Pages/People/Attendess/Attendess'),
          meta: { title: 'Attendess', button: true  },
        },
        {
          path: 'marketing/emailattendees',
          name: 'Email Attendees',
          component: () => import('../components/Pages/Marketing/EmailAttendees/emailAttendess'),
          meta: { title: 'Email Attendees', button: true  },
        },
        {
          path: 'analytics/liveanalytics',
          name: 'Live Analytics',
          component: () => import('../components/Pages/Analytics/LiveAnalytics/liveAnalytics'),
          meta: { title: 'Live Analytics', button: true  },
        },
        {
          path: 'analytics/reports',
          name: 'Reports',
          component: () => import('../components/Pages/Analytics/Reports/Reports'),
          meta: { title: 'Reports', button: true},
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgetpassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: Signup
    },
    {
      path: '/reset-password/:token',
      name: 'Reset Password',
      component: Reset
    },
    {
      path: '/overview',
      name: 'overview',
      component: OverView
    },
  ]
})

// const openRoutes = ['Login', "Signup", token];


export default router
