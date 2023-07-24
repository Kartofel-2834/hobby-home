<template>
  <h2>Участники</h2>

  <div class="club__modal__list">
    <RouterLink
      v-for="member in members"
      :key="member.id"
      :to="`/user/${member.id}`"
      class="club__modal__list__member"
    >
      <div class="club__modal__list__member__main">
        <Avatar :src="member.avatar" />
        <div class="club__modal__list__member__info">
          <span class="club__modal__list__member__info__name">
            {{ member.surname }} {{ member.name }}
          </span>
          <span class="club__modal__list__member__info__role">
            {{ member.leader ? "Глава" : "Участник" }}
          </span>
        </div>
      </div>

      <Icon icon="fa6-solid:arrow-right" />
    </RouterLink>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Components
import Avatar from "@/components/Avatar";
import { Icon } from "@iconify/vue";

const props = defineProps({
  members: { type: Array, default: [] },
});
</script>

<style src="@/assets/css/sections/club/members.css" />
