<script setup lang="ts">
import Sidebar from '../layouts/Sidebar.vue';
import MapView from '../components/MapView.vue';
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Full-page Map -->
    <div class="flex-1">
      <MapView />
    </div>
  </div>
</template>
