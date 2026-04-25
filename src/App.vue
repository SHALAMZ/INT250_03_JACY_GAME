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
const gameState = ref("matchOver"); // start, selectWeapon, selectElement, fighting, result, roundOver, matchOver

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

function startNextRound() {
	currentRound.value++;
	turnCount.value = 1;
	playerScore.value = 0;
	botScore.value = 0;

	playerChoice.value = { weapon: null, element: null };
	botChoice.value = { weapon: null, element: null };
	gameState.value = "selectWeapon";
	console.log(gameState.value);
}
</script>

<template>
	<div
		class="h-dvh w-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
	>
		<!-- Permanent Scoreboard -->
		<Scoreboard
			:player-score="playerScore"
			:bot-score="botScore"
			:player-hearts="playerHearts"
			:bot-hearts="botHearts"
			:player-round-wins="playerRoundWins"
			:bot-round-wins="botRoundWins"
			:current-round="currentRound"
			:max-rounds="maxRounds"
			:turn-count="turnCount"
			:game-state="gameState"
		/>

		<!-- Start Screen -->
		<StartScreen />

		<!-- Select Weapon -->
		<WeaponSelection />

		<!-- Select Element -->
		<ElementSelection />

		<!-- Fighting / Result -->
		<BattleArena />

		<!-- Round Over -->
		<RoundOverScreen
			v-if="gameState === 'roundOver'"
			:current-round="currentRound"
			:player-score="playerScore"
			:bot-score="botScore"
			@next-round="startNextRound"
		/>

		<!-- Match Over -->
		<MatchOverScreen
			v-if="gameState === 'matchOver'"
			:player-round-wins="playerRoundWins"
			:bot-round-wins="botRoundWins"
			:required-wins="requiredWins"
			@play-again="gameState = 'start'"
		/>
	</div>
</template>
