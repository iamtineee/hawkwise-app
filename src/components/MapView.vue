<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps<{ userCoords: [number, number] | null }>();

// Reference for the map container
const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null; 
let userMarker: L.Marker | null = null;

onMounted(() => {
  if (mapContainer.value) {
    // Initialize the map
    map = L.map(mapContainer.value).setView([8.228, 124.244], 13); // Iligan City coordinates

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
  }
});

watch(
  () => props.userCoords,
  (newCoords) => {
    if (map && newCoords){
      if (!userMarker) {
        userMarker = L.marker(newCoords).addTo(map);
      } else {
        userMarker.setLatLng(newCoords);
      }
      map.setView(newCoords, 15);
      }
  }
);
</script>

<template>
  <div ref="mapContainer" class="flex-1 map-container"></div>
</template>

<style scoped>
/* Removes unwanted padding/margin */ 
.flex-1 {
  width: 100%;
  height: 100vh;
  overflow: hidden; /* Ensures no extra spacing */
}
</style>