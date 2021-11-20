<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <edit-profile-form>
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
  data() {
    return {
      data: {},
    }
  },
  async getEmails() {
    try {
      const response = await axios.get(
          "https://holo-fair.herokuapp.com/api/v1/user/1"
      );
      this.data = response.data.data;
    } catch (error) {
      alert(error);
    }
  },
  mounted() {
    this.getEmails()
  },
  components: {
    EditProfileForm,
    UserCard
  }
}

</script>
<style>

</style>
