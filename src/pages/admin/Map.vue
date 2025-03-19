<script setup lang="ts">
import Sidebar from '../../layouts/Sidebar.vue';
import MapView from '../../components/MapView.vue';
import { updateLiveLocation } from '../../utils/location';
import { ref, onMounted } from 'vue';

const userCoords = ref<[number, number] | null>(null);

function trackUserLocation() {
  if (!navigator.geolocation){
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      userCoords.value = [latitude, longitude]; //Update user coordinates
      updateLiveLocation(latitude, longitude); //Save to Firebase
    },
    (error) => {
      console.error("Error getting location: ", error);
    },
    { enableHighAccuracy: true }
  );
}

onMounted(() => {
  trackUserLocation();
});

</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Full-page Map -->
    <div class="flex-1">
      <MapView :userCoords="userCoords" />
    </div>
  </div>
</template>
