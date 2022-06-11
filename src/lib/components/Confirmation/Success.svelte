<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as ApiService from '$lib/services/Api';
	import { onMount } from 'svelte';
	import { getSearchParamsString } from '$lib/helpers';

	export let email: string;

	let searchParams = {};

	const getPasswordResetToken = async () => {
		const { response, json } = await ApiService.post(
			String(import.meta.env.VITE_API_URL),
			'users/set_password',
			{
				user: {
					...searchParams
				}
			},
			{}
		);

		if (response.ok) {
			goto(`password/set?${getSearchParamsString(json)}`, { replaceState: true });
		}
	};

	onMount(() => {
		for (const [key, value] of $page.url.searchParams) {
			searchParams[key] = value;
		}
	});
</script>

<p>Congratulations!</p>
<p>You have successfully confirmed {email}!</p>
<p class="stack-16">You can now set your password and start logging in</p>
<button class="button button-primary text-strong flex-row" on:click={getPasswordResetToken}>
	Set your password
</button>
