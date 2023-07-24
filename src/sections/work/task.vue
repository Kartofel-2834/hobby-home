<template>
  <Slider
    v-if="Array.isArray(images) && images.length"
    :items="images"
    :length="1"
    :slide="slide"
    @slide="(v) => (slide = v)"
  >
    <template #item="{ item }">
      <div class="image">
        <img :src="item" />
      </div>
    </template>
  </Slider>

  <h2><slot name="title" /></h2>
  <div class="work-task__short-info">
    <Tag disabled class="work-task__tag">
      {{ tags.map((tag) => `#${tag}`).join(" ") }}
    </Tag>
    <Tag disabled class="work-task__tag">
      <slot name="date" />
    </Tag>
  </div>

  <pre v-if="slots?.description"><slot name="description" /></pre>

  <div class="work-task__controls">
    <Button @click="() => emit('respond')">Откликнуться</Button>
    <Button v-if="!slots?.description" reverse @click="() => emit('detail')">
      Подробнее
    </Button>
  </div>
</template>

<script setup>
import { ref, useSlots, defineProps, defineEmits } from "vue";

// Components
import Slider from "@/components/Slider";
import Button from "@/components/Button";
import Tag from "@/components/Tag";

const props = defineProps({
  images: { type: Array, default: [] },
  tags: { type: Array, default: [] },
});
const emit = defineEmits(["respond", "detail"]);
const slots = useSlots();

const slide = ref(0);
</script>

<style src="@/assets/css/sections/work/task.css" />
