<template>
  <router-view v-if="route.fullPath.includes('login')" />

  <Wrapper v-else>
    <router-view />
  </Wrapper>

  <Alert
    :messages="store.state.messages"
    :drop-list="store.state.messagesDropList"
    @drop="(messageId) => store.commit('dropMessage', messageId)"
  />
</template>

<script setup>
import { useRoute } from "vue-router";

// Store
import { useStore } from "vuex";

// Components
import Wrapper from "@/components/Wrapper";
import Alert from "@/components/Alert";

const store = useStore();
const route = useRoute();
</script>

<style src="@/assets/css/style.css" />
