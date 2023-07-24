<template>
  <div class="avatar" :class="{ avatar_online: online }">
    <div class="image">
      <img :src="src" />
    </div>
    <label v-if="edit" class="avatar__editor">
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        @input="imageChangeListener"
      />
      <Icon icon="material-symbols:edit" />
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Components
import { Icon } from "@iconify/vue";

// Utils
import Alerter from "@/utils/alerter";

const props = defineProps({
  src: { type: String, default: "" },
  edit: { type: Boolean, default: false },
  online: { type: Boolean, default: false },
});

const emit = defineEmits(["change"]);
const alerter = new Alerter();

function imageChangeListener(event) {
  const { target } = event;
  const { files } = target;

  if (!FileReader || !files) {
    alerter.error("Загрузка изображения не поддерживается вашим браузером");
  }

  if (!files.length) return;

  const reader = new FileReader();

  reader.onload = function () {
    emit("change", files[0], reader.result);
  };

  reader.readAsDataURL(files[0]);
}
</script>

<style src="@/assets/css/components/avatar.css" />
