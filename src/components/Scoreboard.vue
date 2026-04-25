<script setup>
defineProps({
    playerScore: Number,
    botScore: Number,
    playerHearts: Number,
    botHearts: Number,
    playerRoundWins: Number,
    botRoundWins: Number,
    currentRound: Number,
    maxRounds: Number,
    turnCount: Number,
    gameState: String
})
</script>

<template>
    <div>
        <!-- Scoreboard (Top Header) -->
        <div v-if="gameState !== 'start' && gameState !== 'matchOver'" class="absolute top-4 left-0 w-full flex justify-between px-4 md:px-8 z-10">
        
        <!-- Player Panel -->
        <div class="glass-panel px-4 md:px-6 py-2 md:py-3 flex flex-col items-center animate-slide-down relative">
            <span class="text-xs md:text-sm text-pink-400 font-bold tracking-widest uppercase mb-1">Player</span>
            <span class="text-3xl md:text-4xl font-black text-white leading-none">{{ playerScore }}<span class="text-lg opacity-50"> pt</span></span>
            <!-- Hearts -->
            <div class="flex gap-1 mt-2 min-h-[16px]">
            <span v-for="i in Math.max(0, playerHearts)" :key="'ph'+i" class="text-xs animate-pulse">💘</span>
            </div>
            <!-- Sets (Round Wins) -->
            <div class="absolute -bottom-6 left-0 w-full flex justify-center gap-1">
            <span v-for="w in playerRoundWins" :key="'pw'+w" class="text-lg animate-bounce shadow-lg">🏆</span>
            </div>
        </div>
        
        <!-- Bot Panel -->
        <div class="glass-panel px-4 md:px-6 py-2 md:py-3 flex flex-col items-center animate-slide-down relative">
            <span class="text-xs md:text-sm text-cyan-400 font-bold tracking-widest uppercase mb-1">Bot</span>
            <span class="text-3xl md:text-4xl font-black text-white leading-none">{{ botScore }}<span class="text-lg opacity-50"> pt</span></span>
            <div class="flex gap-1 mt-2 min-h-[16px]">
            <span v-for="i in Math.max(0, botHearts)" :key="'bh'+i" class="text-xs animate-pulse">💘</span>
            </div>
            <div class="absolute -bottom-6 left-0 w-full flex justify-center gap-1">
            <span v-for="w in botRoundWins" :key="'bw'+w" class="text-lg animate-bounce shadow-lg">💀</span>
            </div>
        </div>
        </div>
        
        <!-- Round and Turn Counter Background -->
        <div v-if="gameState !== 'start' && gameState !== 'matchOver'" class="absolute py-2 top-8 md:top-12 z-0 flex flex-col w-full items-center text-white/20 select-none pointer-events-none w-full">
        <span class="font-black text-3xl md:text-5xl uppercase tracking-widest">GAME {{ currentRound }} / {{ maxRounds }}</span>
        <span class="font-bold text-xl md:text-2xl tracking-[0.2em] mt-2">TURN {{ turnCount }} / 5</span>
        </div>
    </div>
</template>
