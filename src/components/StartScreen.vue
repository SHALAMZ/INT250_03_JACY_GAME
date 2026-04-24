<script setup>
defineEmits(['start'])
</script>

<template>
    <div class="flex flex-col items-center z-20">
        <div class="text-6xl md:text-8xl mb-8 flex gap-2 md:gap-6">
        <span class="origin-bottom-right -rotate-12 transform drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">✊</span>
        <span class="origin-bottom transform rotate-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">✋</span>
        <span class="origin-bottom-left transform -rotate-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">✌️</span>
        <span class="origin-bottom transform rotate-12 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">💘</span>
        </div>
        <h1 class="text-5xl md:text-8xl font-black mb-6 text-center leading-tight drop-shadow-2xl">
        <span class="text-gradient">ELEMENTAL</span><br/>
        <span class="text-4xl md:text-6xl text-gray-200">RPS CLASH</span>
        </h1>

        <p class="text-gray-300 text-center max-w-lg mb-8 text-sm md:text-base">
        <strong>กฏแต้ม (1 Round = 5 Turns):</strong>
        <br/>
        เป่าชนะ = 1 แต้ม, เสมอแต่ธาตุชนะ = 1 แต้ม, เป่าชนะ + ธาตุชนะ = 3 แต้ม 🔥
        <br/><br/>
        <strong>วัฏจักรธาตุ:</strong> ลม ชนะ ดิน > น้ำ > ไฟ > ลม
        </p>

        <h3 class="text-xl font-black mb-4 text-pink-300 uppercase tracking-widest">Select Rounds</h3>
        <div class="flex flex-col md:flex-row gap-4">
        <button @click="$emit('start', 1)" class="group px-8 py-4 glass-panel transition-all active:scale-95 border border-white/10">
            <div class="font-black text-xl">Best of 1</div><div class="text-xs text-gray-400">Quick Match</div>
        </button>
        <button @click="$emit('start', 3)" class="group px-8 py-4 glass-panel bg-linear-to-br from-pink-500/20 to-indigo-600/20 transition-all active:scale-95 border border-white/10">
            <div class="font-black text-xl">Best of 3</div><div class="text-xs text-pink-200">Standard Match</div>
        </button>
        <button @click="$emit('start', 5)" class="group px-8 py-4 glass-panel transition-all active:scale-95 border border-white/10">
            <div class="font-black text-xl">Best of 5</div><div class="text-xs text-gray-400">Epic Showdown</div>
        </button>
        </div>
    </div>
</template>
