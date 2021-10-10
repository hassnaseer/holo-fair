<template>
  <v-container fluid>
    
    <v-row>
      <v-col cols="12" class="ml-5">
        <span class="span">Please select all the fields that your attendees should fill out in your registration page
          prior to entring the event.
        </span>
      </v-col>
      <v-container class="ml-2">
        
<v-col cols="12">
        <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          Email
        </div>
      </template>
    </v-checkbox>
      </v-col>
      <v-col cols="12">
        <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          Password
        </div>
      </template>
    </v-checkbox>
      </v-col>
      <v-col cols="12">
        <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          Full Name
        </div>
      </template>
    </v-checkbox>
      </v-col>
      <v-col cols="12">
        <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          Phone Number
        </div>
      </template>
    </v-checkbox>
      </v-col>
      <v-col cols="12">
        <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          Company
        </div>
      </template>
    </v-checkbox>
      </v-col>
      <v-col cols="12">
        <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          Position at company
        </div>
      </template>
    </v-checkbox>
      </v-col>
      </v-container>
      <v-col cols="3" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Cancel</v-btn>
        </v-col>
        <v-col cols="3" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Save</v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    dialog:false,
    firstname: '',
    passwordShow:false,
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
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be 6  characters or more!',
    ],
  }),
  methods: {
    submitHandler() {
      this.dialog = false
      alert('profile submit')
    },
  }
}
</script>
<style>
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}
.span{
  font-size: 29px;
}
</style>