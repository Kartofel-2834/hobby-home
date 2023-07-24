<template>
  <div class="draggable-list">
    <div
      v-for="(item, index) in items"
      :key="keymap(item, index)"
      :id="index"
      ref="elements"
      class="draggable-list__item"
    >
      <slot name="item" :index="index" :item="item" :start="onStart">
        <div @mousedown="onStart" @touchstart="onStart">
          {{ formatter(item) }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Utils
import sleep from "@/utils/sleep";

const emit = defineEmits(["update"]);

const props = defineProps({
  items: { type: Array, default: [] },
  formatter: { type: Function, default: (item) => item },
  keymap: { type: Function, default: (item) => item },
});

const elements = ref(null);
const dragElement = ref(null);

const start = ref(0);
const translate = ref(0);
const moving = ref(false);
const rerendering = ref(false);

function elementsMiddles() {
  return Array.from(elements.value)
    .filter((el) => !el.classList.contains("draggable-list__item_dragging"))
    .map((el) => {
      const { y } = el.getBoundingClientRect();
      const middle = Math.round(el.clientHeight / 2);

      return { target: el, position: y + middle };
    });
}

function swipeUp(element, offset) {
  element.setAttribute("offset", offset - dragElement.value.offsetHeight);
  element.style.transform = `translateY(${
    offset - dragElement.value.offsetHeight
  }px)`;
}

function swipeDown(element, offset) {
  element.setAttribute("offset", offset + dragElement.value.offsetHeight);
  element.style.transform = `translateY(${
    offset + dragElement.value.offsetHeight
  }px)`;
}

async function swipeBack(element) {
  element.setAttribute("offset", 0);
  element.style.transform = `translateY(0)`;
  moving.value = true;
  await sleep(100);
  moving.value = false;
}

function onStart(event) {
  const element = event
    .composedPath()
    .find((el) => el.id && !isNaN(Number(el.id)));

  if (rerendering.value) return;

  element.classList.add("draggable-list__item_dragging");

  dragElement.value = element;
  start.value = event.y;
}

async function onMove(y) {
  if (rerendering.value || !dragElement.value) return;

  translate.value = y - start.value;
  dragElement.value.style.transform = `translateY(${translate.value}px)`;

  if (moving.value) return;

  const middles = elementsMiddles();
  const position = start.value + translate.value;

  for (const el of middles) {
    const offset = Number(el.target.getAttribute("offset"));

    if (position > el.position) {
      if (offset > 0) {
        await swipeBack(el.target);
      } else if (!offset && start.value < el.position) {
        swipeUp(el.target, offset);
      }
    } else if (position < el.position) {
      if (offset < 0) {
        await swipeBack(el.target);
      } else if (!offset && start.value > el.position) {
        swipeDown(el.target, offset);
      }
    }
  }
}

async function onEnd() {
  if (rerendering.value || !dragElement.value) return;

  const currentIndex = Number(dragElement.value.id);
  let totalOffset = 0;

  const totalPixelOffset = Array.from(elements.value).reduce((res, el) => {
    const pixelOffset = Number(el.getAttribute("offset"));

    if (pixelOffset) {
      const direction = pixelOffset < 0 ? 1 : -1;

      totalOffset += direction;
      return res + el.offsetHeight * direction;
    }

    return res;
  }, 0);

  start.value = totalPixelOffset;
  translate.value = 0;

  dragElement.value.classList.remove("draggable-list__item_dragging");
  dragElement.value.style.transform = `translateY(${totalPixelOffset}px)`;

  let newList = Array.from(props.items);
  const [item] = newList.splice(currentIndex, 1);

  newList = [
    ...newList.slice(0, currentIndex + totalOffset),
    item,
    ...newList.slice(currentIndex + totalOffset),
  ];

  dragElement.value = null;
  rerendering.value = true;
  await sleep(250);

  emit("update", newList);

  for (const el of elements.value) {
    el.classList.add("draggable-list__item_dragging");
    el.style.transform = "translateY(0)";
    el.setAttribute("offset", "0");
    setTimeout(() => el.classList.remove("draggable-list__item_dragging"), 100);
  }

  rerendering.value = false;
}

onMounted(() => {
  window.addEventListener("mousemove", async (event) => onMove(event.y));

  window.addEventListener("mouseup", async () => {
    await onEnd();
  });
});
</script>

<style src="@/assets/css/components/draggable-list.css" />
