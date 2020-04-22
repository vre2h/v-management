<template>
  <div class="wrapper">
    <b-input-group prepend="Timer" class="mb-2">
      <b-form-input
        aria-label="Minutes"
        :disabled="timerProcess === 'settled'"
        v-model="timer.minutes"
      ></b-form-input>
      <b-form-input
        aria-label="Seconds"
        :disabled="timerProcess === 'settled'"
        v-model="timer.seconds"
      ></b-form-input>
    </b-input-group>
    <b-button-group class="btn-wrapper">
      <b-button
        variant="outline-primary"
        :disabled="timerProcess === 'settled'"
        @click="startTimer"
      >Start</b-button>
      <b-button
        variant="outline-primary"
        @click="resetTimer"
        :disabled="timerProcess === 'unset'"
      >Reset</b-button>
    </b-button-group>
  </div>
</template>

<script>
import { beep } from "../utils";

export default {
  data() {
    return {
      timerProcess: "unset",
      timer: this.createTimerValues(),
      timeoutId: null,
      timers: []
    };
  },
  methods: {
    startTimer() {
      this.timerProcess = "settled";
      this.timeoutId = setInterval(() => {
        const restTime = this.activeTime - 1;
        const minutes = Math.floor(restTime / 60);
        const seconds = restTime % 60;

        const makeTimerComplete = timer =>
          timer.id === this.timeoutId ? { ...timer, complete: true } : timer;

        if (restTime < 0) {
          this.resetTimer();
        } else if (restTime === 0) {
          this.timers = this.timers.map(makeTimerComplete);
          this.resetTimer();
          beep();
        } else {
          this.timer.minutes = minutes;
          this.timer.seconds = seconds;
        }
      }, 1000);

      this.timers.push({
        id: this.timeoutId,
        minutes: this.timer.minutes,
        seconds: this.timer.seconds,
        complete: false
      });
    },
    resetTimer() {
      const addcompletedTime = timer =>
        timer.id === this.timeoutId
          ? {
              ...timer,
              completedMinutes: timer.minutes - this.timer.minutes,
              completedSeconds: timer.seconds - this.timer.seconds
            }
          : timer;

      this.timers = this.timers.map(addcompletedTime);

      clearTimeout(this.timeoutId);
      this.timerProcess = "unset";
      this.timer = this.createTimerValues();
    },
    createTimerValues() {
      return {
        minutes: "30",
        seconds: "00"
      };
    }
  },
  computed: {
    activeTime() {
      return Number(this.timer.minutes) * 60 + Number(this.timer.seconds);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: unset;

  max-width: 320px;
  margin: 0 auto;
}

.btn-wrapper {
  margin-top: 30px;
}
</style>