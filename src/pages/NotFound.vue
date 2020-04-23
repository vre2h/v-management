<template>
  <b-container fluid="sm">
    <b-jumbotron header="Oops!">
      <p>The page you're looking for is not here.</p>
      <router-link :to="{ name: '/' }">Back to the home page</router-link>
    </b-jumbotron>
  </b-container>
</template>
