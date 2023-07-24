<template>
  <Modal :opened="opened" class="confirmation" @close="cancel">
    <h2><slot name="title">Вы уверены?</slot></h2>
    <pre v-if="slots?.description"><slot name="description" /></pre>

    <div class="confirmation__controls">
      <slot name="cancel"><Button reverse @click="cancel">Нет</Button></slot>

      <slot name="confirm"><Button @click="confirm">Да</Button></slot>
    </div>
  </Modal>
</template>

<script setup>
import { defineProps, defineEmits, useSlots } from "vue";

// Components
import Modal from "@/components/Modal";
import Button from "@/components/Button";

const props = defineProps({
  opened: { type: Boolean, default: false },
});
const emit = defineEmits(["confirm", "cancel", "close"]);
const slots = useSlots();

function confirm() {
  emit("confirm");
  emit("close");
}

function cancel() {
  emit("cancel");
  emit("close");
}
</script>

<style src="@/assets/css/components/confirmation.css" />
