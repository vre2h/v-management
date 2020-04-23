<template>
  <b-container fluid="sm">
    <b-jumbotron
      v-if="verificationProcess === 'info'"
      header="Email Verification"
    >
      <p>Please, check your inbox for verification email.</p>
      <router-link :to="{ name: 'sign-in' }">Log In</router-link>
    </b-jumbotron>
    <b-jumbotron
      v-if="verificationProcess === 'verification'"
      header="Email Verification"
    >
      <p>You've successfully verified your email.</p>
      <router-link :to="{ name: 'sign-in' }">Log In</router-link> to continue
    </b-jumbotron>
  </b-container>
</template>

<script>
import store from "@/store/store";

export default {
  beforeRouteEnter(to, _from, next) {
    if (!to.query.email) {
      next();
    } else {
      store.dispatch("user/verifyEmail", to.query.email).then(() => {
        next();
      });
    }
  },
  computed: {
    verificationProcess() {
      if (!this.$route.query.email) {
        return "info";
      }

      return "verification";
    },
  },
};
</script>
