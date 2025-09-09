<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <label class="block text-sm font-medium text-gray-700">
                Seleccionar Ubicación en el Mapa
            </label>
            <Button @click="getCurrentLocation" icon="fa-solid fa-location-crosshairs" label="Mi Ubicación" size="small"
                severity="info" outlined :loading="gettingLocation" />
        </div>

        <!-- Buscador de ubicaciones -->
        <div class="relative search-container">
            <div class="relative">
                <input v-model="searchQuery" @input="onSearchInput" @keydown.enter.prevent="searchLocation"
                    @focus="showSuggestions = true" type="text" placeholder="Buscar dirección o lugar..."
                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    :disabled="searchLoading" />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i v-if="searchLoading" class="fa-solid fa-spinner fa-spin text-gray-400"></i>
                    <i v-else class="fa-solid fa-magnifying-glass text-gray-400 cursor-pointer hover:text-gray-600"
                        @click="searchLocation"></i>
                </div>
            </div>

            <!-- Sugerencias de búsqueda -->
            <div v-if="showSuggestions && searchSuggestions.length > 0"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div v-for="(suggestion, index) in searchSuggestions" :key="index" @click="selectSuggestion(suggestion)"
                    class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                    <div class="flex items-start space-x-2">
                        <i class="fa-solid fa-location-dot text-gray-400 mt-1 text-sm"></i>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">
                                {{ suggestion.display_name.split(',')[0] }}
                            </p>
                            <p class="text-xs text-gray-500 truncate">
                                {{ suggestion.display_name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative">
            <div ref="mapContainer" class="h-96 w-full rounded-lg border border-gray-300 overflow-hidden"
                :class="{ 'opacity-50': loading }">
                <LMap v-if="!loading" 
                    ref="map"
                    :zoom="zoom" 
                    :center="center" 
                    :use-global-leaflet="false" 
                    @click="onMapClick"
                    @ready="onMapReady" 
                    style="height: 384px; width: 100%; z-index: 1;" 
                    class="leaflet-map"
                    :options="{ 
                        zoomControl: true,
                        attributionControl: true,
                        scrollWheelZoom: true,
                        doubleClickZoom: true,
                        boxZoom: true,
                        keyboard: true,
                        dragging: true,
                        trackResize: true
                    }">
                    <LTileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        :options="{
                            maxZoom: 19,
                            minZoom: 1,
                            opacity: 1.0,
                            zIndex: 1
                        }"
                    />

                    <LMarker v-if="markerPosition" :lat-lng="markerPosition" :draggable="true"
                        @dragend="onMarkerDragEnd">
                        <LIcon :icon-size="[25, 41]" :icon-anchor="[12, 41]" :popup-anchor="[1, -34]"
                            :shadow-size="[41, 41]"
                            icon-url="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
                            shadow-url="https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png" />
                        <LPopup>
                            <div class="text-sm">
                                <strong>{{ popupText }}</strong><br>
                                Lat: {{ markerPosition[0].toFixed(6) }}<br>
                                Lng: {{ markerPosition[1].toFixed(6) }}
                            </div>
                        </LPopup>
                    </LMarker>
                </LMap>

                <!-- Loading overlay -->
                <div v-if="loading" class="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div class="text-center">
                        <i class="fa-solid fa-spinner fa-spin text-2xl text-gray-500 mb-2"></i>
                        <p class="text-gray-500">Cargando mapa...</p>
                    </div>
                </div>
            </div>

            <!-- Coordenadas actuales -->
            <div v-if="markerPosition" class="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div class="flex items-center justify-between mb-2">
                    <div class="text-sm">
                        <span class="font-medium text-blue-800">Ubicación seleccionada:</span>
                        <span class="text-blue-600 ml-2">
                            {{ markerPosition[0].toFixed(6) }}, {{ markerPosition[1].toFixed(6) }}
                        </span>
                    </div>
                    <Button @click="clearMarker" icon="fa-solid fa-times" size="small" severity="danger" text
                        v-tooltip="'Limpiar ubicación'" />
                </div>
                
                <!-- Información de dirección -->
                <div v-if="addressInfo.city || addressInfo.fullAddress" class="text-xs text-blue-600 space-y-1">
                    <div v-if="isGeocodingLoading" class="flex items-center">
                        <i class="fa-solid fa-spinner fa-spin mr-2"></i>
                        <span>Obteniendo información de dirección...</span>
                    </div>
                    <template v-else>
                        <div v-if="addressInfo.city">
                            <strong>Ciudad:</strong> {{ addressInfo.city }}
                        </div>
                        <div v-if="addressInfo.state">
                            <strong>Departamento/Estado:</strong> {{ addressInfo.state }}
                        </div>
                        <div v-if="addressInfo.country">
                            <strong>País:</strong> {{ addressInfo.country }}
                        </div>
                        <div v-if="addressInfo.fullAddress" class="pt-1 border-t border-blue-200 mt-2">
                            <strong>Dirección completa:</strong><br>
                            <span class="text-xs">{{ addressInfo.fullAddress }}</span>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <!-- Instrucciones -->
        <div class="text-xs text-gray-500 space-y-1">
            <p>• Busca direcciones o lugares en el campo de búsqueda</p>
            <p>• Haz clic en el mapa para colocar un marcador</p>
            <p>• Arrastra el marcador para ajustar la posición</p>
            <p>• Usa "Mi Ubicación" para obtener tu ubicación actual</p>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import Button from 'primevue/button';

