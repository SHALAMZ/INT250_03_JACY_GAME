<script setup>
import { elements } from '../utils/gameData'

defineEmits(['select'])
</script>

<template>
    <div class="flex flex-col items-center w-full max-w-5xl relative z-10 mt-16 md:mt-24">
        <h2 class="text-3xl md:text-5xl font-black mb-10 text-center bg-clip-text text-transparent bg-linear-to-r from-blue-300 to-emerald-300 drop-shadow-md">Infuse Element</h2>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full px-4 md:px-8">
        <button v-for="e in elements" :key="e.id"
                @click="$emit('select', e.id)"
                class="glass-panel group relative flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden rounded-3xl border-2 border-transparent">
            <div :class="['absolute inset-0 opacity-0 bg-linear-to-br', e.color]"></div>
            <span class="text-5xl md:text-7xl mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">{{ e.icon }}</span>
            <span class="font-extrabold text-xl tracking-widest relative z-10">{{ e.name }}</span>
            <span class="text-xs mt-2 font-medium bg-black/40 px-3 py-1 rounded-full text-pink-200 relative z-10">{{ e.desc }}</span>
        </button>
        </div>
    </div>
</template>
