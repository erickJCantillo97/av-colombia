<template>
    <div class="loading-container">
        <!-- Círculos decorativos de fondo -->
        <div class="background-circles">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>

        <!-- Logo con múltiples capas de pulso -->
        <div class="logo-wrapper">
            <div class="logo-pulse pulse-1"></div>
            <div class="logo-pulse pulse-2"></div>
            <div class="logo-pulse pulse-3"></div>
            <div class="logo-content">
                <Logo />
            </div>
        </div>

        <!-- Spinner circular con doble anillo -->
        <div class="spinner-container">
            <svg class="spinner spinner-outer" viewBox="0 0 50 50">
                <circle
                    class="spinner-path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke-width="2.5"
                ></circle>
            </svg>
            <svg class="spinner spinner-inner" viewBox="0 0 50 50">
                <circle
                    class="spinner-path-inner"
                    cx="25"
                    cy="25"
                    r="15"
                    fill="none"
                    stroke-width="2"
                ></circle>
            </svg>
        </div>

        <!-- Texto de carga con efecto mejorado -->
        <div class="loading-text">
            <span class="loading-label">Cargando</span>
            <div class="dots-wrapper">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import Logo from './logo.vue';
</script>

<style scoped>
.loading-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 3rem;
    min-height: 300px;
    overflow: hidden;
}

/* Círculos decorativos de fondo */
.background-circles {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

.circle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    animation: float-circle 8s ease-in-out infinite;
}

.circle-1 {
    width: 150px;
    height: 150px;
    top: -30px;
    left: -30px;
    animation-delay: 0s;
}

.circle-2 {
    width: 100px;
    height: 100px;
    bottom: -20px;
    right: -20px;
    animation-delay: 2s;
}

.circle-3 {
    width: 80px;
    height: 80px;
    top: 50%;
    right: 10%;
    animation-delay: 4s;
}

/* Logo con múltiples pulsos */
.logo-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: float 3s ease-in-out infinite;
    z-index: 2;
}

.logo-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.pulse-1 {
    opacity: 0.3;
    animation: pulse 2s ease-in-out infinite;
}

.pulse-2 {
    opacity: 0.2;
    animation: pulse 2s ease-in-out infinite 0.4s;
}

.pulse-3 {
    opacity: 0.15;
    animation: pulse 2s ease-in-out infinite 0.8s;
}

.logo-content {
    position: relative;
    z-index: 3;
    filter: drop-shadow(0 8px 16px rgba(59, 130, 246, 0.4));
}

/* Spinner circular doble */
.spinner-container {
    position: relative;
    width: 70px;
    height: 70px;
    z-index: 2;
}

.spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.spinner-outer {
    animation: rotate 2s linear infinite;
}

.spinner-inner {
    animation: rotate 1.5s linear infinite reverse;
}

.spinner-path {
    stroke: #010102;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
    filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.5));
}

.spinner-path-inner {
    stroke: #60a5fa;
    stroke-linecap: round;
    animation: dash-inner 1.2s ease-in-out infinite;
    filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.5));
}

/* Texto de carga mejorado */
.loading-text {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
}

.loading-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #475569;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.dots-wrapper {
    display: flex;
    gap: 0.25rem;
    align-items: center;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #000000);
    animation: bounce-dot 1.4s ease-in-out infinite;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.dot:nth-child(1) {
    animation-delay: 0s;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

/* Barra de progreso decorativa */
.progress-bar {
    width: 200px;
    height: 3px;
    background: rgba(59, 130, 246, 0.1);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    z-index: 2;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, 
        transparent 0%, 
        #3b82f6 50%, 
        transparent 100%
    );
    border-radius: 10px;
    animation: progress-slide 1.5s ease-in-out infinite;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* Animaciones */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-12px);
    }
}

@keyframes float-circle {
    0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.5;
    }
    50% {
        transform: translate(20px, -20px) scale(1.1);
        opacity: 0.8;
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.3;
    }
    50% {
        transform: scale(1.4);
        opacity: 0.05;
    }
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}

@keyframes dash-inner {
    0% {
        stroke-dasharray: 1, 120;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 70, 120;
        stroke-dashoffset: -30;
    }
    100% {
        stroke-dasharray: 70, 120;
        stroke-dashoffset: -100;
    }
}

@keyframes bounce-dot {
    0%, 80%, 100% {
        transform: scale(0.8) translateY(0);
        opacity: 0.6;
    }
    40% {
        transform: scale(1.2) translateY(-8px);
        opacity: 1;
    }
}

@keyframes progress-slide {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(200%);
    }
}
</style>

<style>
/* Estilos globales para el spinner */
.spinner-path,
.spinner-path-inner {
    stroke-linecap: round;
}
</style>