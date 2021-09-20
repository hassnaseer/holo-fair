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
                  placeholder="Event Name"
                  outlined
              />
            </v-col>
            <v-col
                cols="6"
                sm="6"
                md="6"
            >
              <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <Label>Start Date</Label>
                  <v-text-field
                      v-model="date"
                      outlined
                      placeholder="Start Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col
                cols="6"
                sm="6"
                md="6"
            >
              <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <Label>End Date</Label>
                  <v-text-field
                      v-model="date"
                      outlined
                      placeholder="End Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col md="12" sm="12">
              <span class="main-text">
                Please Select "Published" if you would like to keep youe event live,
                but inaccessible to attendeees untill event start date and time.
                Please refer to the image below
              </span>
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
export default {
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>
<style>
.main-text{
  font-size: 38px;
  word-spacing: 1rem;
}
</style>