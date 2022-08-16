<script lang="ts">
	import { getLocaleString } from '$lib/helpers';
	import type { EventType } from '$lib/types/Events';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';
	import Base64Image from '../shared/Base64Image.svelte';

	export let event: EventType;
	export let previewPhoto: string | ArrayBuffer = null;

	let eventDate: string = null;
	let hasPhoto: boolean = false;

	$: {
		eventDate = getLocaleString(new Date(event.date));
		hasPhoto = !!event?.cloudinary_image_url || !!previewPhoto;
	}
</script>

{#if hasPhoto}
	<div class="text-strong text-large stack-8 flex-row align-center">
		Upcoming: {event.name}
	</div>
	<div class="text-normal text-large stack-16 flex-row align-center">
		On: {eventDate}
	</div>
	<div class="stack-16">
		{#if !!previewPhoto}
			<Base64Image photo={previewPhoto} />
		{:else}
			<CloudinaryImage
				cloudinaryImageUrl={event.cloudinary_image_url}
				options={{ height: 720, width: 1280, crop: 'fill' }}
			/>
		{/if}
	</div>
	<div class="stack-24">
		{event.description}
	</div>
	<div class="stack-48">
		<a href="/events">See all events</a>
	</div>
{/if}
