<script setup>
import { weapons } from '../utils/gameData'

defineProps({
    playerHearts: Number
})

defineEmits(['select'])
</script>

<template>
    <div class="flex flex-col items-center w-full max-w-5xl relative z-10 mt-16 md:mt-24">
        <h2 class="text-3xl md:text-5xl font-black mb-8 text-center bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400 drop-shadow-md">Choose Weapon</h2>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full p-2">
        <button v-for="w in weapons" :key="w.id"
                @click="$emit('select', w.id)"
                :disabled="w.id === 'heart' && playerHearts <= 0"
                class="group relative flex flex-col items-center justify-center p-6 md:p-10 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer overflow-hidden rounded-3xl">
            <div :class="['absolute inset-0 opacity-0  bg-linear-to-br', w.color]"></div>
            
            <span class="text-5xl md:text-8xl mb-4 md:mb-6 drop-shadow-xl">{{ w.icon }}</span>
            <span class="font-extrabold tracking-widest relative z-10 text-lg md:text-2xl">{{ w.name }}</span>
            <span v-if="w.special" class="absolute top-3 right-3 text-[10px] md:text-xs font-black text-white bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,1)] px-3 py-1 rounded-full uppercase tracking-widest">Ultimate</span>
            
            <div v-if="w.id === 'heart' && playerHearts <= 0" class="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center font-bold text-lg text-white/50 uppercase tracking-widest">
            Used
            </div>
        </button>
        </div>
    </div>
</template>
