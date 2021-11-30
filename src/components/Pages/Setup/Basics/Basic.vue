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
            <v-col cols="6" sm="6" md="6">
              <a-date-picker
                  v-model="startValue"
                  :disabled-date="disabledStartDate"
                  class="date-picker"
                  :show-time="{ use12Hours: true,format: 'HH:mm A' }"
                  format="MM-DD-YYYY HH:mm A"
                  placeholder="Start"
                  use12-hours
                  @openChange="handleStartOpenChange"
              />
            </v-col>
            <v-col cols="6" sm="6" md="6">
              <a-date-picker
                  class="date-picker"
                  v-model="endValue"
                  :disabled-date="disabledEndDate"
                  :show-time="{ use12Hours: true,format: 'HH:mm A' }"
                  required
                  use12-hours
                  format="MM-DD-YYYY HH:mm A"
                  placeholder="End"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
              />
            </v-col>
            <v-col md="12" sm="12">
              <span class="main-text">
                Please Select "Published" if you would like to keep your event
                live, but inaccessible to attendees until event start date and
                time. Please refer to the image below
              </span>
            </v-col>
            <v-col md="8" lg="8" sm="12">
              <span class="main-text">Text Message to be Displayed:</span>
              <v-textarea
                  solo
                  class="text-area mt-3"
                  name="input-7-4"
                  v-model="message"
                  label="Solo textarea"
              ></v-textarea>
              <v-checkbox v-model="checkbox">
                <template v-slot:label>
                  <div>
                    Include red ribon infront of Venue
                  </div>
                </template>
              </v-checkbox>
            </v-col>
            <v-col lg="4" md="4" sm="12">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg"/>
            </v-col>
            <v-col cols="5" class="float-right">
              <v-btn
                  :loading="loading"
                  @click="submitHandler()"
                  color="light-blue darken-2 px-8"
                  dark
              >Publish
              </v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-lg-space-between">
          <v-col cols="5" class="text-center">
            <v-btn
                :loading="loading"
                @click="back()"
                color="light-blue darken-2 px-8"
                dark
            >
              Cancel
            </v-btn
            >
          </v-col>
          <v-col cols="5" class="text-center">
            <v-btn
                :loading="loading"
                type="submit"
                color="light-blue darken-2 px-8"
                dark
            >
              Save
            </v-btn
            >
          </v-col>
        </v-card-actions>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("token");
    if (token) {
      next();
    } else next("/login");
  },
  data() {
    return {
      loading: false,
      startValue: "",
      endValue: "",
      endOpen: false,
      checkbox: false,
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
    back() {
      this.$router.back();
    },
    async submitHandler(flag = false) {
      try {
        this.loading = true;
        let res = await axios.post(
            `${process.env.VUE_APP_SERVER_URL}/api/v1/basic-event`,
            {
              isPublish: flag,
              eventName: this.eventName,
              operation: "C",
              startDate: this.startValue,
              endDate: this.endValue,
              message: this.message,
              checkbox: this.checkbox,
            }
        );
        localStorage.setItem("eventId", res.data.data.id);
        setTimeout(() => {
          this.loading = false;
          this.$notify({
            group: "foo",
            type: "success",
            position: "top left",
            title: "Successful.",
            text: "Form Filled Successfully:)",
          });
        }, 1000);
        this.$router.push({path: "/setup/registration"});
      } catch (e) {
        let message = JSON.stringify(e.response.data.meta.message);
        this.$notify({
          group: "foo",
          type: "error",
          title: "Success",
          text: message,
        });
      }
    },
  },
};
</script>
<style>
.text-area {
  width: 50%;
}

.date-picker {
  width: 100%;
}

.v-input__slot {
  background-color: transparent !important;
  border: none !important;
}

.ant-input {
  background-color: transparent !important;
  border: 1px solid #d9d9d9 !important;
}

.v-input__slot fieldset {
  background-color: transparent !important;
  border: 1px solid #d9d9d9 !important;
}

.ant-calendar-picker-input.ant-input {
  height: 50px;
}

.main-text {
  font-size: 26px;
  line-height: initial;
  color: gray;
}
</style>
