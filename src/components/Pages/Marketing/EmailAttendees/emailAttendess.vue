<template>
  <div class="container pa-5">
    <!--    <v-data-table-->
    <!--        :headers="headers"-->
    <!--        :items="desserts"-->
    <!--        hide-default-header-->
    <!--        hide-default-footer-->
    <!--        class="elevation-1"-->
    <!--    ></v-data-table>-->
    <!--    <div v-for="table in tables" :key="table.id">-->
    <!--      <span>{{ table.to }}</span>-->
    <!--      <span>{{ table.message }}</span>-->
    <!--    </div>-->
    <div>
      <a-button type="primary" @click="showModal">
        Create Email
      </a-button>
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"> Attendee Email</span>
              <span slot="isDraft" slot-scope="isDraft">
              <a-tag
                  :key="isDraft"
                  :color="isDraft === true ? 'geekblue' : 'green'"
              >
                {{ isDraft ? "Yes" : "No" }}
              </a-tag>
            </span>
        <span slot="action" slot-scope="text, record">
      <a @click="editEmail(record)">Edit</a>
      <a-divider type="vertical"/>
      <a @click="deleteEmail(record)">Delete</a>
      <a-divider type="vertical"/>
    </span>
      </a-table>
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
                <v-btn :loading="loading" color="light-blue darken-2 px-8" value="send" dark @click="sendEmail()">
                  Save
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn :loading="loading" @click="handleCancel" color="default px-8" value="send" dark> Cancel</v-btn>
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

const columns = [
  {
    dataIndex: 'to',
    key: 'Attendee Email',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'to'},
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Draft',
    key: 'isDraft',
    dataIndex: 'isDraft',
    scopedSlots: {customRender: 'isDraft'},
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];
export default {
  data() {
    return {
      data: [],
      columns,
      loading: false,
      visible: false,
      email: '',
      message: '',
      tables: '',
      content: "<h1>Some initial content</h1>",
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          value: 'name',
        },
        {text: 'Calories', value: 'calories'},
        {text: 'Fat (g)', value: 'fat'},
        {text: 'Carbs (g)', value: 'carbs'},
        {text: 'Protein (g)', value: 'protein'},
        {text: 'Iron (%)', value: 'iron'},
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
    editEmail(data){
      alert(JSON.stringify(data));
    },
    deleteEmail(data){
      alert(JSON.stringify(data));
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    async sendEmail() {
      await axios.post(`${process.env.VUE_APP_SERVER_URL}/api/v1/attendee-email`, {
        operation: "C",
        to: this.email,
        message: this.message,
        isDraft: false
      })
      this.$refs.form.reset()
      this.visible = false;
      await this.getEmails()
    },
    async getEmails() {
      try {
        const response = await axios.get(
            `${process.env.VUE_APP_SERVER_URL}/api/v1/attendee-emails`
        );
        this.tables = response.data.data;
        this.data = response.data.data;
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
.textarea {
  border: 1px solid chocolate;
}
</style>