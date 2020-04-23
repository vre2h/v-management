<template>
  <b-container fluid="sm" class="d-flex justify-content-center">
    <b-col cols="8">
      <b-card class="w-100" bg-variant="light">
        <b-form @submit.prevent>
          <b-form-group
            label="Sign In:"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group label-cols-sm="12" label="Email:" label-align-sm="left" label-for="email">
              <b-form-input v-model.trim="email" id="email"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="12"
              label="Password:"
              label-align-sm="left"
              label-for="password"
            >
              <b-input
                v-model.trim="password"
                type="password"
                id="password"
                aria-describedby="password-help-block"
              ></b-input>
            </b-form-group>
          </b-form-group>
          <b-button
            class="mt-3 w-100"
            @click="signIn"
            type="submit"
            variant="outline-primary"
          >Sign In</b-button>
        </b-form>
        <div class="d-flex justify-content-center mt-3">
          <p class="mr-1">Don't have an account?</p>
          <router-link to="/sign-up">Sign Up</router-link>
        </div>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
import { signIn } from "@/services/authentication";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      signIn({ email: this.email, password: this.password })
        .then(console.log)
        .catch(console.warn);
    }
  }
};
</script>

<style></style>
