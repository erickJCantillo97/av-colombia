import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';

const CACHE_KEY = 'avcolombia_search_state';

const state = {
  location: ref(''),
  type: ref({
    label: 'Tours',
    value: 'TOUR',
  }),
  checkin: ref(''),
  checkout: ref(''),
  guests: ref({ adults: 2, children: 0, infants: 0 }),
};

function loadCache() {
  const cache = localStorage.getItem(CACHE_KEY);
  if (cache) {
    try {
      const parsed = JSON.parse(cache);
      if (parsed.location) state.location.value = parsed.location;
      if (parsed.checkin) state.checkin.value = parsed.checkin;
      if (parsed.checkout) state.checkout.value = parsed.checkout;
      if (parsed.guests) state.guests.value = parsed.guests;
    } catch { }
  }
}

function saveCache() {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    location: state.location.value,
    checkin: state.checkin.value,
    type: state.type.value,
    checkout: state.checkout.value,
    guests: state.guests.value,
  }));
}

// Sincronizar cambios con cache
watch([state.location, state.checkin, state.checkout, state.guests, state.type], saveCache, { deep: true });


function performSearch() {

}

// Inicializar
loadCache();

export default {
  ...state,
  performSearch
};
