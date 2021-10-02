<template>
  <v-card class="container">
    <v-card-title>
      <span class="headline">User Profile</span>
    </v-card-title>
    <v-card-content>
      <v-row>
        <v-avatar class="mx-auto" size="100"
        >
          <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          >
        </v-avatar>
      </v-row>
      <v-container fluid>
        <v-row>
          <span class="col-12 pb-0 text-center">Name: Malik Hassam</span>
          <span class="col-12 pb-0 text-center">Email: Hassam@gmail.com</span>
          <span class="col-12 pb-0 text-center">Address: Dummy Road House 123 City</span>
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
  name:'imageUpload',
  components: {
  },
  data () {
    return {
      items: {
        image : null,
        imageUrl: null
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
    getClasses (index) {
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
