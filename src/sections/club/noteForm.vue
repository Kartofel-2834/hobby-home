<template>
  <Rightbar :opened="opened" class="note-form" @close="() => emit('close')">
    <div class="note-form__info">
      <Input
        :value="title"
        class="note-form__title"
        placeholder="Заголовок"
        @change="(v) => (title = v)"
      />
      <textarea
        :value="text"
        class="note-form__text"
        placeholder="Текст"
        @input="(event) => (text = event.target.value)"
      />
    </div>

    <Slider
      :items="images"
      :length="1"
      :slide="slide"
      class="note-form__slider"
      @slide="(v) => (slide = v)"
    >
      <template #item="{ item, index }">
        <div v-if="item" class="note-form__slider__slide">
          <div class="image">
            <img :src="item" />
          </div>
          <Button icon rounded reverse @click="() => removeImage(index)">
            <Icon icon="fluent:delete-12-filled" />
          </Button>
        </div>
      </template>
    </Slider>

    <label for="imageAdd" class="note-form__add-slide">
      <span class="button button_reverse">Добавить изображение</span>
      <input id="imageAdd" type="file" @input="addImage" />
    </label>

    <Button>Создать запись</Button>
  </Rightbar>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

// Components
import { Icon } from "@iconify/vue";
import Rightbar from "@/components/Rightbar";
import Slider from "@/components/Slider";
import Input from "@/components/Input";
import Button from "@/components/Button";

// Utils
import Alerter from "@/utils/alerter";
import sleep from "@/utils/sleep";

const props = defineProps({
  opened: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);
const alerter = new Alerter();
const slide = ref(0);

const images = ref([null]);
const filesBuffer = ref([]);

const title = ref("");
const text = ref("");

function addImage(event) {
  const { target } = event;
  const { files } = target;

  if (!FileReader || !files) {
    alerter.error("Загрузка изображения не поддерживается вашим браузером");
  }

  if (!files.length) return;

  const reader = new FileReader();

  reader.onload = async function () {
    if (images.value[0] === null) {
      images.value.splice(0, 1);
    }

    images.value.push(reader.result);
    filesBuffer.value.push(files[0]);
    await sleep(300);
    slide.value = Number(slide.value === 0);
  };

  reader.readAsDataURL(files[0]);
}

function removeImage(index) {
  images.value.splice(index, 1);
  filesBuffer.value.splice(index, 1);

  if (images.value.length === 0) {
    images.value.push(null);
  }
}
</script>

<style src="@/assets/css/sections/club/noteForm.css" />
