<template>
  <b-container fluid="sm">
    <b-jumbotron header="Email Verification" header-level="5">
      <p>{{ $t("emailVerification") }}</p>
      <router-link :to="{ name: 'sign-in' }">{{ $t("signIn") }}</router-link>
    </b-jumbotron>
  </b-container>
</template>
