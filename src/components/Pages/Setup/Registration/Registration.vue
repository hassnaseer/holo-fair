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
                  <v-form @submit.prevent="submitHandler" ref="form">
                    <v-card-text>
                      <v-checkbox
                          v-model="checkboxEmail"
                          label="Email"
                          required
                        ></v-checkbox>
                        <v-checkbox
                          v-model="checkboxPassword"
                          label="Password"
                          required
                        ></v-checkbox>
                        <v-checkbox
                          v-model="checkboxName"
                          label="Full Name"
                          required
                        ></v-checkbox>
                        <v-checkbox
                          v-model="checkboxNumber"
                          label="Phone Number"
                          required
                        ></v-checkbox>
                        <v-checkbox
                          v-model="checkboxCompany"
                          label="Company"
                          required
                        ></v-checkbox>
                        <v-checkbox
                          v-model="checkboxPosition"
                          label="Position At Company"
                          required
                        ></v-checkbox>
                    </v-card-text>
                    <v-card-actions>
                      <div class="text-center">
                        <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Send</v-btn>
                      </div>
                    </v-card-actions>
                  </v-form>
             </v-col>
      </v-container>
    </v-row>
  </v-container>
      </template>
<script>
export default {
  data: () => ({
    checkboxEmail:true,
    checkboxPassword:'',
    checkboxName: '',
    checkboxNumber:true,
    checkboxPosition:true,
    checkboxCompany:'',
    }),
  methods: {
    submitHandler() {
      alert(this.checkboxPassword)
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