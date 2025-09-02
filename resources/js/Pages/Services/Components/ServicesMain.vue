<template>
    <div>
        <ol>
            <li v-if="hasCapitan" class="flex items-center gap-7">
                <i class="fa-solid fa-anchor text-5xl size-20"></i>
                <div class="w-full h-20">
                    <h1 class=" font-bold text-lg">Incluye capitan</h1>
                    <p class="text-sm">
                        Incluye un capitan para acompañarte en la travesia por el mar.
                    </p>
                </div>
            </li>

            <li v-if="hasAssistant" class="flex items-center gap-7">
                <i class="fa-solid fa-people-carry-box text-5xl size-20"></i>
                <div class="w-full h-20">
                    <h1 class=" font-bold text-lg">Incluye asistente</h1>
                    <p class="text-sm">
                        Incluye un asistente para acompañarte en la travesia por el mar.
                    </p>
                </div>
            </li>
            <li v-if="hasCombustible" class="flex items-center gap-7">
                <i class="fa-solid fa-gas-pump text-5xl size-20"></i>
                <div class="w-full h-20">
                    <h1 class=" font-bold text-lg">Incluye combustible</h1>
                    <p class="text-sm">
                        Incluye combustible para que vayas donde quieras.
                    </p>
                </div>
            </li>
        </ol>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    service: Object,
    features: Array
})

const assistant = props.features.find(feature => feature.name == 'ayudante')
const combustible = props.features.find(feature => feature.name == 'combustible')
const capitan = props.features.find(feature => feature.name === 'capitan')


const hasCombustible = computed(() => {
  const includes = JSON.parse(props.service?.includes)
  return Array.isArray(includes) && (
    includes.includes('COMBUSTIBLE') || includes.includes(combustible?.id))
})

const hasCapitan = computed(() => {
  const includes = JSON.parse(props.service?.includes)
  return Array.isArray(includes) && (
    includes.includes('CAPITAN') || includes.includes(capitan?.id)
  )
})

const hasAssistant = computed(() => {
  const includes = JSON.parse(props.service?.includes)
  return Array.isArray(includes) && (
    includes.includes('AYUDANTE') || includes.includes(assistant?.id)
  )
})

</script>
