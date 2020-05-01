<template>
  <b-container fluid="sm" class="d-flex justify-content-center">
    <b-col md="8" cols="12">
      <b-card class="w-100" bg-variant="light">
        <b-form @submit.prevent>
          <b-form-group
            :label="$t('signIn')"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
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
            class="mt-3 w-100"
            @click="signIn"
            type="submit"
            variant="outline-primary"
            >{{ $t('signIn') }}</b-button
          >
        </b-form>
        <div class="d-flex justify-content-center mt-3">
          <p class="mr-1">{{ $t('hasAccount.no') }}?</p>
          <router-link to="/sign-up">{{ $t('signUp') }}</router-link>
        </div>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: { email: '', password: '' },
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch('user/signIn', this.user).then(() => {
        this.$router.push({
          name: 'home',
        });
      });
    },
  },
};
</script>

<style></style>
