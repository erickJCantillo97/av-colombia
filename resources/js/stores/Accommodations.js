import { defineStore } from 'pinia';
import axios from 'axios';

export const useAccommodationsStore = defineStore('accommodations', {
  state: () => ({
    // Lista de alojamientos obtenidos de la API
    accommodations: [],
    // Objeto de paginación (compatible con la respuesta paginada de Laravel)
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
      links: [],
    },
    // Filtros que se envían como parámetros a la API (basados en el controlador)
    filters: {
      city: '',              // Ciudad (ej: 'Cartagena')
      country: '',           // País (ej: 'Colombia')
      type: '',              // Tipo de alojamiento (ej: 'hotel')
      star_rating: null,     // Rating mínimo (ej: 4)
      min_price: null,       // Precio mínimo por noche
      max_price: null,       // Precio máximo por noche
      guests_adults: null,   // Número de adultos
      guests_children: null, // Número de niños
      amenities: [],         // Array de IDs de amenidades (ej: [1, 2])
      sort_by: 'created_at', // Campo de ordenamiento (ej: 'price')
      sort_order: 'desc',    // Orden (asc/desc)
      per_page: 15,          // Elementos por página
    },
    // Estados de UI
    loading: false,
    error: null,
  }),

  getters: {
    /**
     * Getter para obtener la lista de alojamientos filtrados.
     * @returns {Array} Lista de alojamientos.
     */
    getAccommodations(state) {
      return state.accommodations;
    },

    /**
     * Getter para obtener el estado de paginación actual.
     * @returns {Object} Objeto de paginación.
     */
    getPagination(state) {
      return state.pagination;
    },
  },

  actions: {
    /**
     * Acción para fetch los alojamientos desde la API, aplicando los filtros actuales.
     * Maneja loading, errores y actualiza el estado con la respuesta paginada.
     * @param {number} [page=1] - Página a solicitar (opcional, default a 1).
     */
    async fetchAccommodations(page = 1) {
      this.loading = true;
      this.error = null;

      // Agregar la página a los filtros
      const params = { ...this.filters, page };

      try {
        const response = await axios.get(route('api.accommodations.index'), {  // Cambio: usa el nombre de ruta API correcto (plural con prefijo 'api.')
          params,
          headers: {
            'Accept': 'application/json'  // Mantiene el header para forzar JSON
          }
        });

        // Actualizar lista de alojamientos y paginación
        console.log(response)
        this.accommodations = response.data.data;
        this.pagination = {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
          links: response.data.links,
        };
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar los alojamientos';
        console.error('Error fetching accommodations:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Acción para actualizar los filtros y refetch los alojamientos automáticamente.
     * @param {Object} newFilters - Objeto con los nuevos filtros a aplicar.
     */
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.fetchAccommodations(); // Refetch inmediato
    },

    /**
     * Acción para cambiar de página y refetch.
     * @param {number} page - Nueva página a cargar.
     */
    changePage(page) {
      this.fetchAccommodations(page);
    },
  },
});
