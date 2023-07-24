<template>
  <div class="wrapper__slot">
    <Form v-if="userInfo && userInfo?.id" class="user">
      <div class="user__info_a">
        <Avatar
          :src="userInfo.avatar"
          :edit="editMode"
          :online="userInfo.online"
          @change="(file, url) => (userInfo.avatar = url)"
        />
        <RouterLink v-if="userInfo.clubId" :to="`/club/${userInfo.clubId}`">
          <Tag :src="club.avatar" class="user__club">
            {{ club.name }}
          </Tag>
        </RouterLink>
        <Button v-else reverse>Найти клуб</Button>
      </div>

      <div class="user__info_b">
        <div class="user__text-fields">
          <h2>{{ userInfo.name }} {{ userInfo.surname }}</h2>
          <Input
            :value="userInfo.slug"
            :disabled="!editMode"
            placeholder="Тег"
            @change="(v) => (userInfo.slug = v)"
          />

          <textarea
            :value="userInfo.description"
            :disabled="!editMode"
            placeholder="Описание"
            class="user__description"
            @change="(e) => (userInfo.description = e.target.value)"
          />
        </div>

        <div class="user__controls">
          <Button @click="mainButtonClick">
            {{ editMode ? "Сохранить" : "Редактировать" }}
          </Button>
          <Button v-if="editMode" reverse @click="() => (editMode = !editMode)">
            Отменить
          </Button>
        </div>
      </div>
    </Form>

    <Sorry v-else>
      <template #message>Студент не найден</template>
    </Sorry>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

// Constants
import { user, club } from "@/utils/constants.js";

// Components
import Form from "@/components/Form";
import Input from "@/components/Input";
import Avatar from "@/components/Avatar";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import Sorry from "@/components/Sorry";

// Utils
import Alerter from "@/utils/alerter";

const editMode = ref(false);
const userInfo = ref(user);
const alerter = new Alerter();

function mainButtonClick() {
  if (editMode.value) {
    save();
  } else {
    editMode.value = true;
  }
}

function save() {
  if (!userInfo.value.slug || !userInfo.value.description) {
    alerter.error("Поля не могут быть пустыми");
    return;
  }

  editMode.value = false;
  alerter.message("Сохранено");
  console.log(123);
}
</script>

<style src="@/assets/css/pages/profile/index.css" />
