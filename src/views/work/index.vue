<template>
  <div class="wrapper__slot">
    <Form v-for="task in tasks" :key="task.id" class="work-task">
      <Task
        :images="task.images"
        :tags="task.tags"
        @respond="() => confirmTaskRespond(task)"
        @detail="() => showDetails(task)"
      >
        <template #title>{{ task.title }}</template>
        <template #date>{{ parseDate(task?.createdAt) }}</template>
      </Task>
    </Form>
  </div>

  <Modal :opened="modal" class="work-task" @close="() => (modal = false)">
    <Task
      :images="target?.images"
      :tags="target?.tags"
      @respond="() => confirmTaskRespond(target)"
    >
      <template #title>{{ target?.title }}</template>
      <template #description>{{ target?.description }}</template>
      <template #date>{{ parseDate(target?.createdAt) }}</template>
    </Task>
  </Modal>

  <Confirmation
    :opened="confirmation"
    @confirm="respondTask"
    @close="() => (confirmation = false)"
  >
    <template #title>
      Вы уверены, что хотите откликнуться на эту задачу?
    </template>
  </Confirmation>
</template>

<script setup>
import { ref } from "vue";

// Constants
import { tasks } from "@/utils/constants";

// Sections
import Task from "@/sections/work/task.vue";

// Components
import Form from "@/components/Form";
import Confirmation from "@/components/Confirmation";
import Modal from "@/components/Modal";

// Utils
import Alerter from "@/utils/alerter";
import parseDate from "@/utils/parseDate";

const alerter = new Alerter();

const modal = ref(false);
const confirmation = ref(false);
const target = ref(null);

function showDetails(task) {
  target.value = task;
  modal.value = true;
}

function confirmTaskRespond(task) {
  confirmation.value = true;
}

function respondTask(task) {
  modal.value = false;
  alerter.message("Ваша заявка отправлена на рассмотрение ВУЗу");
}
</script>

<style src="@/assets/css/pages/work/index.css" />
