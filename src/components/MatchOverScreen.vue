<script setup>
defineProps({
    playerRoundWins: Number,
    botRoundWins: Number,
    requiredWins: Number
})

defineEmits(['playAgain'])
</script>

<template>
    <div class="flex flex-col items-center w-full p-6 z-30 inset-0 absolute bg-slate-900/90 backdrop-blur-xl justify-center animate-pop-in">

        <span class="text-xl md:text-2xl text-pink-300 tracking-[0.5em] uppercase mb-6 animate-pulse">Match Concluded</span>

        <h2 class="text-7xl md:text-[150px] font-black mb-12 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        {{ playerRoundWins > botRoundWins ? 'VICTORY 🏆' : playerRoundWins < botRoundWins ? 'DEFEAT 💀' : 'DRAW 🤝' }}
        </h2>

        <div class="flex gap-8 md:gap-16 mb-12">
        <div class="flex flex-col items-center">
            <span class="text-pink-400 font-black tracking-widest text-xl md:text-2xl uppercase">Player Sets</span>
            <div class="mt-4 flex gap-2">
            <span v-for="i in requiredWins" :key="i" class="w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2" :class="i <= playerRoundWins ? 'bg-pink-500 border-white shadow-[0_0_20px_rgba(236,72,153,0.8)]' : 'border-gray-600 bg-transparent opacity-20'">🏆</span>
            </div>
        </div>

        <div class="flex flex-col items-center">
            <span class="text-cyan-400 font-black tracking-widest text-xl md:text-2xl uppercase">Bot Sets</span>
            <div class="mt-4 flex gap-2">
            <span v-for="i in requiredWins" :key="i" class="w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2" :class="i <= botRoundWins ? 'bg-cyan-500 border-white shadow-[0_0_20px_rgba(6,182,212,0.8)]' : 'border-gray-600 bg-transparent opacity-20'">💀</span>
            </div>
        </div>
        </div>

        <button @click="$emit('playAgain')" class="group px-12 py-5 bg-linear-to-r from-pink-500 to-indigo-600 rounded-full font-black text-2xl uppercase tracking-widest shadow-[0_0_40px_rgba(236,72,153,0.6)] overflow-hidden transition-all hover:scale-105 active:scale-95 text-white border-2 border-white/50">
        PLAY AGAIN
        </button>

    </div>
</template>
