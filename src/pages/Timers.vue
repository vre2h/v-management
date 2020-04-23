<template>
  <b-container fluid="sm">
    <b-row class="mb-3">
      <Timer :onFinish="handleTimerFinish" :onReset="handleTimerReset" :onStart="handleTimerStart" />
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
    handleTimerFinish(timerId) {
      this.timers = this.timers.map(timer =>
        timer.id === timerId ? { ...timer, status: "finished" } : timer
      );
    },
    handleTimerReset(timerId, activeTime) {
      this.timers = this.timers.map(timer => {
        const allSeconds = Number(timer.minutes) * 60 + Number(timer.seconds);
        const completedSeconds = allSeconds - activeTime;
        const minutes = Math.floor(completedSeconds / 60);
        const seconds = completedSeconds % 60;

        return timer.id === timerId
          ? {
              ...timer,
              status: "resetted",
              completedMinutes: minutes,
              completedSeconds: seconds
            }
          : timer;
      });
    },
    handleTimerStart(timerInfo) {
      this.timers.push({ ...timerInfo, status: "started" });
    }
  }
};
</script>

<style>
</style>