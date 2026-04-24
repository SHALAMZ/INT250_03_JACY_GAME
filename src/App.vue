<script setup>
import { ref, computed } from "vue";

// Import Data & Utils
import { elements } from "./utils/gameData";

// Import Components
import Scoreboard from "./components/Scoreboard.vue";
import StartScreen from "./components/StartScreen.vue";
import WeaponSelection from "./components/WeaponSelection.vue";
import ElementSelection from "./components/ElementSelection.vue";
import BattleArena from "./components/BattleArena.vue";
import RoundOverScreen from "./components/RoundOverScreen.vue";
import MatchOverScreen from "./components/MatchOverScreen.vue";

// Global State
const gameState = ref("start"); // start, selectWeapon, selectElement, fighting, result, roundOver, matchOver

// Match configuration
const maxRounds = ref(1); // 1, 3, or 5
const requiredWins = computed(() => Math.ceil(maxRounds.value / 2));
const currentRound = ref(1);
const turnCount = ref(1); // 1 to 5 per round

// Overall Points (Set Wins)
const playerRoundWins = ref(0);
const botRoundWins = ref(0);

// Round Points (Turn Score)
const playerScore = ref(0);
const botScore = ref(0);

const playerHearts = ref(1);
const botHearts = ref(1);

const playerChoice = ref({ weapon: null, element: null });
const botChoice = ref({ weapon: null, element: null });

const currentRoundLog = ref(null);

// Game Logic Methods
function startGame(rounds) {
	maxRounds.value = rounds;
	currentRound.value = 1;
	turnCount.value = 1;
	playerRoundWins.value = 0;
	botRoundWins.value = 0;
	playerScore.value = 0;
	botScore.value = 0;
	playerHearts.value = 1; // 1 per full match
	botHearts.value = 1;
	gameState.value = "selectWeapon";
}
</script>

<template>
	<div
		class="h-dvh w-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
	>
		<!-- Permanent Scoreboard -->
		<Scoreboard />

		<!-- Start Screen -->
		<StartScreen v-if="gameState === 'start'" @start="startGame" />

		<!-- Select Weapon -->
		<WeaponSelection />

		<!-- Select Element -->
		<ElementSelection />

		<!-- Fighting / Result -->
		<BattleArena />

		<!-- Round Over -->
		<RoundOverScreen />

		<!-- Match Over -->
		<MatchOverScreen />
	</div>
</template>
