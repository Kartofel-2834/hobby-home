<template>
  <Rightbar :opened="opened" class="club__form" @close="() => emit('close')">
    <Avatar :src="avatar" edit @change="(file, src) => (avatar = src)" />

    <Input :value="name" placeholder="Название" @change="(v) => (name = v)" />
    <textarea
      :value="description"
      placeholder="Описание"
      @change="(event) => (description = event.target.value)"
    />

    <h3>Участники</h3>
    <div class="club__form__member-list">
      <div v-for="member in clubMembers" class="club__form__member">
        <RouterLink :to="`/user/${member.id}`" class="club__form__member__info">
          <Avatar :src="member.avatar" />
          <pre>{{ member.surname }} {{ member.name }}</pre>
        </RouterLink>

        <div class="club__form__member__controls">
          <Button reverse>Выгнать</Button>
          <Button>Повысить</Button>
        </div>
      </div>
    </div>
  </Rightbar>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

// Constants
import { club, members } from "@/utils/constants";

// Components
import Rightbar from "@/components/Rightbar";
import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Button from "@/components/Button";

const emit = defineEmits(["close"]);

const props = defineProps({
  opened: { type: Boolean, default: false },
});

const avatar = ref(club.avatar);
const name = ref(club.name);
const description = ref(club.description);
const clubMembers = ref(members);
</script>

<style src="@/assets/css/sections/club/form.css" />
