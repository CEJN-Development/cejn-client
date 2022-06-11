<script lang="ts">
	import { goto } from '$app/navigation';
	import { logOut } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import type { MemberType } from '$lib/types/TeamTypes';

	export let member: MemberType = null;

	let email: string = null;
	let fullName: string = null;
	let submitting: boolean = false;

	const submit = async () => {
		submitting = true;

		let data = {
			email,
			full_name: fullName
		};

		const { response, json } = await ApiService.post(
			String(import.meta.env.VITE_API_URL),
			'',
			{ user: data, creds: true },
			{ aud: $aud }
		);

		if (response.status == 401) logOut();

		if (response.ok) {
			submitting = false;
			goto('/admin/team', { replaceState: false });
			FlashMessageService.setMessage({ message: 'Writer successfully created!', type: 'success' });
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

	const update = () => {};
</script>

<form class="flex-row form">
	<label for="full_name" class="text-small text-style-metadata text-style-italic">Full name</label>
	<input name="full_name" type="text" class="stack-16 squeeze-8 squish-8" bind:value={fullName} />
	<label for="email" class="text-small text-style-metadata text-style-italic">Email</label>
	<input name="email" type="email" class="stack-16 squeeze-8 squish-8" bind:value={email} />

	<div>
		{#if member?.id}
			<button class="panel button spread-8" type="submit" on:click|preventDefault={update}>
				Update
			</button>
		{:else}
			<button class="panel button spread-8" type="submit" on:click|preventDefault={submit}>
				Save
			</button>
		{/if}
		<a href="/admin/team">Cancel</a>
	</div>
</form>
