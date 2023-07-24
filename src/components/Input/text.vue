<template>
  <input
    :placeholder="placeholder"
    :value="value"
    type="text"
    class="input"
    @input="(event) => emit('change', event.target.value)"
  />
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  value: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});

const emit = defineEmits(["change"]);
</script>
