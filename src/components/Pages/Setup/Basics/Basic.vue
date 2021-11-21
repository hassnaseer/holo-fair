<template>
  <v-container>
    <v-form @submit.prevent="submitHandler" ref="form">
      <v-row>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <label>Event Name</label>
              <v-text-field
                  type="input"
                  v-model="eventName"
                  placeholder="Event Name"
                  outlined
              />
            </v-col>
            <v-col
                cols="6"
                sm="6"
                md="6"
            >
                  <a-date-picker
                    v-model="startValue"
                    :disabled-date="disabledStartDate"
                    show-time
                    class="date-picker"
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Start"
                    @openChange="handleStartOpenChange"
                  />
            </v-col>
            <v-col
                cols="6"
                sm="6"
                md="6"
            >
              <a-date-picker
              class="date-picker"
                v-model="endValue"
                :disabled-date="disabledEndDate"
                show-time
                required
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="End"
                :open="endOpen"
                @openChange="handleEndOpenChange"
              />
            </v-col>
            <v-col md="12" sm="12">
              <span class="main-text">
                Please Select "Published" if you would like to keep youe event live,
                but inaccessible to attendeees untill event start date and time.
                Please refer to the image below
              </span>
            </v-col>
            <v-col
        cols="12"
        md="12"
        lg="12"
        sm="12"
      >
      <span class="main-text mb-4">Text Message to be Displayed:</span>
        <v-textarea
          solo
          class="text-area"
          name="input-7-4"
          v-model="message"
          label="Solo textarea"
        ></v-textarea>
      </v-col>
      <v-col cols="6">
        <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          Include red ribon infront of Venue
        </div>
      </template>
    </v-checkbox>
      </v-col>
      <v-col cols="6">
        <img v-if="checkbox === true" src="/assets/logo.png">
      </v-col>
          <v-col cols="5" class="float-right">
          <v-btn :loading="loading" @click="submitHandler()" color="light-blue darken-2 px-8" dark>Publish</v-btn>
        </v-col>
          </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-col cols="5" class="text-center">
          <v-btn :loading="loading" @click="back()" color="light-blue darken-2 px-8" dark> Cancel</v-btn>
        </v-col>
        <v-col cols="5" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Save</v-btn>
        </v-col>
      </v-card-actions>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import axios from 'axios';
export default {
    beforeRouteEnter (to, from, next) {
      const token = localStorage.getItem('token')
  if(token){
    next()
  }
  else
    next('/login')
  },
  data() {
    return {
      loading:false,
      startValue: "",
      endValue: "",
      endOpen: false,
      checkbox: false
    };
  },
  methods: {
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    back(){
      this.$router.back();
    },
    async submitHandler () {
      try{
        this.loading = true
        await axios.post ("https://holo-fair.herokuapp.com/api/v1/basic-event",{
          eventName:this.eventName,
          operation: 'C',
          startDate: this.startValue,
          endDate:this.endValue,
          message:this.message,
          checkbox:this.checkbox,
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
        this.$router.push({ path: '/setup/registration'})
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
.text-area{
  width: 50%;
}
.date-picker{
  width: 100%;
}
.v-input__slot{
  background-color: transparent !important;
border: 1px solid #d9d9d9 !important;
  /* border: 1px solid grey !important; */
}
.ant-input{
background-color: transparent !important;
border: 1px solid #d9d9d9 !important;
}
.v-input__slot fieldset{
  background-color: transparent !important;
border: 1px solid #d9d9d9 !important;
}
.main-text{
  font-size: 26px;
  color:gray;
}
</style>