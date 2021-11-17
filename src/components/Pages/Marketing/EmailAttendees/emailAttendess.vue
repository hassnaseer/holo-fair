<template>
  <div class="container pa-5">
      <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-header
    hide-default-footer
    class="elevation-1"
  ></v-data-table>
  <!-- <div v-for="table in tables" :key="table.id">
    <span>{{table.template_params}}</span>
  </div> -->
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
        <v-col cols="4 ml-auto">
    <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" value="send" dark> Save</v-btn>
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
import emailjs from 'emailjs-com';
import axios from 'axios'

export default {
    data() {
    return {
      loading: false,
      visible: false,
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
    sendEmail(e) {
      emailjs.sendForm('gmail', 'template_sp5bgd6', this.$refs.form, 'user_PDuj4ZcWkux39HzGcPLEg')
        .then(function(result) {
            alert('SUCCESS!', result.status, result.message);
        }, (error) => {
            alert.log('FAILED...', error.text);
        });
        alert(JSON.stringify(e))
        e.target.reset()
        this.visible = false;
    },
  },
 async mounted(){
    try {
        const response = await axios.get(
          "https://api.emailjs.com/api/v1.1/history?user_id=user_PDuj4ZcWkux39HzGcPLEg&accessToken=9975c26eb7ed81becbfc9f114eeb2261&page=1&count=50"
        );
        this.tables = response.data.rows;
        // let data = this.tables.map((item)=>{
        //   return item
        // })
        // alert(JSON.stringify(this.tables.template_params))
        // alert(JSON.stringify(data.template_params))
      } catch (error) {
        alert(error);
      }
  }
};
</script>
<style scoped>
  .textarea{
    border: 1px solid chocolate;
  }
</style>