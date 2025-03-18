<script setup lang="ts">
import Sidebar from '../layouts/Sidebar.vue';
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Map Content -->
    <div class="flex-1 p-6">
      <h2 class="text-2xl font-bold">Welcome to the Admin Maps</h2>
      <p class="mt-4">Here you can manage your application data.</p>
    </div>
  </div>
</template>
