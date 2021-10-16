<template>
<v-container fluid>
  <v-row>
     <v-col md="12" sm="12">
      <span>
        Upload Media content Below to your meeting room below.
      </span>
    </v-col>
    <v-col lg="12" md="12" sm="12">

<a-upload-dragger
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
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
    </v-col>
   <v-col cols="1" lg="1" md="1" sm="1" class="pl-12">
<a-icon type="exclamation-circle" :style="{ fontSize: '30px'}"/>
  </v-col>
  <v-col col="10" lg="10" md="10" sm="10">
    <h3>Max.Upload Size is : 2MB,</h3>
    <h3>Recomended size is 2000* 800 px (5:2)</h3>
  </v-col>
<v-col cols="2" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Cancel</v-btn>
        </v-col>
        <v-col cols="2" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Save</v-btn>
        </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        alert(info.file, info.fileList);
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