<template>
  <v-card class="pa-5">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Acrive User Bt Time">
        <ActiveUserByTime />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Active User By Area" force-render>
        <ActiveUserByArea />
      </a-tab-pane>
    </a-tabs>
  </v-card>
</template>
<script>
import ActiveUserByTime from './userByTime.vue'
import ActiveUserByArea from './userByArea.vue'
export default {
  components: {
    ActiveUserByTime,
    ActiveUserByArea
  },
  methods: {
  },
};
</script>

