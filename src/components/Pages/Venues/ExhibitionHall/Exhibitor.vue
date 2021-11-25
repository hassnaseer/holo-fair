<template>
<v-container fluid>
    <div class="row">
       <v-col md="12" sm="12">
      <span>
        Upload Exhibitor booth content Below.
      </span>
    </v-col>
        <v-col md="12" sm="12">
      <span>
        If you don't have Exhibitor booth or stands, Leave this section empty.
      </span>
    </v-col>
        <div class="col-lg-4 col-md-6 col-sm-12">
<a-upload-dragger
    name="file"
    :multiple="true"
    :default-file-list="fileList"
    list-type="picture"
    :remove="handleRemove"
    :beforeUpload="beforeUpload"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">
      Click or drag file to this area to upload
    </p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </a-upload-dragger>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
<a-upload-dragger
    name="file"
    :multiple="true"
    :default-file-list="fileList"
    list-type="picture"
    :remove="handleRemove"
    :beforeUpload="beforeUpload"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">
      Click or drag file to this area to upload
    </p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </a-upload-dragger>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
<a-upload-dragger
    name="file"
    :multiple="true"
    :default-file-list="fileList"
    list-type="picture"
    :remove="handleRemove"
    :beforeUpload="beforeUpload"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">
      Click or drag file to this area to upload
    </p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </a-upload-dragger>
        </div>
         <v-col cols="1" lg="1" md="1" sm="1" class="pl-12">
<a-icon type="exclamation-circle" :style="{ fontSize: '30px'}"/>
  </v-col>
  <v-col col="10" lg="10" md="10" sm="10">
    <h3>Max.Upload Size is : 2MB,</h3>
    <h3>Recommended size is 2000* 800 px (5:2)</h3>
  </v-col>
<v-col cols="2" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Cancel</v-btn>
        </v-col>
        <v-col cols="2" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Save</v-btn>
        </v-col>
    </div>

</v-container>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      fileList: [],
      loading: false,
    };
  },
  methods: {
    async handleRemove(file) {
      const eventId = localStorage.getItem("eventId");
      const res = await axios.post(`${process.env.VUE_APP_SERVER_URL}/api/v1/remove-file/${eventId}/exhibitionhall/${file.uid}`);
      this.$message.success(res.data.message);
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
        if (file.uid.includes("vc-upload-")) {
          formData.append('file', file);
        }
      });
      formData.append('eventId', eventId);
      formData.append('venue', 'exhibitionhall');
      formData.append("boothName", 'exhibitionhall');
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
      if (res.data.success) {
        this.loading = false
        this.$message.success('upload successfully.');
      } else {
        this.loading = false
        this.$message.error('upload failed.');
      }
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        // alert(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>