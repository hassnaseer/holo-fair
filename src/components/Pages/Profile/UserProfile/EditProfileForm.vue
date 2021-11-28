<template>
  <v-card class="pa-1">
    <v-card-title>
      <span class="headline">Edit Profile</span>
    </v-card-title>
    <v-form @submit.prevent="submitHandler" ref="form">
      <v-card-text>
        <v-container grid-list-md>
          <v-row>
            <v-col cols="12">
              <div class="mx-auto text-center">
                <a-upload
                    name="profileImage"
                    v-model="imageUrl"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :customRequest="uploadFile"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="img-avatar"/>
                  <div v-else class="mt-6">
                    <a-icon :type="loading ? 'loading' : 'plus'"/>
                    <div class="ant-upload-text">
                      Upload
                    </div>
                  </div>
                </a-upload>
              </div>
            </v-col>

          </v-row>
          <v-layout wrap>
            <v-flex xs12 sm6 md6>
              <v-label>First Name</v-label>
              <v-text-field required outlined v-model="firstName"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-label>Last Name</v-label>
              <v-text-field required outlined v-model="lastName"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-label>Email</v-label>
              <v-text-field disabled outlined required v-model="email"
                            :rules="emailRules"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-label>Contact Number</v-label>
              <v-text-field outlined type="number" required v-model="contactNumber"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-label>Address</v-label>
              <v-text-field outlined type="address" required v-model="address"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-label>City</v-label>
              <v-select
                  :items="['Lahore', 'Canada', 'India', 'America']"
                  outlined
                  v-model="city"
                  required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-label>State</v-label>
              <v-select
                  v-model="state"
                  :items="['Punjab', 'Canada', 'India', 'America']"
                  outlined
                  required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-label>Zip Code</v-label>
              <v-select
                  v-model="zipCode"
                  :items="['54000', '51700', '98000', '6100']"
                  outlined
                  required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-label>Country</v-label>
              <v-select
                  v-model="country"
                  :items="['Pakistan', 'Canada', 'India', 'America']"
                  outlined
                  required
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-label>Password</v-label>
              <v-text-field outlined
                            v-model="password"
                            :rules="passwordRules"
                            :type="passwordShow?'text':'password'"
                            @click:append="passwordShow = !passwordShow"
                            required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-btn type="submit" color="light-blue darken-2 px-8" class="p-2 mr-5 float-right" dark>Update Profile
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import axios from 'axios';

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

export default {
  props: ['user'],
  mounted() {
    setTimeout(() => {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.imageUrl = this.user.imageUrl;
      this.city = this.user.city;
      this.country = this.user.country;
      this.state = this.user.state;
      this.contactNumber = parseInt(this.user.contactNumber);
      this.zipCode = this.user.zipCode;
      this.address = this.user.address;
    }, 1000);
  },
  data: () => ({
    firstName: '',
    loading: false,
    imageUrl: '',
    lastName: '',
    email: '',
    contactNumber: null,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be 6  characters or more!',
    ],
  }),
  methods: {
    uploadFile({onSuccess, onError, file}) {
      this.upload(file)
          .then((res) => {
            onSuccess(null, res);
          })
          .catch((err) => {
            onError(null, file);
            alert(err);
          });
    },
    async upload(file) {
      const formData = new FormData();
      formData.append('profileImage', file);
      const id = localStorage.getItem("userid");
      let res = await axios.post(`${process.env.VUE_APP_SERVER_URL}/api/v1/profile-image/${id}`, formData);
      this.imageUrl = res.data.data;
      localStorage.setItem("imageUrl", this.imageUrl);
      window.location.reload();
    },
    async submitHandler() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append('operation', "E");
        formData.append('id', localStorage.getItem('userid'));
        formData.append('firstName', this.firstName);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('lastName', this.lastName);
        formData.append('city', this.city);
        formData.append('country', this.country);
        formData.append('state', this.state);
        formData.append('contactNumber', this.contactNumber);
        formData.append('zipCode', this.zipCode);
        formData.append('address', this.address);
        let result = await axios.post(`${process.env.VUE_APP_SERVER_URL}/api/v1/user`, formData);
        let message = JSON.stringify(result.data.meta.message);
        setTimeout(() => {
          this.loading = false
          this.$notify({
            group: 'foo',
            position: "top left",
            title: 'Success',
            type: "success",
            text: message,
          });
        }, 1000)
      }
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
      }
      if (info.file.status === 'done') {
        // alert(JSON.stringify(info.file));
        // const id = localStorage.getItem("userid");
        // const res = await axios.post(`${process.env.VUE_APP_SERVER_URL}/api/v1/profile-image/${id}`,info.file)
        // Get this url from response in real world.
        //alert(JSON.stringify(res));
        // getBase64(info.file.originFileObj, imageUrl => {
        //   this.imageUrl = imageUrl;
        //   this.loading = false;
        // });
      }
      if (info.file.status === "error") {
        this.loading = false;
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
        return isJpgOrPng;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
        return isLt2M;
      }
    },
  },

}

</script>
<style>
.ant-upload-picture-card-wrapper {
  zoom: 1;
  display: inline-block;
}

.avatar-uploader > .ant-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed;
  border-radius: 50px;
}

.img-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
