<template>
  <Form class="club__note">
    <h2>
      <slot name="title" />
    </h2>

    <pre>
      <slot name="description" />
    </pre>

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

    <div class="club__note__footer">
      <Tag :src="author.avatar">{{ author.name }}</Tag>
      <Tag disabled><slot name="date" /></Tag>
    </div>
  </Form>
</template>

<script setup>
import { ref, defineProps } from "vue";

// Components
import Form from "@/components/Form";
import Slider from "@/components/Slider";
import Tag from "@/components/Tag";

const props = defineProps({
  images: { type: Array, required: [] },
  author: { type: Object, required: true },
});

const slide = ref(0);
</script>

<style src="@/assets/css/sections/club/note.css" />
