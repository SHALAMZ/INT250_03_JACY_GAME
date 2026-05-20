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

function selectWeapon(wId) {
	playerChoice.value.weapon = wId;
	if (wId === "heart") {
		playerHearts.value--;
	}
	gameState.value = "selectElement";
}

function selectElement(eId) {
	playerChoice.value.element = eId;
	generateBotChoice();
	gameState.value = "fighting";

	setTimeout(() => {
		calculateResult();
	}, 1500);
}

function generateBotChoice() {
	let availableWeapons = ["rock", "paper", "scissors"];
	if (botHearts.value > 0) {
		if (Math.random() < 0.25) {
			// 25% chance to use heart
			availableWeapons.push("heart");
		}
	}
	let bW =
		availableWeapons[Math.floor(Math.random() * availableWeapons.length)];
	if (bW === "heart") {
		botHearts.value--;
	}

	let bE = elements[Math.floor(Math.random() * elements.length)].id;
	botChoice.value = { weapon: bW, element: bE };
}

function beatsWeapon(w1, w2) {
	if (w1 === w2) return 0;
	if (w1 === "heart") return 1;
	if (w2 === "heart") return -1;
	if (w1 === "rock" && w2 === "scissors") return 1;
	if (w1 === "scissors" && w2 === "paper") return 1;
	if (w1 === "paper" && w2 === "rock") return 1;
	return -1;
}

function beatsElement(e1, e2) {
	if (e1 === e2) return 0;

	// Element Cycle: Wind > Earth > Water > Fire > Wind
	if (e1 === "earth" && e2 === "water") return 1;
	if (e1 === "water" && e2 === "fire") return 1;
	if (e1 === "fire" && e2 === "wind") return 1;
	if (e1 === "wind" && e2 === "earth") return 1;

	if (e2 === "earth" && e1 === "water") return -1;
	if (e2 === "water" && e1 === "fire") return -1;
	if (e2 === "fire" && e1 === "wind") return -1;
	if (e2 === "wind" && e1 === "earth") return -1;

	// Opposites (Earth vs Fire, Water vs Wind)
	return 0;
}

function calculateResult() {
	const wResult = beatsWeapon(
		playerChoice.value.weapon,
		botChoice.value.weapon,
	);
	const eResult = beatsElement(
		playerChoice.value.element,
		botChoice.value.element,
	);

	let pPts = 0;
	let bPts = 0;
	let msg = "";

	if (wResult === 1) {
		// Player wins weapon
		if (eResult === 1) {
			pPts = 3;
			msg = "PERFECT STRIKE! (Weapon+Element) +3 🏆";
		} else {
			pPts = 1;
			msg = "WEAPON WIN! +1 ⚔️";
		}
	} else if (wResult === -1) {
		// Bot wins weapon
		if (eResult === -1) {
			bPts = 3;
			msg = "CRITICAL HIT BY BOT! (Weapon+Element) +3 💥";
		} else {
			bPts = 1;
			msg = "BOT WINS WEAPON! +1 🛡️";
		}
	} else if (wResult === 0) {
		// Tie weapon
		if (eResult === 1) {
			pPts = 1;
			msg = "TIE BREAKER! Element Advantage +1 ✨";
		} else if (eResult === -1) {
			bPts = 1;
			msg = "BOT TIE BREAKER! Element Advantage +1 💢";
		} else {
			msg = "ABSOLUTE TIE! No points ⚖️";
		}
	}

	playerScore.value += pPts;
	botScore.value += bPts;

	currentRoundLog.value = {
		wResult,
		eResult,
		pPts,
		bPts,
		bonusMsg: msg,
	};

	gameState.value = "result";
}

function nextTurn() {
	if (turnCount.value < 5) {
		// Up to 5 turns (clashes) per round
		turnCount.value++;
		playerChoice.value = { weapon: null, element: null };
		botChoice.value = { weapon: null, element: null };
		gameState.value = "selectWeapon";
		console.log(gameState.value);
	} else {
		// Round calculation
		if (playerScore.value > botScore.value) {
			playerRoundWins.value++;
		} else if (botScore.value > playerScore.value) {
			botRoundWins.value++;
		}

		// Check match over
		if (
			playerRoundWins.value >= requiredWins.value ||
			botRoundWins.value >= requiredWins.value ||
			currentRound.value >= maxRounds.value
		) {
			gameState.value = "matchOver";
		} else {
			gameState.value = "roundOver";
		}
		console.log(gameState.value);
	}
}

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
		class="h-dvh w-screen flex flex-col items-center justify-center relative"
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
		<StartScreen v-if="gameState === 'start'" @start="startGame" />

		<!-- Select Weapon -->
		<WeaponSelection
			v-if="gameState === 'selectWeapon'"
			:player-hearts="playerHearts"
			@select="selectWeapon"
		/>

		<!-- Select Element -->
		<ElementSelection
			v-if="gameState === 'selectElement'"
			@select="selectElement"
		/>

		<!-- Fighting / Result -->
		<BattleArena
			v-if="gameState === 'fighting' || gameState === 'result'"
			:game-state="gameState"
			:player-choice="playerChoice"
			:bot-choice="botChoice"
			:current-round-log="currentRoundLog"
			:turn-count="turnCount"
			@next="nextTurn"
		/>

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
