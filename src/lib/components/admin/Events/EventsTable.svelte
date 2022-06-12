<script lang="ts">
	import type { EventType } from '$lib/types/Events';
	import Card from './Card.svelte';

	export let events: EventType[] = [];

	const removeEvent = (e) => {
		events = events.filter((event) => event.id != e.detail.id);
	};
</script>

<section>
	{#each events as event}
		<Card {event} on:eventDeleted={removeEvent} />
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-gap: 1rem;
	}

	@media screen and (min-width: 900px) {
		section {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
