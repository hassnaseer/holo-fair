<template>
  <div class="text-xs-center">
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
            color="red lighten-2"
            dark
            v-on="on"
        >
          Click Me
        </v-btn>
      </template>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Profile</span>
            </v-card-title>
            <v-form @submit.prevent="submitHandler" ref="form">
              <v-card-text>
                <v-container grid-list-md>
                  <v-row>
                    <v-avatar class="mx-auto my-3" size="80"
                    >
                      <img
                          src="https://cdn.vuetifyjs.com/images/john.jpg"
                          alt="John"
                          class="mr-12"
                      >
                    </v-avatar>
                  </v-row>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                      <v-label>First Name</v-label>
                      <v-text-field required outlined></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-label>Last Name</v-label>
                      <v-text-field required outlined></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-label>Email</v-label>
                      <v-text-field outlined required v-model="email"
                                    :rules="emailRules"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-label>Contact Number</v-label>
                      <v-text-field outlined type="number" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-label>Address</v-label>
                      <v-text-field outlined type="address" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-label>City</v-label>
                      <v-select
                          :items="['Lahore', 'Canada', 'India', 'America']"
                          outlined
                          required
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-label>State</v-label>
                      <v-select
                          :items="['Punjab', 'Canada', 'India', 'America']"
                          outlined
                          required
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-label>Zip Code</v-label>
                      <v-select
                          :items="['54000', '51700', '98000', '6100']"
                          outlined
                          required
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-label>Country</v-label>
                      <v-select
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
                <v-btn type="submit" color="light-blue darken-2 px-8" class="p-4 ml-8" dark>Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    dialog: false,
    firstname: '',
    passwordShow: false,
    loading: false,
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be 6  characters or more!',
    ],
  }),
  methods: {
    async submitHandler() {
      this.dialog = false
      alert('profile submit')
      const id = localStorage.getItem("userid");
      const formData = new FormData();
      //formData.append('profileImage', file);
      formData.append('operation', "E");
      formData.append('id', id);
      formData.append('firstName', 'Hami');
      formData.append('lastName', 'Shah');
      formData.append('ciy', 'Lahore');
      formData.append('country', 'Pakistan');
      formData.append('state', 'Punjab');
      this.loading = true
      const res = await axios({
        url: `${process.env.VUE_APP_SERVER_URL}/api/v1/user/${id}`,
        method: 'post',
        processData: false,
        data: formData,
      });
      alert(JSON.stringify(res));
      if (res.data.success) {
        this.$message.success('Updated successfully.');
      } else {
        this.loading = false
        this.$message.error('Updation failed.');
      }
    },
  },
}
</script>
<style>
.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 45px;
}
</style>