<template>
<div>
  <div class="icons-list">
  <a-icon type="wechat" className="icon" @click="chat"/>
  </div>

<v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</div>
  
</template>

<script>
export default {
  methods:{
   
    chat(){
      this.$router.push({ path: '/chat'})
    },
    
  }
}
</script>
<style scoped>
.icons-list >>> .anticon {
  margin-right: 6px;
  font-size: 70px;
  top: 88%;
  left: 92%;
  position: fixed;
  z-index: 100;
}
</style>
