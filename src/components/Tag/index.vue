<template>
  <div class="tag" :class="{ tag_disabled: disabled, tag_light: light }">
    <span><slot /></span>
    <Avatar v-if="src" :src="src" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Components
import Avatar from "../Avatar";

const props = defineProps({
  disabled: { type: Boolean, default: false },
  light: { type: Boolean, default: false },
  src: { type: String, default: "" },
});
</script>

<style src="@/assets/css/components/tag.css" />
