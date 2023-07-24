<template>
  <button
    class="button"
    :class="{
      button_reverse: reverse,
      button_icon: icon,
      button_rounded: rounded,
    }"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  reverse: { type: Boolean, default: false },
  icon: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
});
</script>

<style src="@/assets/css/components/button.css" />
