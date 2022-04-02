<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { logOut } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import type { PressReleaseType } from '$lib/types/PressReleases';
	import { getLocaleString } from '$lib/helpers';
	import Icon from '$lib/components/shared/Icon.svelte';

	export let pressRelease: PressReleaseType;

	let publishedDate: string;

	const dispatch = createEventDispatcher();

	const deletePressRelease = async (e) => {
		if (confirm('Are you sure you want to delete this pressRelease?')) {
			const { response } = await ApiService.del(
				String(import.meta.env.VITE_API_URL),
				`admin/press_releases/${pressRelease.id}`,
				{ creds: true },
				{ aud: $aud }
			);

			if (response.status == 401) logOut();

			if (response.ok) {
				FlashMessageService.setMessage({
					message: 'Press Release successfully deleted!',
					type: 'success'
				});
				dispatch('pressReleaseDeleted', pressRelease);
			} else {
				FlashMessageService.setMessage({
					message: 'Unexpected error. If it persists contact support.',
					type: 'error'
				});
			}
		}
	};

	$: {
		publishedDate = getLocaleString(new Date(pressRelease.created_at));
	}
</script>

<div class="card squish-16">
	<div class="squeeze-16 stack-8">
		<div class="text-strong text-normal stack-8">
			{pressRelease.title}
		</div>
		<div class="text-thin text-small stack-8">
			<span class="text-style-italic">On:</span>
			{publishedDate}
		</div>
		<div class="text-medium text-normal stack-16">
			{pressRelease.summary}
		</div>
	</div>
	<div class="squeeze-16 flex-column space-between">
		<a href={`/admin/press_releases/edit/${pressRelease.id}`}>
			<Icon name="edit" />
		</a>
		<span class="cursor-pointer" on:click={deletePressRelease}>
			<Icon name="delete" />
		</span>
	</div>
</div>
