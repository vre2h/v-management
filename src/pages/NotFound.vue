<template>
  <b-container fluid="sm">
    <b-jumbotron header="Oops!">
      <p>{{ $t('notFound.mainMessage') }}</p>
      <router-link :to="{ name: '/' }">{{ $t('notFound.backTo') }}</router-link>
    </b-jumbotron>
  </b-container>
</template>
