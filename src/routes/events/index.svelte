<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const eventsRes = await fetch(`${import.meta.env.VITE_API_URL}/events`);
		if (!eventsRes.ok)
			return {
				status: eventsRes.status,
				error: new Error('Could not load press releases')
			};

		let events: EventType[] = await eventsRes.json();

		return {
			props: {
				events
			}
		};
	}
</script>

<script lang="ts">
	import type { EventType } from '$lib/types/Events';

	export let events: EventType[];

	let hasEvents: boolean = false;
	let pastEvents: EventType[] = [];
	let upcomingEvents: EventType[] = [];

	const organizeEvents = (eventsList: EventType[]) => {
		const currentDate = new Date(Date.now());

		eventsList.forEach((event: EventType) => {
			if (new Date(event.date) > currentDate) {
				upcomingEvents = [...upcomingEvents, event];
			} else {
				pastEvents = [...pastEvents, event];
			}
		});
	};

	$: {
		hasEvents = !!events.length;
		organizeEvents(events);
	}
</script>

<svelte:head>
	<title>Our Events</title>
</svelte:head>

<hr class="separator stack-48" />

<section class="flex-row stack-48 align-center">
	<h1 class="flex-row stack-24 text-large">Our Events</h1>
	{#if hasEvents}
		{JSON.stringify(events)}
	{:else}
		There are currently no events listed. Please check back again later.
	{/if}
</section>