const props = defineProps({
    latitude: {
        type: [Number, String],
        default: null
    },
    longitude: {
        type: [Number, String],
        default: null
    },
    address: {
        type: String,
        default: ''
    }
});

const emit = defineEmits([
  'update:latitude', 
  'update:longitude', 
  'update:address',
  'update:city',
  'update:state',
  'update:country'
]);

// Estado del componente
const loading = ref(true);
const gettingLocation = ref(false);
const zoom = ref(13);
const center = ref([10.3910, -75.4794]); // Cartagena por defecto
const markerPosition = ref(null);
const mapContainer = ref(null);
const mapReady = ref(false);
const map = ref(null);

// Estado del buscador
const searchQuery = ref('');
const searchLoading = ref(false);
const searchSuggestions = ref([]);
const showSuggestions = ref(false);
const searchTimeout = ref(null);

// Estado de la dirección
const addressInfo = ref({
  city: '',
  state: '',
  country: '',
  fullAddress: ''
});
const isGeocodingLoading = ref(false);

// Texto del popup
const popupText = ref('Ubicación seleccionada');

// Inicializar el mapa
onMounted(async () => {
    await nextTick();

    // Añadir event listener para cerrar sugerencias
    document.addEventListener('click', handleClickOutside);

    // Configurar observador del contenedor del mapa
    observeMapContainer();

    // Si hay coordenadas en props, usarlas
    if (props.latitude && props.longitude) {
        const lat = parseFloat(props.latitude);
        const lng = parseFloat(props.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
            center.value = [lat, lng];
            markerPosition.value = [lat, lng];
            popupText.value = props.address || 'Ubicación del alojamiento';
        }
    }

    // Cargar el mapa inmediatamente - reducir delay
    setTimeout(() => {
        loading.value = false;
        mapReady.value = true;
        // Forzar redimensionamiento después de cargar
        setTimeout(() => {
            forceMapResize();
        }, 100);
    }, 100);
});

// Limpiar event listeners al desmontar
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    if (searchTimeout.value) {
        clearTimeout(searchTimeout.value);
    }
});

// Manejar clic en el mapa
const onMapClick = async (event) => {
  const { lat, lng } = event.latlng;
  markerPosition.value = [lat, lng];
  popupText.value = 'Obteniendo dirección...';
  
  // Emitir las coordenadas a los campos padre
  emit('update:latitude', lat.toFixed(6));
  emit('update:longitude', lng.toFixed(6));
  
  // Obtener información de la dirección
  await reverseGeocode(lat, lng);
};// Manejar cuando el mapa esté listo
const onMapReady = (mapInstance) => {
    // Múltiples invalidaciones para asegurar que el mapa se renderice
    setTimeout(() => {
        mapInstance.invalidateSize();
    }, 50);
    
    setTimeout(() => {
        mapInstance.invalidateSize();
        // Forzar redibujado de las tiles
        mapInstance.eachLayer((layer) => {
            if (layer._url) {
                layer.redraw();
            }
        });
    }, 200);
    
    setTimeout(() => {
        mapInstance.invalidateSize();
        if (window.dispatchEvent) {
            window.dispatchEvent(new Event('resize'));
        }
    }, 500);
};

