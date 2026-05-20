<script setup>
defineProps({
    currentRound: Number,
    playerScore: Number,
    botScore: Number
})
defineEmits(['nextRound'])
</script>

<template>
    <div class="flex flex-col items-center w-full p-6 z-20 mt-10 animate-pop-in">
        <span class="text-xl text-gray-400 tracking-[0.3em] uppercase mb-4">Round {{ currentRound }} Finished</span>
        
        <h2 class="text-6xl md:text-8xl font-black mb-8 text-transparent bg-clip-text pb-2 px-4" :class="playerScore > botScore ? 'bg-linear-to-r from-pink-400 to-orange-400' : playerScore < botScore ? 'bg-linear-to-r from-cyan-400 to-indigo-400' : 'bg-linear-to-r from-gray-300 to-gray-500'">
        {{ playerScore > botScore ? 'WINNER!' : playerScore < botScore ? 'DEFEATED' : 'DRAW' }}
        </h2>
        
        <div class="glass-panel p-8 md:p-12 w-full max-w-2xl flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 rounded-3xl mb-8 border border-white/20 shadow-2xl">
        <div class="flex flex-col items-center">
            <span class="text-pink-400 font-bold uppercase tracking-widest text-lg md:text-xl">Your Score</span>
            <span class="text-6xl md:text-8xl font-black mt-2">{{ playerScore }}</span>
        </div>
        <div class="text-4xl font-black text-gray-500">—</div>
        <div class="flex flex-col items-center">
            <span class="text-cyan-400 font-bold uppercase tracking-widest text-lg md:text-xl">Bot Score</span>
            <span class="text-6xl md:text-8xl font-black mt-2">{{ botScore }}</span>
        </div>
        </div>

        <button @click="$emit('nextRound')" class="px-12 py-5 bg-white text-slate-900 rounded-full font-black text-2xl hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 uppercase tracking-widest">
        START ROUND {{ currentRound + 1 }}
        </button>
    </div>
</template>
