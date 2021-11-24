<template>
  <v-container fluid>
    <v-form @submit.prevent="submitHandler" ref="form">
      <h2>Upload media content to your lobby below:</h2>
      <a-upload-dragger
          name="file"
          :multiple="true"
          action="https://holo-fair.herokuapp.com/api/v1/file-upload"
          :default-file-list="fileList"
          list-type="picture"
          :remove="handleRemove"
          :beforeUpload="beforeUpload"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox"/>
        </p>
        <p class="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </a-upload-dragger>
      <v-row>
        <v-col cols="3" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Cancel</v-btn>
        </v-col>
        <v-col cols="3" class="text-center">
          <v-btn class="upload-demo-start"
                 type="submit"
                 @click="handleUpload"
                 :disabled="fileList.length === 0"
                 :loading="loading"
                 dark
                 color="light-blue darken-2 px-8"
          >{{ loading ? 'Uploading' : 'Upload' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

  </v-container>
</template>
<script>
// import { Icon } from 'ant-design-vue';
import axios from "axios";
import {v4 as uuidv4} from 'uuid';

export default {
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else
      next('/login')
  },
  data() {
    return {
      fileList: [],
      loading: false,
    };
  },
  async mounted() {
    try {
      const eventId = localStorage.getItem("eventId");
      const response = await axios.get(
          `${process.env.VUE_APP_SERVER_URL}/api/v1/venue/${eventId}`
      );
      if (response.data && response.data.data && response.data.data.lobbyContent) {
        let files = response.data.data.lobbyContent.map(item => {
          return {
            uid: uuidv4(),
            url: item,
            name:"xxx.jpg",
            status: 'done',
          }
        });
        this.fileList = files ? files : []
      }
    } catch (error) {
      alert(error)
    }

  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG, JPEG and PNG file!');
        return isJpgOrPng;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
        return isLt2M;
      }
      this.fileList = [...this.fileList, file]
      return false;
    },
    async handleUpload() {
      const eventId = localStorage.getItem("eventId");
      const {fileList} = this;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('file', file);
        formData.append('eventId', eventId);
        formData.append('venue', 'lobby');
      });
      this.loading = true
      const res = await axios({
        url: `${process.env.VUE_APP_SERVER_URL}/api/v1/file-upload`,
        method: 'post',
        processData: false,
        data: formData,
        success: () => {
          this.fileList = []
          this.loading = false
          this.$message.success('upload successfully.');
        },
        error: () => {
          this.loading = false
          this.$message.error('upload failed.');
        },
      });
      alert(JSON.stringify(res));
      if (res.data.success) {
        this.fileList = []
        this.loading = false
        this.$message.success('upload successfully.');
      } else {
        this.loading = false
        this.$message.error('upload failed.');
      }
    },
    // handleChange(info) {
    //   const status = info.file.status;
    //   if (status !== 'uploading') {
    //     alert(info.file, info.fileList);
    //   }
    //   if (status === 'done') {
    //     this.$message.success(`${info.file.name} file uploaded successfully.`);
    //   } else if (status === 'error') {
    //     this.$message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
    // submitHandler(info) {
    //   // alert(JSON.stringify(`${info.file.name}`))
    //   alert(info.file.status)
    // }
  },
};
</script>