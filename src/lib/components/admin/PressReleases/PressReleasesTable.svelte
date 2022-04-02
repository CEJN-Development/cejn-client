<script lang="ts">
	import type { PressReleaseType } from '$lib/types/PressReleases';
	import Card from './Card.svelte';

	export let pressReleases: PressReleaseType[] = [];

	const removePressRelease = (e) => {
		pressReleases = pressReleases.filter((pressRelease) => pressRelease.id != e.detail.id);
	};
</script>

<section>
	{#each pressReleases as pressRelease}
		<Card {pressRelease} on:pressReleaseDeleted={removePressRelease} />
	{/each}
</section>

<style>
	section {
		max-width: fit-content;
		display: grid;
		grid-gap: 1rem;
	}

	@media screen and (min-width: 700px) {
		section {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (min-width: 900px) {
		section {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
