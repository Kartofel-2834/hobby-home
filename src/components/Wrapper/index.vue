<template>
  <div class="wrapper">
    <Sidebar />

    <div class="wrapper__content"><slot /></div>
  </div>
</template>

<script setup>
// Components
import Sidebar from "@/components/Sidebar";
</script>

<style src="@/assets/css/components/wrapper.css" />
