<script setup lang="ts">
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Reference for the map container
const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    // Initialize the map
    const map = L.map(mapContainer.value).setView([8.228, 124.244], 13); // Iligan City coordinates

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
  }
});
</script>

<template>
  <div ref="mapContainer" class="flex-1"></div>
</template>

<style scoped>
/* Removes unwanted padding/margin */
.flex-1 {
  width: 100%;
  height: 100vh;
  overflow: hidden; /* Ensures no extra spacing */
}
</style>