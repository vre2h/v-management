<template>
  <b-container fluid="sm">
    <b-jumbotron header="v-Manage" header-level="3">
      <p>Hey, welcome to v-Manage application.</p>
      <p>We can offer you to use our timer:</p>
      <router-link :to="{ name: 'timer' }">Timer</router-link>
    </b-jumbotron>
  </b-container>
</template>
