<template>
  <div class="auth__form__slider">
    <Slider
      :items="slides"
      :length="1"
      :slide="slide"
      @slide="(v) => (slide = v)"
    >
      <template #item="{ item }">
        <div class="auth__form__slider__slide">
          <div class="image">
            <img :src="item.src" />
          </div>

          <h2>{{ item.text }}</h2>
        </div>
      </template>
    </Slider>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Components
import Slider from "@/components/Slider";

const slide = ref(0);
const slides = ref([
  {
    src: "/team-work-1.png",
    text: "Давайте построим эффективную команду вместе!",
  },
  {
    src: "/team-work-2.png",
    text: "Все таки одна голова хорошо, а две — лучше!",
  },
  { src: "/team-work-3.png", text: "И прочая мотивационная залупень" },
]);
</script>

<style src="@/assets/css/sections/auth/slider.css" />
