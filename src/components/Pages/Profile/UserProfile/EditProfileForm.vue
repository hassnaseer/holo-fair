<template>
  <v-card class="pa-1">
    <v-card-title>
      <span class="headline">Edit Profile</span>
    </v-card-title>
    <v-form @submit.prevent="submitHandler" ref="form">
      <v-card-text>
        <v-container grid-list-md>
          <v-row>
            <v-avatar class="mx-auto" size="100"
            >
              <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                  class="mb-12"
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

export default {
  components: {

  },
  data () {
    return {
      user: {
        company: 'Light dashboard',
        username: 'michael23',
        email: '',
        firstName: 'Mike',
        lastName: 'Andrew',
        address: 'Melbourne, Australia',
        city: 'melbourne',
        country: 'Australia',
        postalCode: '',
        aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
      }
    }
  },
  methods: {
    submitHandler () {
      alert('Your data: ' + JSON.stringify(this.user))
    }
  }
}

</script>
<style>

</style>
