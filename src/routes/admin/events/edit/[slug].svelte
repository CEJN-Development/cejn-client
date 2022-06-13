<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const eventRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/events/${params.slug}`);
		if (!eventRes.ok)
			return {
				status: eventRes.status,
				error: new Error('Could not load event')
			};

		let event: EventType = await eventRes.json();

		return {
			props: {
				event
			}
		};
	}
</script>

<script lang="ts">
	import EventForm from '$lib/components/admin/Events/EventForm.svelte';
	import type { EventType } from '$lib/types/Events';

	export let event: EventType;
</script>

<main class="squish-24 squeeze-24">
	<h1 class="stack-24">Our Events | Edit</h1>
	<EventForm {event} />
</main>
