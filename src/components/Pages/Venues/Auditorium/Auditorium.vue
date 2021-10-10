<template>
  <v-card class="pa-5">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Agenda">
        <Agenda />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Question from Attendees" force-render>
        <Question />
      </a-tab-pane>
    </a-tabs>
  </v-card>
</template>
<script>
import Agenda from './Agenda.vue';
import Question from './Question.vue';
export default {
  components: {
    Agenda,
    Question
  },
  methods: {
    // callback(key) {
    //   alert(key);
    // },
  },
};
</script>
