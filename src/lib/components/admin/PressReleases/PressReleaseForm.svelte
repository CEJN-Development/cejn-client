<script lang="ts">
	import { goto } from '$app/navigation';
	import { logOut } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import type { PressRelease, PressReleaseUpdate } from '$lib/types/PressReleases';
	import Spinner from '$lib/components/shared/Spinner.svelte';

	export let pressRelease: PressRelease = null;

	let body: string;
	let exisitingPressRelease: boolean = false;
	let submitting: boolean = false;
	let summary: string;
	let title: string = null;

	const submit = async () => {
		submitting = true;

		let data: PressReleaseUpdate = {
			body,
			summary,
			title
		};

		const { response, json } = await ApiService.post(
			String(import.meta.env.VITE_API_URL),
			'admin/press_releases',
			{ press_release: data, creds: true },
			{ aud: $aud }
		);

		if (response.status == 401) logOut();

		if (response.ok) {
			submitting = false;
			goto('/admin/press_releases', { replaceState: false });
			FlashMessageService.setMessage({
				message: 'Press Release successfully created!',
				type: 'success'
			});
		} else {
			submitting = false;
			if (response.status == 422) {
				json.messages.forEach((message: string) =>
					FlashMessageService.setMessage({
						message,
						type: 'error'
					})
				);
			} else {
				FlashMessageService.setMessage({
					message: 'An unexpected error occurred. If it persists, contact support.',
					type: 'error'
				});
			}
		}
	};

	const update = async () => {
		submitting = true;

		let data: PressReleaseUpdate = {
			summary,
			body,
			title
		};

		const { response, json } = await ApiService.put(
			String(import.meta.env.VITE_API_URL),
			`admin/press_releases/${pressRelease.id}`,
			{ press_release: data, creds: true },
			{ aud: $aud }
		);

		if (response.status == 401) logOut();

		if (response.ok) {
			submitting = false;
			goto('/admin/press_releases', { replaceState: false });
			FlashMessageService.setMessage({
				message: 'Press Release successfully updated!',
				type: 'success'
			});
		} else {
			submitting = false;
			if (response.status == 422) {
				json.messages.forEach((message: string) =>
					FlashMessageService.setMessage({
						message,
						type: 'error'
					})
				);
			} else {
				FlashMessageService.setMessage({
					message: 'An unexpected error occurred. If it persists, contact support.',
					type: 'error'
				});
			}
		}
	};

	if (pressRelease) {
		body = pressRelease.body;
		summary = pressRelease.summary;
		title = pressRelease.title;
	}

	$: {
		exisitingPressRelease = !!pressRelease?.id;
	}
</script>

<form class="squish-24 squeeze-32 flex-row">
	<label for="title" class="text-small text-style-metadata text-style-italic">Title</label>
	<input title="title" type="text" class="stack-16 squeeze-8 squish-8" bind:value={title} />
	<label for="summary" class="text-small text-style-metadata text-style-italic">Summary</label>
	<textarea
		title="summary"
		class="stack-16 squeeze-8 squish-8 text-medium text-normal"
		rows="5"
		bind:value={summary}
	/>
	<label for="body" class="text-small text-style-metadata text-style-italic">Body</label>
	<textarea
		title="body"
		class="stack-16 squeeze-8 squish-8 text-medium text-normal"
		rows="15"
		bind:value={body}
	/>
	<div>
		{#if exisitingPressRelease}
			<button
				class="panel button spread-8"
				disabled={submitting}
				type="submit"
				on:click|preventDefault={update}
			>
				{#if submitting}
					<Spinner />
				{:else}
					Update
				{/if}
			</button>
		{:else}
			<button
				class="panel button spread-8"
				disabled={submitting}
				type="submit"
				on:click|preventDefault={submit}
			>
				{#if submitting}
					<Spinner />
				{:else}
					Save
				{/if}
			</button>
		{/if}
		<a href="/admin/press_releases">Cancel</a>
	</div>
</form>