<template>
  <div v-if="empty" class="link" :class="{ link_active: active }">
    <slot />
  </div>

  <nuxt-link v-else :to="to">
    <div class="link" :class="{ link_active: active }">
      <slot />
    </div>
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  to: { type: String, default: "/" },
  active: { type: Boolean, default: false },
  empty: { type: Boolean, default: false },
});
</script>

<style src="@/assets/css/components/link.css" />
