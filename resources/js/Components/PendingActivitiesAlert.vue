<template>
    <div v-if="hasActivitiesPending" class="flex flex-col gap-y-3 text-xs p-4 border-t border-white/10">
        <strong class="text-gray-700 flex items-center gap-2">
            <i class="fa-solid fa-exclamation-triangle text-amber-500"></i>
            Actividades sin confirmar
        </strong>
        
        <ul class="flex flex-col gap-3">
            <li 
                v-for="activity in pendingActivities" 
                :key="activity.type"
                @click="navigateToActivities(activity.type)"
                class="py-2 px-4 rounded-md shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex flex-col justify-center items-center"
                :class="getActivityClass(activity.type)"
            >
                <div class="flex items-center gap-2 w-full">
                    <i :class="getActivityIcon(activity.type)" class="text-base"></i>
                    
                    <strong class="flex-1">{{ getActivityLabel(activity.type) }}</strong>
                </div>
                <div class="font-bold text-lg mt-1">
                    {{ activity.count }} 
                    <span class="text-xs font-normal">{{ activity.count === 1 ? 'Pendiente' : 'Pendientes' }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';

const pendingActivities = ref([]);

const getActivities = async () => {
    try {
        const { data } = await axios.get(route("get.pending.activities"));
        pendingActivities.value = data.activities || [];
    } catch (error) {
        console.error('Error al obtener actividades pendientes:', error);
    }
};

const hasActivitiesPending = computed(() => {
    return pendingActivities.value.length > 0 && pendingActivities.value.some(a => a.count > 0);
});

const getActivityClass = (type) => {
    const classes = {
        'TOUR': 'bg-purple-100 text-purple-700 hover:bg-purple-200',
        'EMBARCACION': 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
        'TRANSFER': 'bg-amber-100 text-amber-700 hover:bg-amber-200',
    };
    return classes[type] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
};

const getActivityIcon = (type) => {
    const icons = {
        'TOUR': 'fa-solid fa-person-hiking',
        'EMBARCACION': 'fa-solid fa-ship',
        'TRANSFER': 'fa-solid fa-bus',
    };
    return icons[type] || 'fa-solid fa-question';
};

const getActivityLabel = (type) => {
    const labels = {
        'TOUR': 'Tours',
        'EMBARCACION': 'Embarcaciones',
        'TRANSFER': 'Transportes',
    };
    return labels[type] || type;
};

const navigateToActivities = (type) => {
    router.get(route('BookingServices.index', { 
        type: type, 
        status: 'SIN CONFIRMAR' 
    }));
};

getActivities();
</script>
