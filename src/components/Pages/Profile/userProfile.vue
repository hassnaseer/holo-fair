<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <edit-profile-form userData="data">
          </edit-profile-form>
        </div>
        <div class="col-md-4">
          <user-card>
          </user-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditProfileForm from './UserProfile/EditProfileForm.vue'
import UserCard from './UserProfile/UserCard.vue'
import axios from "axios";

export default {
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else
      next('/login')
  },
  mounted() {
    this.getEmails()
  },
  methods: {
    async getEmails() {
      try {
        const id = localStorage.getItem("userid");
        const response = await axios.get(
            `${process.env.VUE_APP_SERVER_URL}/api/v1/user/${id}`
        );
        this.userData = response.data.data;
      } catch (error) {
        alert(error);
      }
    },
  },
  components: {
    EditProfileForm,
    UserCard
  },
  data() {
    return {
      userData: {},
    }
  },
}

</script>
<style>

</style>
