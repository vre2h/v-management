<template>
  <b-container fluid="sm" class="d-flex justify-content-center">
    <b-col md="8" cols="12">
      <b-card class="w-100" bg-variant="light">
        <b-form @submit.prevent>
          <b-form-group
            :label="$t('signUp') + ':'"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="12"
              :label="$t('name') + ':'"
              label-align-sm="left"
              label-for="name"
            >
              <b-form-input v-model.trim="user.name" id="name"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="12"
              :label="$t('email') + ':'"
              label-align-sm="left"
              label-for="email"
            >
              <b-form-input v-model.trim="user.email" id="email"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="12"
              :label="$t('password') + ':'"
              label-align-sm="left"
              label-for="password"
            >
              <b-input
                v-model.trim="user.password"
                type="password"
                id="password"
                aria-describedby="password-help-block"
              ></b-input>
            </b-form-group>
          </b-form-group>
          <b-button
            @click="signUp"
            type="submit"
            variant="outline-primary"
            class="mt-3 w-100"
            >{{ $t('signUp') }}</b-button
          >
        </b-form>
        <div class="d-flex justify-content-center mt-3">
          <p class="mr-1">{{ $t('hasAccount.yes') }}?</p>
          <router-link to="/sign-in">{{ $t('signIn') }}</router-link>
        </div>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: { email: '', password: '', name: '' },
    };
  },
  methods: {
    signUp() {
      this.$store.dispatch('user/signUp', this.user).then(() => {
        this.$router.push('email-verification');
      });
    },
  },
  computed: {
    routeToEmail() {
      return this.$root.ROUTES.signIn.name;
    },
  },
};
</script>

<style></style>
