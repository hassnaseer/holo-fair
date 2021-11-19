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
                  name="avatar"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="img-avatar"/>
                  <div v-else class="mt-6">
                    <a-icon :type="loading ? 'loading' : 'plus'" />
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
              <v-text-field outlined required v-model="email"
                            :rules="emailRules"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-label>Contact Number</v-label>
              <v-text-field outlined type="number" required v-model="ContactNumber"></v-text-field>
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
              v-model="State"
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
            <v-btn type="submit" color="light-blue darken-2 px-8" class="p-2 mr-5 float-right" dark>Update Profile</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import axios from 'axios';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {

  data: () => ({
    firstName:'',
          loading: false,
      imageUrl: '',
    lastName:'',
    email:'',
    contactNumber:'',
    address:'',
    city:'',
    state:'',
    zipCode:'',
    country:'',
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
        handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  },
    async submitHandler() {
      // alert(this.city)
      if (this.$refs.form.validate()){
        let result = await axios.post ("https://holo-fair.herokuapp.com/api/v1/user",{
          email:this.email,
          password: this.password,
          firstName:this.firstName,
          lastName:this.lastName,
          contactNumber:this.contactNumber,
          address:this.address,
          city:this.city,
          state:this.state,
          imageUrl:this.profileImage,
          zipCode:this.zipCode,
          country:this.country,
          operation:'c'
        });
        alert(result)
  }
}
  }

</script>
<style>
.ant-upload-picture-card-wrapper{
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
