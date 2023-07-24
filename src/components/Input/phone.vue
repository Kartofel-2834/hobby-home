<template>
  <input
    :placeholder="placeholder"
    :value="parsedValue"
    type="tel"
    class="input"
    @input="inputListener"
    @keydown="keydownListener"
  />
</template>

<script setup>
import { defineEmits, defineProps, ref, computed } from "vue";

// Utils
import formatPhone from "@/utils/formatPhone.js";

const props = defineProps({
  value: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});

const emit = defineEmits(["change"]);

const allowedButtons = new Set(["Backspace", "ArrowLeft", "ArrowRight"]);
const allowedCombos = new Set(["x", "v", "z", "a", "c"]);

const parsedValue = computed(() => {
  const digistOnly = props.value.replace(/\D/g, "");

  if (props.value !== digistOnly) {
    emit("change", digistOnly);
  }

  const phone = formatPhone(digistOnly);
  return phone;
});

function inputListener(event) {
  const { value } = event.target;
  emit("change", value.replace(/\D/g, ""));
}

function keydownListener(event) {
  const { key, ctrlKey: ctrlPressed } = event;

  if (allowedButtons.has(key) || (ctrlPressed && allowedCombos.has(key))) {
    return;
  }

  if (props.value.length <= 11 && /[0-9]/.test(key)) return;

  event.preventDefault();
}
</script>
