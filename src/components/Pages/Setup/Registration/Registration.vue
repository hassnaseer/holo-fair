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
                          :disabled="true"
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
                          :disabled="true"
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
                          :disabled="true"
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
import axios from 'axios'
export default {
    beforeRouteEnter (to, from, next) {
      const token = localStorage.getItem('token')
  if(token){
    next()
  }
  else
    next('/login')
  },
  data () {
    return {
    checkboxEmail:true,
    checkboxPassword:'',
    loading:false,
    checkboxName: '',
    checkboxNumber:true,
    checkboxPosition:true,
    checkboxCompany:'',
    };
    },
    methods: {
 async submitHandler () {
      try{
        this.loading = true
        await axios.post (`${process.env.VUE_APP_SERVER_URL}/api/v1/event-registration-fields`,{
          fullName:this.checkboxName,
          operation: 'C',
          email: this.checkboxEmail,
          password:this.checkboxPassword,
          phoneNumber:this.checkboxNumber,
          company:this.checkboxCompany,
          positionAtCompany: this.checkboxPosition
        });
       setTimeout(()=> {
       this.loading = false
       this.$notify({
        group: 'foo',
        type:"success",
        position:"top left",
        title: 'Successful.',
        text: "Form Fill success full:)",
      });
        },1000)
        this.$router.push({ path: '/setup/attendeesroles'})
      }catch(e){
          let message = JSON.stringify(e.response.data.meta.message);
          this.$notify({
            group: 'foo',
            type:"error",
            title: 'Success',
            text: message,
      });
      }
    }
    },
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