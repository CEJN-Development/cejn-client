<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { logOut } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import type { EventType } from '$lib/types/Events';
	import { getLocaleString, truncateWithEllipses } from '$lib/helpers';
	import Icon from '$lib/components/shared/Icon.svelte';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';

	export let event: EventType;

	let description: string;
	let createdDate: string;

	const dispatch = createEventDispatcher();

	const deleteEvent = async (e) => {
		if (confirm('Are you sure you want to delete this event?')) {
			const { response } = await ApiService.del(
				String(import.meta.env.VITE_API_URL),
				`admin/events/${event.id}`,
				{ creds: true },
				{ aud: $aud }
			);

			if (response.status == 401) logOut();

			if (response.ok) {
				FlashMessageService.setMessage({
					message: 'Event successfully deleted!',
					type: 'success'
				});
				dispatch('eventDeleted', event);
			} else {
				FlashMessageService.setMessage({
					message: 'Unexpected error. If it persists contact support.',
					type: 'error'
				});
			}
		}
	};

	$: {
		description = truncateWithEllipses(event?.description, 300);
		createdDate = getLocaleString(new Date(event.created_at));
	}
</script>

<div class="card squeeze-16 squish-16">
	<div class="gap-16 stack-8 height-100">
		<div class="flex-row">
			<div class="image">
				<CloudinaryImage
					cloudinaryImageUrl={event.cloudinary_image_url}
					options={{ height: 405, width: 720, crop: 'fill_pad' }}
					classes="stack-8 border--rounded-16"
				/>
			</div>
		</div>
		<div class="stack-8">
			<div class="text-strong text-normal stack-8">
				{event.name}
			</div>
			<div class="text-thin text-small stack-8">
				<span class="text-style-italic">Added on:</span>
				{createdDate}
			</div>
			<div class="text-medium text-normal stack-16">
				{@html description}
			</div>
		</div>
	</div>
	<div class="squeeze-16 flex-column space-between">
		<a href={`/admin/events/edit/${event.id}`}>
			<Icon name="edit" />
		</a>
		<span class="cursor-pointer" on:click={deleteEvent}>
			<Icon name="delete" />
		</span>
	</div>
</div>

<style>
	.image {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
</style>
