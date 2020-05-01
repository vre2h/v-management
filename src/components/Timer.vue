<template>
  <b-container>
    <b-row sm="4" class="d-flex justify-content-center mb-3">
      <b-col sm="6">
        <label for="input-default">{{ $t('timer.task.label') }}:</label>
        <b-form-input
          :disabled="disableData"
          v-model="timer.title"
          id="input-default"
          :placeholder="$t('timer.task.placeholder')"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="d-flex justify-content-center mb-3">
      <b-col sm="6">
        <label for="textarea-default"
          >{{ $t('timer.description.label') }}:</label
        >
        <b-form-textarea
          v-model="timer.description"
          :disabled="disableData"
          id="textarea-default"
          :placeholder="$t('timer.description.placeholder')"
        ></b-form-textarea>
      </b-col>
    </b-row>
    <b-row class="d-flex justify-content-center">
      <b-col sm="6">
        <b-input-group :prepend="$t('timer.inputLabel')" class="mb-3">
          <b-form-input
            type="number"
            aria-label="Minutes"
            :disabled="disableData"
            v-model="timer.minutes"
          ></b-form-input>
          <b-form-input
            type="number"
            aria-label="Seconds"
            :disabled="disableData"
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
          >{{ $t('timer.start') }}</b-button
        >
        <b-button
          v-if="timerProcess === 'settled'"
          variant="outline-primary"
          :disabled="timerProcess === 'paused' || activeTime === 0"
          @click="pauseTimer"
          >{{ $t('timer.stop') }}</b-button
        >
        <b-button
          v-if="timerProcess === 'paused'"
          variant="outline-primary"
          @click="unPauseTimer"
          >{{ $t('timer.resume') }}</b-button
        >
        <b-button
          variant="outline-primary"
          @click="stopAndSaveTimer"
          :disabled="timerProcess === 'unset'"
          >{{ $t('timer.stopAndSave') }}</b-button
        >
        <b-button
          variant="outline-primary"
          @click="resetTimer"
          :disabled="timerProcess === 'unset'"
          >{{ $t('timer.reset') }}</b-button
        >
      </b-button-group>
    </b-row>
  </b-container>
</template>

<script>
import { beep } from '../utils';

export default {
  props: {
    onFinish: {
      type: Function,
      required: true,
    },
    onStopAndSave: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      timerProcess: 'unset',
      timer: this.createTimerValues(),
      timeoutId: null,
      completedTime: 0,
    };
  },
  methods: {
    cleanTimer() {
      clearTimeout(this.timeoutId);
      this.timerProcess = 'unset';
      this.timer = this.createTimerValues();
    },
    startTimer() {
      this.timerProcess = 'settled';
      this.timeoutId = setInterval(() => {
        if (this.timerProcess === 'paused') return;

        const restTime = this.activeTime - 1;
        this.completedTime += 1;
        const minutes = Math.floor(restTime / 60);
        const seconds = restTime % 60;

        if (restTime < 0) {
          this.cleanTimer();
          this.onFinish(this.timeoutId);
        } else if (restTime === 0) {
          beep();
          this.onFinish({
            id: this.timeoutId,
            minutes: this.timer.minutes,
            seconds: this.timer.seconds,
            title: this.timer.title,
            description: this.timer.description,
          });
          this.cleanTimer();
        } else {
          this.timer.minutes = minutes;
          this.timer.seconds = seconds;
        }
      }, 1000);
    },
    resetTimer() {
      this.cleanTimer();
    },
    stopAndSaveTimer() {
      const startedTimer = this.activeTime + this.completedTime;
      const minutes = Math.floor(startedTimer / 60);
      const seconds = startedTimer % 60;
      this.onStopAndSave(
        {
          id: this.timeoutId,
          minutes,
          seconds,
          title: this.timer.title,
          description: this.timer.description,
        },
        this.completedTime,
      );
      this.cleanTimer();
    },
    pauseTimer() {
      this.timerProcess = 'paused';
    },
    unPauseTimer() {
      this.timerProcess = 'settled';
    },
    createTimerValues() {
      return {
        minutes: '30',
        seconds: '00',
        title: '',
        description: '',
      };
    },
  },
  computed: {
    activeTime() {
      return Number(this.timer.minutes) * 60 + Number(this.timer.seconds);
    },
    disableData() {
      return this.timerProcess === 'paused' || this.timerProcess === 'settled';
    },
  },
};
</script>
