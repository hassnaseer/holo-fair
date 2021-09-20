import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import Login from '../views/Login/index'
import OverView from '../components/Pages/OverView/overView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Dashboard,
    redirect: '/profile',
    children: [
        {
      path: 'overview',
      name: 'Overview',
      component: () => import('../components/Pages/OverView/overView'),
      meta: { title: 'Overview' }
       },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../components/Pages/Profile/index'),
        meta: { title: 'Profile' }
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
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/overview',
    name: 'overview',
    component: OverView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
