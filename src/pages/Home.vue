<template>
  <b-container fluid="sm">
    <b-jumbotron :header="$t('vManage')" header-level="3">
      <p>{{ $t("welcome.greeting") }}</p>
      <p>{{ $t("welcome.offer") }}</p>
      <router-link :to="{ name: 'timer' }">{{ $t("timer") }}</router-link>
    </b-jumbotron>
  </b-container>
</template>
