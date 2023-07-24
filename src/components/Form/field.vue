<template>
  <div class="form__field">
    <p><slot /></p>
    <Input
      :type="type"
      :value="value"
      :controls="controls"
      @change="(v) => emit('change', v)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Components
import Input from "@/components/Input";

const props = defineProps({
  type: { type: String, default: "text" },
  controls: { type: Boolean, default: false },
  value: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});

const emit = defineEmits(["change"]);
</script>

<style src="@/assets/css/components/form.css" />
