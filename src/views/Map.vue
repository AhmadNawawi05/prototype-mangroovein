<template>
  <div class="navbar">
    <!-- Navbar content -->
  </div>
  <div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark">
      <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
    </a>
    <div class="map" ref="mapContainer"></div>
    <button
      @click="zoomToCity"
      class="zoom-button rounded-full text-base bg-[#9EB384] text-gray-900 hover:text-gray-200 absolute top-5 left-5 hover:bg-[#435334]"
    >
      Lihat Detail Kota
    </button>
    
    <button
      @click="toggleInfoBox"
      class="toggle-button rounded-full text-base bg-[#9EB384] text-gray-900 hover:text-gray-200 absolute bottom-5 right-5 hover:bg-[#435334]"
    >
      Information
    </button>

    <!-- Information Box Content Left-->
    <div class="info-box" v-if="showInfoBox">
        <h2>Informasi</h2>
        <div>
          <strong>Ketinggian:</strong> <span id="ketinggian"></span> meter
        </div>
        <div>
          <strong>Koordinat:</strong> <span id="koordinat"></span>
        </div>
      </div>

      <div class="info-box-right" v-if="showInfoBox">
        <!-- Konten informasi di sini -->
      </div>

  </div>
</template>

<script>
import  { Map } from 'maplibre-gl';
import maplibregl from 'maplibre-gl';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';

export default {
  name: 'Map',

  data() {
    return {
      showInfoBox: false
    }
  },

  setup() {
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);
    const initialState = { lng: 107.60981, lat: -6.914744, zoom: 12 };
    const apiKey = 'A6n9i2KWbntxzdZIQKze';

    // Data informasi kota
    const cityInfo = {
      name: 'Bandung',
      lat: -6.914744,
      lng: 107.60981,
    };

    onMounted(() => {
      map.value = markRaw(
        new Map({
          container: mapContainer.value,
          style: `https://api.maptiler.com/maps/hybrid/style.json?key=${apiKey}`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        })
      );

      map.value.on('load', function() {
        map.value.addSource('cat_teritories', {
          'type': 'geojson',
          'data': {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[111.55072191,-3.0271876],[111.52542145,-2.98086716],[111.49028192,-2.94998578],[111.43405867,-2.92471856],[111.38908007,-2.92191106],[111.35815728,-2.90787343],[111.28787822,-2.93454477],[111.20213777,-2.98928921],[111.3497238,-3.00894039],[111.55072191,-3.0271876]]]},"id":"7d5a22a0-85ad-4604-8867-75f1b3d6e4f6","properties":{"name":"Area A","Price":"200","Diameter":"2 Hectare"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[107.69021356,-7.66918242],[107.71454986,-7.6658935],[107.78313399,-7.68014529],[107.83623138,-7.70535881],[107.83623138,-7.7327631],[107.69021356,-7.66918242]]]},"id":"3b712b43-838c-49ec-9d79-268d311ac642","properties":{"name":"Area B","Price":"100","Diameter":"1 Hectare"}}]},
        });

        map.value.addLayer({
          'id': 'polygons',
          'type': 'fill',
          'source': 'cat_teritories',
          'layout': {},
          'paint': {
            'fill-color': '#FFAA01',
            'fill-opacity': 0.5
          }
        });

        map.value.addLayer({
          'id': 'outline',
          'type': 'line',
          'source': 'cat_teritories',
          'layout': {},
          'paint': {
            'line-color': '#F3A040',
            'line-width': 2
          }
        });

        map.value.on('click', 'polygons', function (e) {
  const infoBoxRight = document.querySelector('.info-box-right');
  infoBoxRight.innerHTML = `
    <h2>Informasi</h2>
    <div>
      <strong>Name:</strong> ${e.features[0].properties.name}
    </div>
    <div>
      <strong>Diameter:</strong> ${e.features[0].properties.Diameter}
    </div>
    <div>
      <strong>Price:</strong> ${e.features[0].properties.Price}
    </div>
  `;
});


      });
    });

    // Method for zooming to the city
    const zoomToCity = () => {
      map.value.flyTo({
        center: [cityInfo.lng, cityInfo.lat],
        zoom: 15,
        essential: true,
      });
    };

    onUnmounted(() => {
      map.value?.remove();
    });

    return {
      map,
      mapContainer,
      apiKey,
      zoomToCity,
    };
  },

  methods: {
    toggleInfoBox() {
      this.showInfoBox = !this.showInfoBox;
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #435334;
  color: #fff;
  padding: 25px;
}

/* Info box */
.info-box {
  background-color: #f0f0f0;
  width: 250px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 60px;
  left: 10px;
  border: 1px solid #ccc;
  z-index: 2;
}

.info-box-right {
  background-color: #f0f0f0;
  width: 250px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 60px;
  right: 10px;
  border: 1px solid #ccc;
  z-index: 2;
  height: 500px;
  overflow-y: auto;
}

/* End info box */

.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 77px);
  /* Sesuaikan dengan tinggi navbar */
}

.map {
  position: fixed;
  top: 65px;
  /* Sesuaikan dengan tinggi navbar */
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  /* Sesuaikan dengan tinggi navbar */
  z-index: 0;
}

.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 700;
}

/* Tambahkan styling khusus untuk tombol "Lihat Detail Kota" */
.zoom-button {
  padding: 10px 20px;
  /* Animasi perubahan warna latar belakang */
}

.toggle-button {
  padding: 10px 20px;
  /* Animasi perubahan warna latar belakang */
}
</style>