// Manejar arrastre del marcador
const onMarkerDragEnd = async (event) => {
  const { lat, lng } = event.target.getLatLng();
  markerPosition.value = [lat, lng];
  popupText.value = 'Obteniendo dirección...';
  
  // Emitir las coordenadas a los campos padre
  emit('update:latitude', lat.toFixed(6));
  emit('update:longitude', lng.toFixed(6));
  
  // Obtener información de la dirección
  await reverseGeocode(lat, lng);
};// Funciones del buscador
const onSearchInput = () => {
  // Limpiar timeout anterior
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  
  // Si la query está vacía, limpiar sugerencias
  if (!searchQuery.value.trim()) {
    searchSuggestions.value = [];
    showSuggestions.value = false;
    return;
  }
  
  // Buscar después de 300ms de inactividad
  searchTimeout.value = setTimeout(() => {
    fetchSearchSuggestions();
  }, 300);
};

// Geocodificación inversa para obtener dirección desde coordenadas
const reverseGeocode = async (lat, lng) => {
  isGeocodingLoading.value = true;
  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=es`
    );
    
    if (response.ok) {
      const data = await response.json();
      
      if (data && data.address) {
        const address = data.address;
        
        // Extraer información de la dirección
        const city = address.city || address.town || address.village || address.municipality || '';
        const state = address.state || address.province || address.region || '';
        const country = address.country || '';
        const fullAddress = data.display_name || '';
        
        // Actualizar el estado local
        addressInfo.value = {
          city,
          state,
          country,
          fullAddress
        };
        
        // Emitir los datos al componente padre
        emit('update:address', fullAddress);
        emit('update:city', city);
        emit('update:state', state);
        emit('update:country', country);
        
        // Actualizar el texto del popup
        popupText.value = fullAddress ? `${fullAddress}` : 'Ubicación seleccionada';
        
        return { city, state, country, fullAddress };
      }
    }
  } catch (error) {
    console.error('Error en geocodificación inversa:', error);
  } finally {
    isGeocodingLoading.value = false;
  }
  
  return null;
};const fetchSearchSuggestions = async () => {
    if (!searchQuery.value.trim() || searchQuery.value.length < 3) return;

    searchLoading.value = true;

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&limit=5&countrycodes=co&addressdetails=1`
        );

        if (response.ok) {
            const data = await response.json();
            searchSuggestions.value = data;
            showSuggestions.value = true;
        }
    } catch (error) {
        console.error('Error en la búsqueda:', error);
    } finally {
        searchLoading.value = false;
    }
};

