# Componente de Búsqueda estilo Airbnb

Este componente ha sido rediseñado para replicar la experiencia visual y funcional de la búsqueda de Airbnb, adaptado para servicios de turismo en Colombia.

## Características principales

### 🎨 Diseño Visual
- **Barra de búsqueda redondeada** similar a Airbnb
- **Paneles desplegables** con información contextual
- **Animaciones suaves** y transiciones fluidas
- **Efectos hover** y estados activos
- **Colores coherentes** con la marca

### 🔍 Funcionalidades de Búsqueda

#### 1. Sección "Dónde"
- Búsqueda de destinos en tiempo real
- Destinos populares predefinidos (Cartagena, San Andrés, Medellín, etc.)
- Filtros por tipo de servicio (Tours, Embarcaciones)
- Emojis e iconos para mejor UX

#### 2. Sección "Check-in"
- Selector de fechas intuitivo
- Opciones rápidas (Hoy, Mañana, Fin de semana)
- Vista de calendario dual (entrada y salida)

#### 3. Sección "Check-out"
- Integración con fecha de entrada
- Sugerencias de duración (1 noche, 1 semana, etc.)
- Cálculo automático de estadía

#### 4. Sección "Quién"
- Contadores para adultos, niños y bebés
- Botones de incremento/decremento con animaciones
- Resumen automático de huéspedes

### 🤖 Búsqueda con IA
- Se activa cuando hay criterios de búsqueda
- Sección destacada con gradiente
- Integración con backend para recomendaciones

## Instalación y Uso

### Dependencias Requeridas
```json
{
  "@headlessui/vue": "^1.7.22",
  "@heroicons/vue": "^2.1.5",
  "marked": "^15.0.12",
  "vue": "^3.3.13"
}
```

### Importación del Componente
```vue
<template>
  <div>
    <Search />
  </div>
</template>

<script setup>
import Search from '@/Components/SearchEngines/Search.vue'
</script>
```

## Estructura de Datos

### Props esperadas
```javascript
// Los datos se manejan internamente, pero puedes pasar:
const searchProps = {
  defaultLocation: 'Cartagena',
  defaultGuests: { adults: 2, children: 0, infants: 0 },
  serviceTypes: ['TOUR', 'EMBARCACION']
}
```

### Eventos emitidos
```javascript
// Eventos que puedes escuchar:
@search="handleSearch"          // Al hacer búsqueda normal
@ai-search="handleAiSearch"     // Al usar búsqueda con IA
@location-selected="handleLocation"
@dates-selected="handleDates"
@guests-updated="handleGuests"
```

## Personalización

### Colores del tema
El componente usa principalmente:
- **Rose/Pink**: Botones principales y acentos
- **Gray**: Texto y elementos secundarios
- **Gradientes**: Para secciones especiales como IA

### Animaciones incluidas
- **Ripple effect**: En botones al hacer clic
- **Float animation**: En botón de búsqueda al hover
- **Slide in up**: Para cards de destinos
- **Pulse glow**: Para secciones activas
- **Scale hover**: Para elementos interactivos

### CSS personalizable
Todas las animaciones están definidas en el componente y pueden ser modificadas:

```css
/* Ejemplo de personalización */
.search-button:hover {
  animation: float 2s ease-in-out infinite;
  transform: scale(1.05);
}
```

## Integración con Backend

### Endpoint para IA
```javascript
const response = await axios.post('/get-service', {
  prompt: searchCriteria,
  type: serviceType
});
```

### Formato de respuesta esperado
```json
{
  "recommendation": "Texto en markdown con recomendaciones",
  "response": "Respuesta alternativa",
  "links": [
    {
      "url": "/showservice/slug",
      "title": "Nombre del servicio"
    }
  ]
}
```

## Responsive Design

El componente es completamente responsive:
- **Desktop**: Barra horizontal completa
- **Tablet**: Se mantiene la estructura
- **Mobile**: Se puede adaptar a diseño vertical (requiere customización)

## Casos de Uso

1. **Búsqueda de Tours**: Usuario selecciona destino y fechas
2. **Búsqueda de Embarcaciones**: Filtro específico por tipo
3. **Búsqueda con IA**: Para consultas complejas o generales
4. **Búsqueda rápida**: Con destinos y fechas predefinidas

## Próximas Mejoras

- [ ] Integración con calendario real (vue-datepicker)
- [ ] Geolocalización automática
- [ ] Filtros avanzados (precio, rating, etc.)
- [ ] Historial de búsquedas
- [ ] Sugerencias en tiempo real
- [ ] Modo oscuro

## Notas Técnicas

- Compatible con Vue 3 + Composition API
- Usa Tailwind CSS para estilos
- Animaciones CSS puras (sin librerías externas)
- Código optimizado para rendimiento
- Accesibilidad básica incluida

## Demo

Puedes ver una demostración estática en `search-demo.html` incluido en el proyecto.
