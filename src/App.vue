<template>
<div>
  <div class="icons-list">
  <a-icon type="wechat" v-bind="attrs"
          v-on="on"/>
    <v-dialog
      v-model="dialog"
      width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <a-icon type="wechat" className="icon" v-bind="attrs"
          v-on="on"/>
      </template>

      <v-card>
        <Chat />
      </v-card>
    </v-dialog>
  </div>
<v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</div>
  
</template>

<script>
import Chat from "./components/Chat/chat.vue";
  export default {
    components:{
Chat
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
<style scoped>
.theme--light.v-card {
    background-color: transparent;
    /* color: rgba(0, 0, 0, 0.87); */
}
.icons-list >>> .anticon {
  margin-right: 6px;
  font-size: 70px;
  top: 88%;
  left: 92%;
  position: fixed;
  z-index: 100;
  opacity: 0.05;
}

.icons-list >>> .anticon:hover {
  margin-right: 6px;
  font-size: 70px;
  top: 88%;
  left: 92%;
  position: fixed;
  z-index: 100;
  opacity: 10;
}

</style>
