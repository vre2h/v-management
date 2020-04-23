<template>
  <b-alert show :variant="alertType" class="notification-bar">
    {{ notification.message }}
  </b-alert>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000);
  },
  beforeDestroy() {
    clearTimeout();
  },
  computed: {
    alertType() {
      return this.notification.type === 'error' ? 'danger' : 'success';
    },
  },
  methods: mapActions('notification', ['remove']),
};
</script>

<style>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
