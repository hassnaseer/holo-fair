<template>
  <div class="container pa-5">

<!-- <vue-editor v-model="content"></vue-editor> -->

    <form ref="form" @submit.prevent="sendEmail">
      <v-row>
                <v-col cols="2"><label>To</label></v-col>
        <v-col cols="10">
          <v-text-field type="email" name="email" outlined>
          </v-text-field>
        </v-col>
        <v-col cols="2"><label>Message</label></v-col>
        <v-col cols="10">
          <v-text-field name="message" outlined>
          </v-text-field>
        </v-col>
        <v-col cols="12 float-left">
    <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" value="send" dark> Save</v-btn>
           </v-col>
      </v-row>
    <!-- </vue-editor> -->
  </form>

  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import emailjs from 'emailjs-com';

export default {
    beforeRouteEnter (to, from, next) {
      const token = localStorage.getItem('token')
  if(token){
    next()
  }
  else
    next('/login')
  },
  components: {
    // VueEditor
  },
    data() {
    return {
      content: "<h1>Some initial content</h1>"
    };
  },
methods: {
    sendEmail(e) {
      emailjs.sendForm('gmail', 'template_sp5bgd6', this.$refs.form, 'user_PDuj4ZcWkux39HzGcPLEg')
        .then(function(result) {
            alert('SUCCESS!', result.status, result.message);
        }, (error) => {
            alert.log('FAILED...', error.text);
        });
        alert(e)
        e.target.reset()
    }
  },
};
</script>
<style scoped>
  .textarea{
    border: 1px solid chocolate;
  }
</style>