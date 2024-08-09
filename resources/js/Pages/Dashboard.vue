<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
</script>

<template>
    <AppLayout title="Dashboard">
        <div class="py-4">
            <div class="w-full mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <h1>
                        Bienvenido a tu panel de control <strong>
                            {{ $page.props.auth.user.name }}
                        </strong>
                    </h1>

                </div>
            </div>
        </div>
    </AppLayout>
</template>
