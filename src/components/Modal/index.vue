<template>
  <div
    class="modal"
    :class="{ modal_showed: showed, modal_hidden: hidden }"
    @mousedown="() => emit('close')"
    @touchstart="() => emit('close')"
  >
    <Form class="modal__content" @mousedown.stop @touchstart.stop>
      <slot />
    </Form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watchEffect } from "vue";

// Components
import Form from "@/components/Form";

// Utils
import sleep from "@/utils/sleep.js";

const props = defineProps({
  opened: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

const hidden = ref(true);
const showed = ref(false);

async function open() {
  hidden.value = false;
  await sleep(100);
  showed.value = true;
}

async function close() {
  showed.value = false;
  await sleep(400);
  hidden.value = true;
}

watchEffect(() => {
  if (props.opened) {
    open();
  } else {
    close();
  }
});
</script>

<style src="@/assets/css/components/modal.css" />
