<script setup>
import { elements } from '../utils/gameData'

defineEmits(['select'])
</script>

<template>
    <div class="flex flex-col items-center w-full max-w-5xl relative p-6 z-10 mt-16 md:mt-24 animate-pop-in">
        <h2 class="text-3xl md:text-5xl font-black mb-10 text-center bg-clip-text text-transparent bg-linear-to-r from-blue-300 to-emerald-300 drop-shadow-md">Infuse Element</h2>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full px-4 md:px-8">
        <button v-for="e in elements" :key="e.id"
                @click="$emit('select', e.id)"
                class="glass-panel group relative flex flex-col items-center justify-center p-6 md:p-10 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 active:scale-95 cursor-pointer overflow-hidden rounded-3xl border-2 border-transparent hover:border-white/20">
            <div :class="['absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-linear-to-br', e.color]"></div>
            <span class="text-5xl md:text-7xl mb-4 group-hover:scale-110 transition-transform duration-300 animate-float-fast drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">{{ e.icon }}</span>
            <span class="font-extrabold text-xl tracking-widest relative z-10">{{ e.name }}</span>
            <span class="text-xs mt-2 font-medium bg-black/40 px-3 py-1 rounded-full text-pink-200 relative z-10 animate-pulse">{{ e.desc }}</span>
        </button>
        </div>
    </div>
</template>
