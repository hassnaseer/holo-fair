<template>
  <v-container fluid class="mb-11">
    <v-row>
      <v-col cols="8">
        <v-stepper
            v-model="e6"
            vertical
            class="pa-2"
        >
          <v-row>
            <v-stepper-step
                :complete="e6 > 1"
                step="1"
            >
              Setup Event
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-card
                  color="grey lighten-1"
                  class="mb-12"
                  height="200px"
              ></v-card>
              <v-btn
                  color="primary"
                  @click="e6 = 2"
              >
                Continue
              </v-btn>
              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-row>
          <v-row>
            <v-stepper-step
                :complete="e6 > 2"
                step="2"
            >
              Build Venue
            </v-stepper-step>
            <v-stepper-content step="2">
              <v-card
                  color="grey lighten-1"
                  class="mb-12"
                  height="200px"
              ></v-card>
              <v-btn
                  color="primary"
                  @click="e6 = 3"
              >
                Continue
              </v-btn>
              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-row>
          <v-row>
            <v-stepper-step
                :complete="e6 > 3"
                step="3"
            >
              Add Speakers
            </v-stepper-step>
            <v-stepper-content step="3">
              <v-card
                  color="grey lighten-1"
                  class="mb-12"
                  height="200px"
              ></v-card>
              <v-btn
                  color="primary"
                  @click="e6 = 4"
              >
                Continue
              </v-btn>
              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-row>
          <v-row>
            <v-stepper-step step="4">
              Preview & Published
            </v-stepper-step>
            <v-stepper-content step="4">
              <v-card
                  color="grey lighten-1"
                  class="mb-12"
                  height="200px"
              ></v-card>
              <v-btn
                  color="primary"
                  @click="e6 = 1"
              >
                Continue
              </v-btn>
              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-row>
        </v-stepper>
      </v-col>
      <v-col cols="4">
        <v-card
            outlined
            class="pa-3"
        >
          <v-card-title>Event Links</v-card-title>
          <v-card-text>
            Links for attendees and Speakers to access your event, or steam over RTMP.
          </v-card-text><br>
          <v-card-actions><a href="">View Links</a></v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>
<script>
export default {
  name:'Profile',
  data () {
    return {
      e6: 1,
    }
  },
}
</script>