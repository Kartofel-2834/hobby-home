<template>
  <div class="wrapper__slot">
    <Form v-if="userInfo && userInfo?.id" class="user">
      <div class="user__info_a">
        <Avatar :src="userInfo.avatar" :online="userInfo.online" />
      </div>

      <div class="user__info_b">
        <div class="user__text-fields">
          <h2>{{ userInfo.name }} {{ userInfo.surname }}</h2>
          <span class="user__text-fields__slug">{{ userInfo.slug }}</span>
          <pre class="user__description">{{ userInfo.description }}</pre>
        </div>

        <div class="user__controls">
          <RouterLink v-if="userInfo.clubId" :to="`/club/${userInfo.clubId}`">
            <Tag :src="club.avatar" class="user__club">
              {{ club.name }}
            </Tag>
          </RouterLink>
          <Tag v-else disabled>Без клуба</Tag>
        </div>
      </div>
    </Form>

    <Sorry v-else>
      <template #message>Студент не найден</template>
    </Sorry>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

// Constants
import { users, clubs } from "@/utils/constants.js";

// Components
import Form from "@/components/Form";
import Avatar from "@/components/Avatar";
import Tag from "@/components/Tag";
import Sorry from "@/components/Sorry";

const route = useRoute();
const userInfo = ref(users.find((user) => user.id == route.params.id));
const club = ref(clubs.find((club) => club.id === userInfo.value.clubId));
</script>

<style src="@/assets/css/pages/profile/index.css" />
