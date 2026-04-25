<script setup>
import { getWeaponIcon, getElementIcon, getElementColor } from '../utils/gameData'

defineProps({
    gameState: String,
    playerChoice: Object,
    botChoice: Object,
    currentRoundLog: Object,
    turnCount: Number
})

defineEmits(['next'])
</script>

<template>
    <div class="flex flex-col items-center w-full h-full justify-center relative z-10">
        
        <!-- VS Background text -->
        <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none text-[35vw] font-black italic">
        VS
        </div>

        <div class="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-4 md:gap-16 pt-16 md:pt-0">
        
        <!-- Player Side -->
        <div class="flex flex-col items-center animate-slide-up" style="animation-duration: 0.5s">
            <div class="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center mb-4 md:mb-8">
            <div :class="['absolute inset-0 rounded-full blur-[50px] opacity-60 animate-pulse-glow', getElementColor(playerChoice.element)]"></div>
            <span class="text-[100px] md:text-[180px] relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-500" :class="{'animate-shake': gameState === 'fighting', 'scale-110': gameState === 'result' && currentRoundLog?.wResult === 1}">
                {{ getWeaponIcon(playerChoice.weapon) }}
            </span>
            <span class="absolute -bottom-4 -right-4 md:bottom-0 md:right-0 text-5xl md:text-6xl bg-slate-800/80 backdrop-blur-md rounded-full p-3 border-2 border-white/20 shadow-2xl z-20 hover:scale-110 transition-transform">
                {{ getElementIcon(playerChoice.element) }}
            </span>
            </div>
            <h3 class="text-3xl font-black text-pink-400 tracking-widest drop-shadow-md">YOU</h3>
        </div>

        <!-- Center Results -->
        <div class="flex flex-col items-center shrink-0 w-64 md:w-80 my-4 md:my-0 h-[220px] justify-center" :class="{'opacity-0 transition-opacity': gameState === 'fighting', 'animate-pop-in': gameState === 'result'}">
            <div v-if="gameState === 'result'" class="flex flex-col items-center space-y-4 w-full">
            
            <!-- Banner Alert -->
            <div class="bg-linear-to-r w-full py-4 px-2 rounded-xl text-center shadow-xl border" :class="currentRoundLog?.pPts > 0 && currentRoundLog?.pPts >= currentRoundLog?.bPts ? 'from-green-600 to-emerald-800 border-green-400' : currentRoundLog?.bPts > 0 ? 'from-red-600 to-rose-800 border-red-400' : 'from-gray-700 to-slate-800 border-gray-500'">
                <p class="font-black text-sm md:text-base tracking-widest text-white drop-shadow-md pb-1 uppercase">
                    {{ currentRoundLog?.bonusMsg }}
                </p>
                <!-- Score awarded -->
                <div class="flex justify-center gap-6 mt-1 opacity-80 font-bold text-xs">
                    <span>YOU: +{{ currentRoundLog?.pPts }}</span>
                    <span>BOT: +{{ currentRoundLog?.bPts }}</span>
                </div>
            </div>
            
            <!-- Next Turn/Round Button -->
            <button @click="$emit('next')" class="mt-4 w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xl hover:bg-gray-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 uppercase tracking-widest">
                {{ turnCount < 5 ? 'NEXT TURN 👉' : 'FINISH ROUND 🏆' }}
            </button>
            </div>
            
            <div v-if="gameState === 'fighting'" class="absolute">
            <span class="text-6xl md:text-8xl font-black text-white/20 animate-pulse italic drop-shadow-xl">VS</span>
            </div>
        </div>

        <!-- Bot Side -->
        <div class="flex flex-col items-center animate-slide-up" style="animation-duration: 0.5s">
            <div class="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center mb-4 md:mb-8">
            <template v-if="gameState === 'fighting'">
                <div class="absolute inset-0 rounded-full bg-slate-800/80 blur-2xl animate-pulse"></div>
                <span class="text-[100px] md:text-[180px] relative z-10 animate-shake opacity-70">❓</span>
            </template>
            <template v-else>
                <div :class="['absolute inset-0 rounded-full blur-[50px] opacity-60 animate-pulse-glow', getElementColor(botChoice.element)]"></div>
                <span class="text-[100px] md:text-[180px] relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-500" :class="{'scale-110': currentRoundLog?.wResult === -1}">
                    {{ getWeaponIcon(botChoice.weapon) }}
                </span>
                <span class="absolute -bottom-4 -left-4 md:bottom-0 md:left-0 text-5xl md:text-6xl bg-slate-800/80 backdrop-blur-md rounded-full p-3 border-2 border-white/20 shadow-2xl z-20 hover:scale-110 transition-transform">
                {{ getElementIcon(botChoice.element) }}
                </span>
            </template>
            </div>
            <h3 class="text-3xl font-black text-cyan-400 tracking-widest drop-shadow-md">BOT</h3>
        </div>

        </div>
    </div>
</template>
