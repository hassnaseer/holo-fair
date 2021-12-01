<template>
  <v-container fluid>
    <v-row>
      <v-col lg="12" md="12" sm="12">
        <v-data-table
            :headers="headers"
            :items="data"
            :color="getColor(carbs)"
            sort-by="calories"
            class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
                flat
            >
              <v-dialog
                  v-model="dialog"
                  max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                  >
                    ADD New User
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="editedItem.fullName"
                              label="Full Name"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-select
                              v-model="editedItem.role"
                              :items="roles"
                              label="Roles"
                          ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="editedItem.email"
                              label="Email"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <span
                color="primary"
                @click="initialize"
            >
              No Record Found
            </span>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="2" class="text-center">
        <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Cancel</v-btn>
      </v-col>
      <v-col cols="2" class="text-center">
        <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Save</v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>
<script>
import axios from "axios";

export default {
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else
      next('/login')
  },
  data: () => ({
    data: [],
    roles: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Full Name',
        align: 'start',
        sortable: false,
        value: 'fullName',
      },
      {text: 'Email', value: 'email'},
      {text: 'Roles', value: 'role'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      fullName: '',
      email: '',
      role: '',
    },
    defaultItem: {
      fullName: '',
      email: '',
      role: '',
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },
  mounted() {
    this.getAttendees();
    this.getRoles();
  },
  methods: {
    async getRoles() {
      try {
        const response = await axios.get(
            `${process.env.VUE_APP_SERVER_URL}/api/v1/attendee-roles`
        );
        let roles = response.data.data;
        if (roles) {
          this.roles = roles.map(r => {
            return r.roleName
          });

        }
      } catch (error) {
        alert(error);
      }
    },
    async getAttendees() {
      try {
        const eventId = localStorage.getItem("eventId");
        const id = eventId ? eventId : 1
        const response = await axios.get(
            `${process.env.VUE_APP_SERVER_URL}/api/v1/attendees/${id}`
        );
        this.data = response.data.data;
      } catch (error) {
        alert(error);
      }
    },
    getColor(carbs) {
      if (carbs === "Active") return 'red'
      else if (carbs === "Inactive") return 'orange'
      else return 'green'
    },
    initialize() {
      this.desserts = [
        {
          name: 'Anurag',
          fat: 'anurag@outrealxr.com',
          roles: 'admin',
        },
        {
          name: 'Anurag',
          fat: 'anurag@outrealxr.com',
          roles: 'client',
        },
      ]
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      try {
        const eventId = localStorage.getItem("eventId");
        if (this.formTitle === "New User") {
          await axios.post(`${process.env.VUE_APP_SERVER_URL}/api/v1/attendee-people`, {
            ...this.editedItem, operation: "C", eventId: eventId
          });
          // alert(res.data.meta.message)
        } else {
          await axios.post(`${process.env.VUE_APP_SERVER_URL}/api/v1/attendee-people`, {
            ...this.editedItem, operation: "E", eventId: eventId
          });
        }
        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem)
        } else {
          this.data.push(this.editedItem)
        }
        this.close()
      } catch (er) {
        alert("Error: " + er.message)
      }
    }
  }
}
</script>