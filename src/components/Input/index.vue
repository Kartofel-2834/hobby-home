<template>
  <TextInput
    v-if="type === 'text'"
    :value="value"
    @change="(v) => emit('change', v)"
  />

  <NumberInput
    v-else-if="type === 'number'"
    :value="value"
    :min="min"
    :max="max"
    :controls="controls"
    @change="(v) => emit('change', v)"
  />

  <PhoneInput
    v-else-if="type === 'phone'"
    :value="value"
    @change="(v) => emit('change', v)"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Components
import TextInput from "./text.vue";
import PhoneInput from "./phone.vue";
import NumberInput from "./number.vue";

const props = defineProps({
  value: { type: String, required: true },
  controls: { type: Boolean, default: false },
  type: { type: String, default: "text" },
  min: { type: Number, required: false },
  max: { type: Number, required: false },
});

const emit = defineEmits(["change"]);
</script>

<style src="@/assets/css/components/input.css" />
