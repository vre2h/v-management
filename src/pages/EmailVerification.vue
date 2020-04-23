<template>
  <b-container fluid="sm">
    <b-jumbotron header="Email Verification" header-level="5">
      <p>Please, check your inbox for verification email.</p>
      <router-link :to="{ name: 'sign-in' }">Log In</router-link>
    </b-jumbotron>
  </b-container>
</template>
