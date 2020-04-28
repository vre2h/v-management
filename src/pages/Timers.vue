<template>
  <b-container fluid="sm">
    <b-row class="mb-3">
      <Timer
        :onFinish="handleTimerFinish"
        :onResetAndSave="handleTimerResetAndSave"
      />
    </b-row>
    <b-row class="d-flex justify-content-center">
      <b-col sm="8">
        <b-list-group>
          <TimerStat
            v-for="(timer, index) in timers"
            :key="timer.id"
            :timer="timer"
            :index="index"
            class="flex-column align-items-start"
          />
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Timer from '@/components/Timer.vue';
import TimerStat from '@/components/TimerStat.vue';
import store from '@/store/store';

import { mapState } from 'vuex';

export default {
  components: { Timer, TimerStat },
  beforeRouteEnter(to, _from, next) {
    store.dispatch('timers/getAllByUserIdAndDate').then(() => {
      next();
    });
  },
  methods: {
    handleTimerFinish(timer) {
      this.$store.dispatch('timers/save', timer);
    },
    handleTimerResetAndSave(timer, completedTime) {
      this.$store.dispatch('timers/resetAndSave', { timer, completedTime });
    },
  },
  computed: mapState('timers', ['timers']),
};
</script>

<style></style>
