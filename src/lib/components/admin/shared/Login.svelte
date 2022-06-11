<script lang="ts">
	import { aud, ip, os, browser } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
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

		if (response.ok) {
			user.set(json);
			window.location.href = '/admin';
		} else if (response.status === 401) {
			json.error ? (errors = [json.error]) : (errors = ['Error.']);
			errors.forEach((message) => {
				FlashMessageService.setMessage({
					message,
					type: 'error'
				});
			});
		} else if (response.status === 500) {
			errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
			errors.forEach((message) => {
				FlashMessageService.setMessage({
					message,
					type: 'error'
				});
			});
		}

		submitting = false;
	};
</script>

<div
	class="max-width--mobile flex-row bordered border--rounded raised-2 squeeze-24 squish-24 align-center full-width"
>
	<form class="flex-row full-width">
		<label for="email" class="text-small text-style-metadata text-style-italic">Email</label>
		<input type="email" name="email" class="stack-16 squeeze-8 squish-8" bind:value={email} />
		<label for="password" class="text-small text-style-metadata text-style-italic">
			Password
		</label>
		<input
			type="password"
			name="password"
			class="stack-16 squeeze-8 squish-8"
			bind:value={password}
		/>
		<div class="flex-row full-width align-center stack-16">
			<button
				class="panel button squeeze-24 raised-1"
				on:click|preventDefault={attemptLogin}
				disabled={submitting}
			>
				Login
			</button>
		</div>
		<p class="text-small full-width">
			Forgot your password? Request a reset <a href="">here</a>
		</p>
	</form>
</div>
