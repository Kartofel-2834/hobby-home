<template>
  <Modal :opened="opened" class="rightbar" @close="() => emit('close')">
    <Button icon rounded class="rightbar__closer" @click="() => emit('close')">
      <Icon icon="fa6-solid:arrow-left" />
    </Button>
    <slot />
  </Modal>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Components
import { Icon } from "@iconify/vue";
import Modal from "../Modal";
import Button from "../Button";

const props = defineProps({
  opened: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);
</script>

<style src="@/assets/css/components/rightbar.css" />
