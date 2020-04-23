<template>
  <b-container fluid="sm">
    <b-row class="mb-3">
      <Timer :onFinish="handleTimerFinish" :onResetAndSave="handleTimerResetAndSave" />
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
import Timer from "@/components/Timer";
import TimerStat from "@/components/TimerStat";

export default {
  components: { Timer, TimerStat },
  data() {
    return {
      timerName: "",
      timers: []
    };
  },
  methods: {
    handleTimerFinish(timer) {
      this.timers.push(timer);
    },
    handleTimerResetAndSave(timer, completedTime) {
      const minutes = Math.floor(completedTime / 60);
      const seconds = completedTime % 60;

      this.timers.push({
        ...timer,
        status: "resetted",
        completedMinutes: minutes,
        completedSeconds: seconds
      });
    }
  }
};
</script>

<style>
</style>