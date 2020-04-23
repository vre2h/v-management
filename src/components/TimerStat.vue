<template>
  <b-list-group-item :variant="listItemVariant" class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ title }}</h5>
      <small>{{ status }}</small>
    </div>
    <p class="mb-1">{{timer.description}}</p>
    <small>{{time}}</small>
  </b-list-group-item>
</template>

<script>
export default {
  props: {
    timer: {
      type: Object,
      required: true
    },
    index: { type: Number, required: true }
  },
  computed: {
    listItemVariant() {
      if (this.timer.status === "finished") {
        return "success";
      }

      return "light";
    },
    title() {
      return this.timer.title
        ? `#${this.index + 1}: ${this.timer.title}`
        : `#${this.index + 1}`;
    },
    status() {
      if (this.timer.status === "finished") {
        return "Success";
      }

      return "Almost done";
    },
    time() {
      if (this.timer.status === "finished") {
        return `${this.timer.minutes}:${this.timer.seconds}`;
      }
      if (this.timer.status === "started") {
        return "In progress";
      }

      return `${this.getNormalizedTime(
        this.timer.completedMinutes
      )}:${this.getNormalizedTime(this.timer.completedSeconds)}`;
    }
  },
  methods: {
    getNormalizedTime(time) {
      return `${String(time).length === 1 ? "0" : ""}${time}`;
    }
  }
};
</script>