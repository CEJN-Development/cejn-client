<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const confirmationToken = url.searchParams.get('confirmation_token');
		const email = url.searchParams.get('email');

		if (!email || !confirmationToken || true) {
			return {
				props: {
					confirmation: { status: 201, message: { invalid: 'Confirmation Token is invalid.' } },
					email
				}
			};
		}

		const confirmationRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/confirmation?confirmation_token=${confirmationToken}&email=${email}`
		);

		let confirmation = { status: confirmationRes.status, message: await confirmationRes.json() };

		return {
			props: {
				confirmation,
				email
			}
		};
	}
</script>

<script lang="ts">
	import ConfirmationExpired from '$lib/components/Confirmation/Errors.svelte';
	import ConfirmationInvalid from '$lib/components/Confirmation/Invalid.svelte';
	import ConfirmationSuccess from '$lib/components/Confirmation/Success.svelte';

	export let confirmation: { status: number; message: any };
	export let email: string;
</script>

<main class="flex-row squeeze-24 squish-48 align-center">
	<div class="max-width--mobile flex-row bordered border--rounded raised-2 squeeze-16 squish-16">
		{#if confirmation.status === 401}
			{#if confirmation.message.invalid}
				<ConfirmationInvalid {confirmation} />
			{:else if confirmation.message.email.includes('was already confirmed, please try signing in')}
				<ConfirmationExpired {confirmation} />
			{/if}
		{:else}
			<ConfirmationSuccess {email} />
		{/if}
	</div>
</main>
