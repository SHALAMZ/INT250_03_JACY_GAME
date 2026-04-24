<script setup>
// Import Components
import Scoreboard from "./components/Scoreboard.vue";
import StartScreen from "./components/StartScreen.vue";
import WeaponSelection from "./components/WeaponSelection.vue";
import ElementSelection from "./components/ElementSelection.vue";
import BattleArena from "./components/BattleArena.vue";
import RoundOverScreen from "./components/RoundOverScreen.vue";
import MatchOverScreen from "./components/MatchOverScreen.vue";
</script>

<template>
	<div
		class="h-dvh w-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
	>
		<!-- Permanent Scoreboard -->
		<Scoreboard />

		<!-- Start Screen -->
		<StartScreen />

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
