<template>
  <div class="sidebar">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      class="sidebar__link"
      :class="{ sidebar__link_active: route.fullPath === link.href }"
      :to="link.href"
    >
      <Icon :icon="link.icon" />
      <span>{{ link.text }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

// Components
import { Icon } from "@iconify/vue";

const route = useRoute();

const links = ref([
  { text: "Клубы", href: "/clubs", icon: "material-symbols:swords" },
  {
    text: "Мой клуб",
    href: "/",
    icon: "solar:shield-minimalistic-bold-duotone",
  },
  { text: "Профиль", href: "/profile", icon: "mingcute:user-3-fill" },
  { text: "Наши задачи", href: "/tasks", icon: "solar:sledgehammer-bold" },
  { text: "Открытые задачи", href: "/work", icon: "material-symbols:work" },
  { text: "Чат", href: "/chat", icon: "majesticons:chat" },
]);
</script>

<style src="@/assets/css/components/sidebar.css" />
