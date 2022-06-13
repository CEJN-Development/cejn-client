<script lang="ts">
	import * as ApiService from '$lib/services/Api';

	let email: string;
	let sent: boolean = false;

	const setPasswordResetToken = async (e) => {
		const { response, json } = await ApiService.post(
			String(import.meta.env.VITE_API_URL),
			'password',
			{
				user: {
					email
				}
			},
			{}
		);

		if (response.ok) {
			sent = true;
		} else {
		}
	};
</script>

<main class="flex-row squeeze-24 squish-48 align-center">
	<div
		class="max-width--mobile flex-row bordered border--rounded raised-2 squeeze-24 squish-24 align-center full-width"
	>
		{#if !sent}
			<form class="flex-row full-width">
				<label for="email" class="text-small text-style-metadata text-style-italic">Email</label>
				<input type="email" name="email" class="stack-16 squeeze-8 squish-8" bind:value={email} />
				<div class="flex-row full-width align-center stack-8">
					<button
						class="panel button squeeze-24 raised-1"
						on:click|preventDefault={setPasswordResetToken}
						disabled={!email}
					>
						Send reset instructions
					</button>
				</div>
			</form>
		{:else}
			Password reset instructions have been sent to {email}. Please check your inbox for the next
			steps.
		{/if}
	</div>
</main>