const searchLocation = async () => {
    if (!searchQuery.value.trim()) return;

    searchLoading.value = true;
    showSuggestions.value = false;

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&limit=1&countrycodes=co&addressdetails=1`
        );

        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                selectSuggestion(data[0]);
            } else {
                alert('No se encontraron resultados para la búsqueda.');
            }
        }
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        alert('Error al buscar la ubicación. Inténtalo de nuevo.');
    } finally {
        searchLoading.value = false;
    }
};

const selectSuggestion = (suggestion) => {
  const lat = parseFloat(suggestion.lat);
  const lng = parseFloat(suggestion.lon);
  
  // Actualizar el mapa
  center.value = [lat, lng];
  markerPosition.value = [lat, lng];
  
  // Extraer información de dirección si está disponible
  if (suggestion.address) {
    const address = suggestion.address;
    const city = address.city || address.town || address.village || address.municipality || '';
    const state = address.state || address.province || address.region || '';
    const country = address.country || '';
    const fullAddress = suggestion.display_name || '';
    
    // Actualizar el estado local
    addressInfo.value = {
      city,
      state,
      country,
      fullAddress
    };
    
    // Emitir los datos al componente padre
    emit('update:address', fullAddress);
    emit('update:city', city);
    emit('update:state', state);
    emit('update:country', country);
    
    popupText.value = city ? `${city}, ${state}` : suggestion.display_name.split(',')[0];
  } else {
    popupText.value = suggestion.display_name.split(',')[0];
  }
  
  // Emitir las coordenadas
  emit('update:latitude', lat.toFixed(6));
  emit('update:longitude', lng.toFixed(6));
  
  // Limpiar búsqueda
  searchQuery.value = suggestion.display_name.split(',')[0];
  showSuggestions.value = false;
  
  // Hacer zoom a la ubicación
  zoom.value = 16;
};// Obtener ubicación actual
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('La geolocalización no está soportada por este navegador.');
    return;
  }
  
  gettingLocation.value = true;
  
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      center.value = [lat, lng];
      markerPosition.value = [lat, lng];
      popupText.value = 'Obteniendo dirección...';
      
      // Emitir las coordenadas
      emit('update:latitude', lat.toFixed(6));
      emit('update:longitude', lng.toFixed(6));
      
      // Obtener información de la dirección
      await reverseGeocode(lat, lng);
      
      gettingLocation.value = false;
    },
    (error) => {
      console.error('Error obteniendo la ubicación:', error);
      alert('No se pudo obtener tu ubicación. Por favor, selecciona manualmente en el mapa.');
      gettingLocation.value = false;
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};

// Limpiar marcador
const clearMarker = () => {
  markerPosition.value = null;
  addressInfo.value = {
    city: '',
    state: '',
    country: '',
    fullAddress: ''
  };
  
  emit('update:latitude', null);
  emit('update:longitude', null);
  emit('update:address', null);
  emit('update:city', null);
  emit('update:state', null);
  emit('update:country', null);
};// Cerrar sugerencias al hacer clic fuera
const handleClickOutside = (event) => {
    const searchContainer = event.target.closest('.search-container');
    if (!searchContainer) {
        showSuggestions.value = false;
    }
};

// Función para forzar redimensionamiento del mapa
const forceMapResize = () => {
    if (map.value && map.value.leafletObject) {
        setTimeout(() => {
            map.value.leafletObject.invalidateSize();
        }, 50);
        setTimeout(() => {
            map.value.leafletObject.invalidateSize();
        }, 200);
        setTimeout(() => {
            map.value.leafletObject.invalidateSize();
            if (window.dispatchEvent) {
                window.dispatchEvent(new Event('resize'));
            }
        }, 500);
    }
};

// Observador para detectar cuando el contenedor del mapa es visible
const observeMapContainer = () => {
    if (mapContainer.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    forceMapResize();
                }
            });
        });
        observer.observe(mapContainer.value);
    }
};

// Observar cambios en las props para actualizar el mapa
watch([() => props.latitude, () => props.longitude], ([newLat, newLng]) => {
    if (newLat && newLng) {
        const lat = parseFloat(newLat);
        const lng = parseFloat(newLng);

        if (!isNaN(lat) && !isNaN(lng)) {
            center.value = [lat, lng];
            markerPosition.value = [lat, lng];
        }
    }
});
</script>

<style scoped>
/* Estilos específicos para el mapa Leaflet */
.leaflet-map {
    height: 384px !important;
    width: 100% !important;
    z-index: 1 !important;
    position: relative !important;
}

/* Asegurar dimensiones del contenedor */
.leaflet-map :deep(.leaflet-container) {
    height: 384px !important;
    width: 100% !important;
}

/* Asegurar que los controles de Leaflet se vean correctamente */
:deep(.leaflet-control-zoom) {
    box-shadow: 0 1px 5px rgba(0,0,0,0.4);
}

:deep(.leaflet-control-zoom a) {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    width: 26px;
    height: 26px;
    line-height: 26px;
    display: block;
    text-align: center;
    text-decoration: none;
    color: black;
}

:deep(.leaflet-control-zoom a:hover) {
    background-color: #f4f4f4;
}

/* Forzar la carga de tiles */
:deep(.leaflet-tile-container) {
    pointer-events: auto;
    opacity: 1 !important;
    visibility: visible !important;
}

:deep(.leaflet-tile) {
    image-rendering: -webkit-optimize-contrast;
    opacity: 1 !important;
    visibility: visible !important;
}

:deep(.leaflet-tile-pane) {
    opacity: 1 !important;
    visibility: visible !important;
}

:deep(.leaflet-layer) {
    opacity: 1 !important;
    visibility: visible !important;
}

/* Fix para el popup */
:deep(.leaflet-popup-content-wrapper) {
    background: white;
    color: #333;
    font-size: 13px;
    line-height: 1.4;
    border-radius: 5px;
    box-shadow: 0 3px 14px rgba(0,0,0,0.4);
}

/* Fix para los marcadores */
:deep(.leaflet-marker-icon) {
    margin-left: -12px;
    margin-top: -41px;
}

/* Asegurar que el mapa sea visible */
:deep(.leaflet-map-pane) {
    z-index: 1 !important;
}

:deep(.leaflet-objects-pane) {
    z-index: 1 !important;
}
</style>
