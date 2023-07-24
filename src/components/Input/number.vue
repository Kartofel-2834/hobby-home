<template>
  <div class="input-inner input-inner_number">
    <Button
      v-if="controls"
      :disabled="checkMin()"
      class="input-inner__increment-button"
      @click="down"
    >
      -
    </Button>

    <input
      :value="numberValue"
      :placeholder="placeholder"
      type="text"
      class="input"
      @input="inputListener"
      @keydown="keydownListener"
      @keyup="keyupListener"
    />

    <Button
      v-if="controls"
      :disabled="checkMax()"
      class="input-inner__increment-button"
      @click="up"
    >
      +
    </Button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onMounted } from "vue";

// Components
import Button from "../Button";

const props = defineProps({
  value: { type: String, required: true },
  placeholder: { type: String, default: "" },
  controls: { type: Boolean, default: false },
  fraction: { type: Boolean, default: false },
  min: { type: Number, required: false },
  max: { type: Number, required: false },
});

const emit = defineEmits(["change"]);

const allowedButtons = new Set(["Backspace", "ArrowLeft", "ArrowRight"]);
const allowedCombos = new Set(["x", "v", "z", "a", "c"]);
const pressedButtons = new Set();

const number = ref(props.min);

const numberValue = computed(() => {
  const newNumberValue = Number(props.value);

  if (
    isNaN(newNumberValue) ||
    checkMin(newNumberValue) ||
    checkMax(newNumberValue)
  ) {
    emit("change", `${props.min}`);
    number.value = props.min;
    return props.min;
  } else {
    number.value = newNumberValue;
    return newNumberValue;
  }
});

function checkMin(value) {
  const checkValue = typeof value === "number" ? value : number.value;
  return typeof props.min === "number" && checkValue <= props.min;
}

function checkMax(value) {
  const checkValue = typeof value === "number" ? value : number.value;
  return typeof props.max === "number" && checkValue >= props.max;
}

function inputListener(event) {
  const { value } = event.target;
  emit("change", `${Number(value)}`);
}

function keydownListener(event) {
  const { key, ctrlKey: ctrlPressed } = event;
  pressedButtons.add(key);

  if (
    allowedButtons.has(key) ||
    /[0-9]/.test(key) ||
    (ctrlPressed && allowedCombos.has(key))
  ) {
    return;
  }

  switch (key) {
    case "-":
      number.value *= -1;
      update(number.value);
      break;
    case "ArrowUp":
      up();
      break;
    case "ArrowDown":
      down();
      break;
  }

  event.preventDefault();
}

function keyupListener(event) {
  const { key } = event;
  pressedButtons.delete(key);
}

function up() {
  if (checkMax()) return;
  update(++number.value);
}

function down() {
  if (checkMin()) return;
  update(--number.value);
}

function update(newValue) {
  emit("change", `${newValue}`);
}

onMounted(() => {
  if (props.fraction) allowedButtons.add(".");
});
</script>

<style>
.input-inner_number {
  display: flex;
}

.input-inner_number > input {
  width: 100%;
}
</style>
