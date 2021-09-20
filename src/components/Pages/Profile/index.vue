<template>
    <v-container>
      <h2 class="ma-3">Edit Profile</h2>
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
      <v-form @submit.prevent="submitHandler" ref="form">
        <v-row>
          <v-col cols="12" md="6">
            <v-label>First Name</v-label>
            <v-text-field
                v-model="firstname"
                :rules="firstname"
                type="firstname"
                outlined
                placeholder="First Name"
                prepend-inner-icon="mdi-account"
                required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-label>Last Name</v-label>
            <v-text-field
                v-model="lastname"
                :rules="lastname"
                :type="lastname"
                outlined
                placeholder="Last Name"
                prepend-inner-icon="mdi-account"
                required
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-label>Email</v-label>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                type="email"
                outlined
                placeholder="Email"
                required
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-label>Contact Number</v-label>
            <v-text-field
                v-model="Contact"
                :rules="Contact"
                :type="number"
                placeholder="Contact Number"
                outlined
                required
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-label>Address</v-label>
            <v-text-field
                v-model="Address"
                :rules="Address"
                :type="Address"
                placeholder="Address"
                outlined
                required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-label>City</v-label>
            <v-text-field
                v-model="city"
                type="email"
                placeholder="City"
                outlined
                required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-label>State</v-label>
            <v-text-field
                v-model="state"
                :type="state"
                placeholder="State"
                outlined
                required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-label>Zip Code</v-label>
            <v-text-field
                v-model="zipcode"
                type="zipcode"
                outlined
                placeholder="Zip Code"
                required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-label>Country</v-label>
            <v-text-field
                v-model="country"
                :type="country"
                placeholder="Country"
                outlined
                required
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-label>Password</v-label>
            <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="passwordShow?'text':'password'"
                placeholder="Password"
                outlined
                prepend-inner-icon="mdi-key"
                :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
                required
            />
          </v-col>
          <div class="mx-auto my-10">
            <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Save</v-btn>
          </div>
        </v-row>
      </v-form>
    </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    firstname: '',
    loading:false,
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
  }),
  methods: {
    submitHandler() {
      alert('profile submit')
    },
  }
}
</script>

