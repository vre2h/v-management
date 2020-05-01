<template>
  <div>
    <div>
      <b-navbar toggleable="md" type="light" variant="light">
        <b-navbar-brand to="/">{{ $t('vManage') }}</b-navbar-brand>
        <template v-if="isLoggedIn">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="timer">{{ $t('menu.timer') }}</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown class="mr-4" right>
                <template v-slot:button-content>{{
                  userProfile.name
                }}</template>
                <b-dropdown-item @click="signOut">{{
                  $t('signOut')
                }}</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </template>
        <template v-if="!isLoggedIn">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-navbar-nav>
                <b-nav-item to="/sign-in">{{ $t('signIn') }}</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav class="mr-4">
                <b-nav-item to="/sign-up">{{ $t('signUp') }}</b-nav-item>
              </b-navbar-nav>
            </b-navbar-nav>
          </b-collapse>
        </template>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    signOut() {
      this.$store.dispatch('user/signOut').then(() => {
        this.$router.push(this.routeToSignIn);
      });
    },
  },
  computed: {
    ...mapState('user', ['userProfile', 'currentUser']),
    isLoggedIn() {
      return !!this.currentUser;
    },
    routeToSignIn() {
      const name = this.$root.ROUTES.signIn;
      return { name };
    },
  },
};
</script>
