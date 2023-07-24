<template>
  <div class="auth">
    <Form class="auth__form">
      <AuthSlider />

      <div class="auth__form__fields">
        <h2>Вход</h2>

        <Field :value="name" @change="(v) => (name = v)"> Имя </Field>
        <Field :value="name" @change="(v) => (surname = v)"> Фамилия </Field>
        <Field
          type="number"
          :value="studentBook"
          @change="(v) => (studentBook = v)"
        >
          Номер зачетки
        </Field>

        <Button @click="submit">Войти</Button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Sections
import AuthSlider from "@/sections/auth/slider.vue";

// Components
import Button from "@/components/Button";
import Form from "@/components/Form/index.vue";
import Field from "@/components/Form/field.vue";

// Utils
import Alerter from "@/utils/alerter";

const alerter = new Alerter();

const name = ref("");
const surname = ref("");
const studentBook = ref("0");

function submit() {
  if (
    !name.value.length ||
    !surname.value.length ||
    !studentBook.value.length
  ) {
    alerter.error("Все поля должны быть заполнены!");
  } else {
    alerter.message("Авторизация прошла успешно");
  }
}
</script>

<style src="@/assets/css/pages/auth/index.css" />
