<template>
  <b-list-group-item variant="light" class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <div class="d-flex flex-column">
        <h5 class="mb-1">{{ title }}</h5>
      </div>
      <div>
        <b-link @click.prevent="handleDelete">
          <b-icon icon="trash-fill"></b-icon>
        </b-link>
      </div>
    </div>
    <p class="mb-1">{{timer.description}}</p>
    <div class="d-flex justify-content-center align-items-center">
      <small>{{time}}</small>
      <b-badge class="ml-2" :variant="listItemVariant">{{ status }}</b-badge>
      <small class="ml-auto">{{date}}</small>
    </div>
  </b-list-group-item>
</template>

<script>
import { formatDate } from '@/utils/date';

export default {
  props: {
    timer: {
      type: Object,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
    index: { type: Number, required: true },
  },
  computed: {
    listItemVariant() {
      if (this.timer.status === 'finished') {
        return 'success';
      }

      return 'warning';
    },
    title() {
      return this.timer.title
        ? `#${this.index + 1}: ${this.timer.title}`
        : `#${this.index + 1}`;
    },
    status() {
      if (this.timer.status === 'finished') {
        return 'Completed';
      }

      return 'Almost done';
    },
    time() {
      if (this.timer.status === 'finished') {
        return `${this.timer.minutes}:${this.timer.seconds}`;
      }
      if (this.timer.status === 'started') {
        return 'In progress';
      }
      return `${this.getNormalizedTime(
        this.timer.completedMinutes,
      )}:${this.getNormalizedTime(this.timer.completedSeconds)} / ${this.getNormalizedTime(this.timer.minutes)}:${this.getNormalizedTime(this.timer.seconds)}`;
    },
    date() {
      return formatDate(this.timer.date);
    },
  },
  methods: {
    getNormalizedTime(time) {
      return `${String(time).length === 1 ? '0' : ''}${time}`;
    },
    handleDelete() {
      this.onDelete(this.timer.id);
    },
  },
};
</script>
