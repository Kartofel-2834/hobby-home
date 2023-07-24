<template>
  <Form class="club__info">
    <Avatar :src="avatar" :online="isOnline" />

    <h2><slot name="name" /></h2>

    <pre><slot name="description" /></pre>

    <div class="club__info__controls">
      <Button reverse @click="() => emit('edit')">Редактировать</Button>
      <Button @click="() => emit('note')">Создать запись</Button>
    </div>
  </Form>

  <Form
    class="club__clickable-form club__members"
    @click="() => emit('membersClick')"
  >
    <div class="club__clickable-form__title">
      <Icon icon="fa6-solid:user-group" />
      <span>Участники</span>
    </div>
    <div class="club__members__count"><slot name="members" /></div>
  </Form>

  <RouterLink
    v-if="leader && leader?.id"
    :to="`/user/${leader.id}`"
    class="club__leader"
  >
    <Form class="club__clickable-form">
      <div class="club__clickable-form__title">
        <Icon icon="ph:crown-simple-fill" />
        <span>Глава</span>
      </div>
      <div class="club__leader__info">
        <span>{{ leader.slug }}</span>
        <Avatar :src="leader.avatar" />
      </div>
    </Form>
  </RouterLink>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Components
import Form from "@/components/Form";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { Icon } from "@iconify/vue";

const props = defineProps({
  isOnline: { type: Boolean, default: false },
  avatar: { type: String, default: "" },
  leader: { type: Object, default: "" },
});

const emit = defineEmits(["membersClick", "edit", "note"]);
</script>

<style src="@/assets/css/sections/club/info.css" />
