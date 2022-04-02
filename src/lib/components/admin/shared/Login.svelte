<script lang="ts">
	import { aud, ip, os, browser } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import { user } from '$lib/stores/UserStore';

	let email: string,
		password: string,
		submitting: boolean = false,
		errors = [];

	const attemptLogin = async () => {
		submitting = true;

		try {
			const jsResponse = await fetch('https://ipv4.jsonip.com/');
			const jsip = await jsResponse.json();
			ip.set(jsip.ip);
		} catch (error) {
			console.error(error);
		}

		const { response, json } = await ApiService.post(
			String(import.meta.env.VITE_API_URL),
			'login',
			{
				user: { email, password },
				browser: $browser,
				ip: $ip,
				os: $os,
				creds: true
			},
			{ aud: $aud }
		);

		if (response.status === 200) {
			user.set(json);
			window.location.href = '/admin';
		} else if (response.status === 401) {
			json.error ? (errors = [...errors, json.error]) : (errors = [...errors, 'Error.']);
		} else if (response.status === 500) {
			errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
		}

		submitting = false;
	};
</script>

<form class="flex-row squeeze-32 squish-32 card">
	<label for="email" class="text-small text-style-metadata text-style-italic"> Email </label>
	<input type="email" name="email" class="stack-16 squeeze-8 squish-8" bind:value={email} />
	<label for="password" class="text-small text-style-metadata text-style-italic"> Password </label>
	<input
		type="password"
		name="password"
		class="stack-16 squeeze-8 squish-8"
		bind:value={password}
	/>
	<div>
		<button class="panel button" on:click|preventDefault={attemptLogin} disabled={submitting}>
			Login
		</button>
	</div>
</form>

<style>
	form {
		max-width: 500px;
		width: 100%;
	}
</style>
