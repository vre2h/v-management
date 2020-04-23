<template>
  <b-container>
    <b-row sm="4" class="d-flex justify-content-center mb-3">
      <b-col sm="6">
        <label for="input-default">Goal:</label>
        <b-form-input
          :disabled="timerProcess === 'settled'"
          v-model="timer.title"
          id="input-default"
          placeholder="Put your goal here..."
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="d-flex justify-content-center mb-3">
      <b-col sm="6">
        <label for="textarea-default">Description:</label>
        <b-form-textarea
          v-model="timer.description"
          :disabled="timerProcess === 'settled'"
          id="textarea-default"
          placeholder="Description"
        ></b-form-textarea>
      </b-col>
    </b-row>
    <b-row class="d-flex justify-content-center">
      <b-col sm="6">
        <b-input-group prepend="Timer" class="mb-3">
          <b-form-input
            type="number"
            aria-label="Minutes"
            :disabled="timerProcess === 'settled'"
            v-model="timer.minutes"
          ></b-form-input>
          <b-form-input
            type="number"
            aria-label="Seconds"
            :disabled="timerProcess === 'settled'"
            v-model="timer.seconds"
          ></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="d-flex justify-content-center">
      <b-button-group class="btn-wrapper">
        <b-button
          variant="outline-primary"
          :disabled="timerProcess === 'settled' || activeTime === 0"
          @click="startTimer"
        >Start</b-button>
        <b-button
          variant="outline-primary"
          @click="resetTimer"
          :disabled="timerProcess === 'unset'"
        >Reset</b-button>
      </b-button-group>
    </b-row>
  </b-container>
</template>

<script>
import { beep } from "../utils";

export default {
  props: {
    onFinish: {
      type: Function,
      required: true
    },
    onStart: {
      type: Function,
      required: true
    },
    onReset: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      timerProcess: "unset",
      timer: this.createTimerValues(),
      timeoutId: null
    };
  },
  methods: {
    cleanTimer() {
      clearTimeout(this.timeoutId);
      this.timerProcess = "unset";
      this.timer = this.createTimerValues();
    },
    startTimer() {
      this.timerProcess = "settled";
      this.timeoutId = setInterval(() => {
        const restTime = this.activeTime - 1;
        const minutes = Math.floor(restTime / 60);
        const seconds = restTime % 60;

        if (restTime < 0) {
          this.cleanTimer();
          this.onFinish(this.timeoutId);
        } else if (restTime === 0) {
          beep();
          this.onFinish(this.timeoutId);
          this.cleanTimer();
        } else {
          this.timer.minutes = minutes;
          this.timer.seconds = seconds;
        }
      }, 1000);

      this.onStart({
        id: this.timeoutId,
        minutes: this.timer.minutes,
        seconds: this.timer.seconds,
        title: this.timer.title,
        description: this.timer.description
      });
    },
    resetTimer() {
      this.onReset(this.timeoutId, this.activeTime);
      this.cleanTimer();
    },
    createTimerValues() {
      return {
        minutes: "30",
        seconds: "00",
        title: "",
        description: ""
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