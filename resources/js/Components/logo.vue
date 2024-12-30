<template>
    <svg :width :height viewBox="0 0 336 197" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_bd_1_2)">
            <path
                d="M98.5 0.999405H121.5L148 68.9994L199 188C182.989 188 164.011 188 148 188L102.5 93.4995L57 188C41.379 188 20.621 188 5 188L57 68.9994L83 0.999405H98.5Z"
                fill="#010101" />
            <path
                d="M239.5 188H277L302 105L330.5 0.99939C314.489 0.99939 301.011 0.999405 285 0.999405L249.5 135L208 0.999405C192.379 0.999405 183.121 0.99939 167.5 0.99939L193.5 105L216.5 188H239.5Z"
                fill="black" />
            <path
                d="M98.5 0.999405H121.5L148 68.9994L199 188C182.989 188 164.011 188 148 188L102.5 93.4995L57 188C41.379 188 20.621 188 5 188L57 68.9994L83 0.999405H98.5Z"
                stroke="black" />
            <path
                d="M239.5 188H277L302 105L330.5 0.99939C314.489 0.99939 301.011 0.999405 285 0.999405L249.5 135L208 0.999405C192.379 0.999405 183.121 0.99939 167.5 0.99939L193.5 105L216.5 188H239.5Z"
                stroke="black" />
        </g>
        <defs>
            <filter id="filter0_bd_1_2" x="0.23584" y="-3.50061" width="334.92" height="200"
                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_2" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="effect1_backgroundBlur_1_2" result="effect2_dropShadow_1_2" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_2" result="shape" />
            </filter>
        </defs>
    </svg>
</template>

<script setup>
defineProps({
    width: {
        type: Number,
        default: 230
    },
    height: {
        type: Number,
        default: 140
    }
});

</script>
