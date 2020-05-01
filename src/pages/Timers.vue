<template>
  <b-container fluid="sm">
    <b-row class="mb-3">
      <Timer
        :onFinish="handleTimerFinish"
        :onStopAndSave="handleTimerStopAndSave"
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
            :onDelete="handleTimerDelete"
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
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  components: { Timer, TimerStat },
  beforeRouteEnter(to, _from, next) {
    const filterTimerDate = (timer) => {
      const timerDate = moment(timer.date);
      const now = moment();
      return now.diff(timerDate, 'days') === 0;
    };
    store
      .dispatch('timers/getAllByUserIdAndDate', {
        filterDate: filterTimerDate,
      })
      .then(() => {
        next();
      });
  },
  methods: {
    handleTimerFinish(timer) {
      this.$store.dispatch('timers/save', timer);
    },
    handleTimerDelete(timerId) {
      this.$store.dispatch('timers/delete', timerId);
    },
    handleTimerStopAndSave(timer, completedTime) {
      this.$store.dispatch('timers/stopAndSave', { timer, completedTime });
    },
  },
  computed: mapState('timers', ['timers']),
};
</script>

<style></style>
