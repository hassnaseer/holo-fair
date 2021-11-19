<template>
  <div class="container pa-5">
      <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-header
    hide-default-footer
    class="elevation-1"
  ></v-data-table>
  <div v-for="table in tables" :key="table.id">
    <span>{{table.to}}</span>
    <span>{{table.message}}</span>
  </div>
  <div>
    <a-button type="primary" @click="showModal">
      Create Email
    </a-button>
    <a-modal
      v-model="visible"
      title="Title"
      onOk="handleOk"
      footer
    >
      <div>
    <form ref="form">
      <v-row>
                <v-col cols="2"><label>To</label></v-col>
        <v-col cols="10">
          <v-text-field v-model="email" type="email" name="email" outlined>
          </v-text-field>
        </v-col>
        <v-col cols="2"><label>Message</label></v-col>
        <v-col cols="10">
          <v-text-field name="message" v-model="message" outlined>
          </v-text-field>
        </v-col>
        <v-col cols="4 ml-auto">
    <v-btn :loading="loading" color="light-blue darken-2 px-8" value="send" dark @click="sendEmail()"> Save</v-btn>
           </v-col>
           <v-col cols="6">
    <v-btn :loading="loading" @click="handleCancel"  color="default px-8" value="send" dark> cancel</v-btn>
           </v-col>
      </v-row>
  </form>
      </div>
    </a-modal>
  </div>

  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
// import emailjs from 'emailjs-com';
import axios from 'axios'

export default {
    data() {
    return {
      loading: false,
      visible: false,
      email:'',
      message:'',
      tables:'',
      content: "<h1>Some initial content</h1>",
      headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
        ],
    };
  },
methods: {
      showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
   async sendEmail() {
    await axios.post ("https://holo-fair.herokuapp.com/api/v1/attendee-email",{
      operation:"C",
      to:this.email,
      message:this.message,
      isDraft:false
      })
      this.$refs.form.reset()
        this.visible = false;
        await this.getEmails()
    },
    async getEmails(){
    try {
        const response = await axios.get(
          "https://holo-fair.herokuapp.com/api/v1/attendee-emails"
        );
        this.tables =response.data.data;
      } catch (error) {
        alert(error);
      }
    },
  },
  mounted() {
    this.getEmails()
  }
};
</script>
<style scoped>
  .textarea{
    border: 1px solid chocolate;
  }
</style>