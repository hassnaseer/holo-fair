import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import Notifications from 'vue-notification'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(Notifications);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
