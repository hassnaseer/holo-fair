<template>
  <v-card class="pa-5">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Agenda">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="2" tab="Question from Attendees" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
    </a-tabs>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    callback(key) {
      alert(key);
    },
  },
};
</script>
