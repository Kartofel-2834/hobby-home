<template>
  <Sorry v-if="(!clubInfo || !clubInfo?.id) && !route.params?.id">
    <template #message>
      <span> Похоже вы еще не вступили в клуб,</span>
      <span> давайте это исправим! </span>
    </template>

    <template #after>
      <Button>Вступить в клуб</Button>
    </template>
  </Sorry>

  <Sorry v-else-if="!clubInfo || !clubInfo?.id">
    <template #message> Клуб не найден </template>
  </Sorry>

  <div v-else class="wrapper__slot club">
    <Info
      :avatar="clubInfo.avatar"
      :leader="clubInfo.leader"
      @edit="openEditForm"
      @note="openNoteForm"
      @members-click="openMembersModal"
    >
      <template #name>{{ clubInfo.name }}</template>
      <template #description>{{ clubInfo.description }}</template>
      <template #members>{{ clubInfo.members }}</template>
    </Info>

    <Note v-for="note in news" :author="clubInfo" :images="note.images">
      <template #title>{{ note.title }}</template>
      <template #description>{{ note.description }}</template>
      <template #date>{{ parseDate(note.createdAt) }}</template>
    </Note>
  </div>

  <ClubForm :opened="formOpened" @close="closeEditForm" />
  
  <NoteForm :opened="noteFormOpened" @close="closeNoteForm" />

  <Modal
    :opened="membersModalOpened"
    class="club__modal"
    @close="closeMembersModal"
  >
    <Members :members="members" />
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

// Constants
import { club, clubs, news, members } from "@/utils/constants.js";

// Sections
import Info from "@/sections/club/info.vue";
import Members from "@/sections/club/members.vue";
import Note from "@/sections/club/note.vue";
import ClubForm from "@/sections/club/form.vue";
import NoteForm from "@/sections/club/noteForm.vue";

// Components
import Modal from "@/components/Modal";
import Sorry from "@/components/Sorry";
import Button from "@/components/Button";

// Utils
import parseDate from "@/utils/parseDate";

const route = useRoute();
const clubInfo = ref(club);

if (route.params?.id) {
  clubInfo.value = clubs.find((club) => club.id == route.params?.id);
}

console.log(route.params?.id);

const membersModalOpened = ref(false);
const formOpened = ref(false);
const noteFormOpened = ref(false);

function openMembersModal() {
  membersModalOpened.value = true;
}

function closeMembersModal() {
  membersModalOpened.value = false;
}

function openEditForm() {
  formOpened.value = true;
}

function closeEditForm() {
  formOpened.value = false;
}

function openNoteForm() {
  noteFormOpened.value = true;
}

function closeNoteForm() {
  noteFormOpened.value = false;
}
</script>

<style src="@/assets/css/pages/club/index.css" />
