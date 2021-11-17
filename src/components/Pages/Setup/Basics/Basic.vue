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
                v-model="endValue"
                :disabled-date="disabledEndDate"
                show-time
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
        md="6"
        lg="6"
        sm="12"
      >
      <h2>Text Message to be Displayed</h2>
        <v-textarea
          solo
          name="input-7-4"
          v-model="message"
          label="Solo textarea"
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          Include red ribon infront of Venue
        </div>
      </template>
    </v-checkbox>
      </v-col>
          </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-col cols="5" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Cancel</v-btn>
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
  data() {
    return {
      loading:false,
      startValue: null,
      endValue: null,
      endOpen: false,
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
    async submitHandler () {
      try{
        this.loading = true
        let result = await axios.post ("https://holo-fair.herokuapp.com/api/v1/basic-event",{
          eventName:this.eventName,
          operation: 'C',
          startDate: this.startValue,
          endDate:this.endValue,
          message:this.message
        });
        alert("success", result)
        this.loading = false
      }catch(e){
        alert(e)
      }
      alert(this.endValue)
    }
  },
}
</script>
<style>
.main-text{
  font-size: 30px;
}
</style>