<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const eventsRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/events`);
		if (!eventsRes.ok)
			return {
				status: eventsRes.status,
				error: new Error('Could not load events')
			};

		let events = await eventsRes.json();

		return {
			props: {
				events
			}
		};
	}
</script>

<script lang="ts">
	// import EventsTable from '$lib/components/admin/Events/EventsTable.svelte';
	// import type { EventType } from '$lib/types/Events';

	// export let events: EventType[];

	export let events;

	console.log(events);
</script>

<svelte:head>
	<title>Admin | Our Events</title>
</svelte:head>

<main class="squeeze-24 squish-24">
	<a href="/admin/events/new" class="button panel">New Event</a>
	<h1 class="stack-24">Our Events</h1>
	<!-- <EventsTable {events} /> -->
</main>

<style>
	a {
		float: right;
	}

	a:hover {
		text-decoration: none;
	}
</style>
