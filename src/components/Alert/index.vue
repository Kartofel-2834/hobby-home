<template>
  <div class="alert">
    <Form
      v-for="(message, index) in messages"
      :key="message.id"
      :class="{
        alert__message_error: message.error,
        alert__message_hidden: hideList.includes(message.id),
      }"
      :style="{
        'z-index': 100 - priority(index) * 10,
        transform: `translateY(-${priority(index) * 50}px)`,
        opacity: index === messages.length - 1 ? 1 : 0.9,
      }"
      class="alert__message"
      @click="() => drop(message.id)"
    >
      <div class="alert__message__icon">
        <Icon
          :icon="
            message.error
              ? 'jam:triangle-danger-f'
              : 'icon-park-solid:check-one'
          "
        />
      </div>

      <div class="alert__message__content">
        <h3>{{ message.title }}</h3>
        <p v-if="message.text">{{ message.text }}</p>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";

// Components
import { Icon } from "@iconify/vue";
import Form from "@/components/Form";

// Utils
import sleep from "@/utils/sleep.js";

/* Message:
    { id: Number, title: String, text: String, error: Boolean }
*/
const hideList = ref([]);

const props = defineProps({
  messages: {
    type: Array,
    default: [],
  },

  dropList: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["drop"]);

function priority(index) {
  return props.messages.length - index - 1;
}

async function drop(messageId) {
  const index = hideList.length;
  hideList.value.push(messageId);
  await sleep(500);
  hideList.value.splice(index, 1);
  emit("drop", messageId);
}

watch(
  () => props.dropList,
  async (newDropList) => {
    for (const messageId of props.dropList) {
      await drop(messageId);
    }
  }
);
</script>

<style src="@/assets/css/components/alert.css" />
