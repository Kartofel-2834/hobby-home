<template>
  <div class="sorry">
    <div class="sorry__message">
      <span class="sorry__message__smile"> ¯\_(ツ)_/¯</span>
      <slot name="message" />
    </div>

    <slot name="after" />
  </div>
</template>

<style src="@/assets/css/components/sorry.css" />
