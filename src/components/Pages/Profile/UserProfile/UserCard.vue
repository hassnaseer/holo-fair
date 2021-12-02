<template>
  <v-card class="container">
    <v-card-title>
      <span class="headline">User Profile</span>
    </v-card-title>
    <v-card-content>
      <v-row>
        <v-avatar class="mx-auto" size="100"
        >
          <img v-if="this.user.imageUrl"
              :src="this.user.imageUrl"
              alt="No Image"
          >
          <img v-else
               src="http://ulm.webstudio.co.zw/themes/adminlte/img/user.png"
               alt="No Image"
          >
        </v-avatar>
      </v-row>
      <v-container fluid>
        <v-row>
          <span class="col-12 pb-0 text-center">Name: {{ this.user.firstName + " " + this.user.lastName }}</span>
          <span class="col-12 pb-0 text-center">Email: {{ this.user.email }}</span>
          <span v-if="this.user.address" class="col-12 pb-0 text-center">Address: {{ this.user.address }}</span>
        </v-row>
      </v-container>
    </v-card-content>
    <!--    <input type="file" accept="image/*" @change="onChange" />-->
    <!--    <div id="preview">-->
    <!--      <img v-if="items.imageUrl" :src="items.imageUrl" />-->
    <!--    </div>-->
  </v-card>
</template>
<script>
export default {
  name: 'imageUpload',
  props: ['user'],
  components: {},
  data() {
    return {
      items: {
        image: null,
        imageUrl: '../../public/HoloFair-by-Outreal-XR-Logo.png'
      },
      details: [
        {
          title: '12',
          subTitle: 'Files'
        },
        {
          title: '2GB',
          subTitle: 'Used'
        },
        {
          title: '24,6$',
          subTitle: 'Spent'
        }
      ]
    }
  },
  methods: {
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
    },
    getClasses(index) {
      var remainder = index % 3
      if (remainder === 0) {
        return 'col-md-3 col-md-offset-1'
      } else if (remainder === 2) {
        return 'col-md-4'
      } else {
        return 'col-md-3'
      }
    }
  }
}

</script>
<style>

</style>
