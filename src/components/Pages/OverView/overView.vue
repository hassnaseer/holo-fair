<template>
  <v-container fluid class="margin-botton">
    <v-row>
      <v-col cols="12" sm="12" md="8" lg="8">
          <v-card class="px-3">
            <v-row class="mt-0">
            <v-col cols="12" sm="12" md="4" lg="4">
    <a-steps :current="current" direction="vertical" @change="onChange" v-model="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
            </v-col>
            <v-col cols="12" sm="12" md="8" lg="8" class="steps-border">
    <div class="steps-content">
      <component :is="steps[current].content" />
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Skip Setup
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Publish
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Back
      </a-button>
    </div>
            </v-col>
  </v-row>
          </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4">
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
import FirstContent from './steps/step1.vue'


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

      current: 0,
      steps: [
        {
          title: 'Step Event',
          content: FirstContent,
        },
        {
          title: 'Build Venue',
          content: 'Second-content',
        },
        {
          title: 'Add Speakers',
          content: 'Last-content',
        },
        {
          title: 'Preview & Publish',
          content: 'Last-content',
        },
      ],
    };
  },
  methods: {
    
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
        onChange(current) {
      // alert('onChange:', current);
      this.current = current;
    },
  },
};
</script>
<style scoped>
.margin-botton{
  margin-bottom: 214px;
}
.steps-border{
  border-left: 1px solid gray;
}
.steps-content {
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #FFFFFF;
  min-height: 200px;
  padding: 8px;
  text-align: center;
}

.steps-action {
  margin-top: 24px;
}
</style>
