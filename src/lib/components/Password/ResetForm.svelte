<script lang="ts">
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';

	export let resetPasswordToken: { status: number; message: any };

	let password: string, passwordConfirmation: string;
	let disabled = true;
	let errors: any = {};

	let errorMessages = {
		passwordStrength:
			'Password must contain at least one lowercase letter, uppercase letter, and number. It must also be at least 10 characters.',
		passwordMatch: 'Password and Password Confirmation must match.'
	};

	let requestError: boolean = false;
	let success: boolean = false;

	const setPassword = async () => {
		disabled = true;

		if (!password || !passwordConfirmation || password !== passwordConfirmation) {
			return (disabled = false);
		}

		let params = {
			password,
			password_confirmation: passwordConfirmation,
			...resetPasswordToken.message
		};

		const { response, json } = await ApiService.put(
			String(import.meta.env.VITE_API_URL),
			'password',
			{
				user: { ...params }
			},
			{}
		);

		if (!response.ok) {
			Object.keys(json).forEach((key) => {
				json[key].forEach((error) => {
					FlashMessageService.setMessage({
						message: `${key} ${error}`,
						type: 'error'
					});
				});
			});

			requestError = true;
		} else {
			success = true;
		}

		disabled = false;
	};

	const passwordResetValidator = (e) => {
		const source = e.originalTarget;
		const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,})');

		let passwordEquality =
			!!password && !!passwordConfirmation && password === passwordConfirmation;

		const setError = (condition: boolean, errorMessage: string, eventSource: any = source) => {
			if (!condition && !!eventSource.value) {
				if (!errors[eventSource.name]) errors[eventSource.name] = [errorMessage];
				else {
					errors[eventSource.name] = Array.from(
						new Set([...errors[eventSource.name], errorMessage])
					);
				}
			} else if (!eventSource.value || condition) {
				if (errors[eventSource.name] === undefined) {
					errors[eventSource.name] = [];
				}

				errors[eventSource.name] = errors[eventSource.name]?.filter(
					(e: string) => e !== errorMessage
				);
			}
		};

		if (source.name == 'password') {
			let strongPassword = strongRegex.test(source.value);

			setError(strongPassword, errorMessages.passwordStrength);
		}

		setError(passwordEquality, errorMessages.passwordMatch, {
			value: !!password && !!passwordConfirmation,
			name: 'password_confirmation'
		});
	};

	$: {
		disabled =
			!!errors.password?.length ||
			!!errors.password_confirmation?.length ||
			!password ||
			!passwordConfirmation ||
			passwordConfirmation !== password;
	}
</script>

<main class="flex-row squeeze-24 squish-48 align-center">
	<div
		class="max-width--mobile flex-row bordered border--rounded raised-2 squeeze-24 squish-24 align-center full-width"
	>
		{#if success}
			<p>Your password has been updated.</p>
			<p>
				You can now login <a href="/admin/login">here</a>.
			</p>
		{:else}
			<label for="password" class="text-small text-style-metadata text-style-italic width-100">
				Password
			</label>
			<input
				type="password"
				name="password"
				class="stack-16 squeeze-8 squish-8 width-100"
				bind:value={password}
				on:keyup={passwordResetValidator}
				on:blur={passwordResetValidator}
			/>
			{#if errors.password}
				<span class="stack-8 text-small text-danger flex-row width-100 align-content-start">
					{errors.password.join('. ')}
				</span>
			{/if}
			<label
				for="password_confirmation"
				class="text-small text-style-metadata text-style-italic width-100"
			>
				Password Confirmation
			</label>
			<input
				type="password"
				name="password_confirmation"
				class="stack-16 squeeze-8 squish-8 width-100"
				bind:value={passwordConfirmation}
				on:blur={passwordResetValidator}
			/>
			{#if errors.password_confirmation}
				<span class="stack-16 text-small text-danger flex-row width-100 align-content-start">
					{errors.password_confirmation.join('. ')}
				</span>
			{/if}
			{#if requestError}
				<p class="stack-16 width-100">
					If you forgot your password, or your reset token has expired you can re-initiate the
					process
					<a href="/admin/login">here</a>.
				</p>
			{/if}
			<div>
				<button class="panel button squeeze-24 raised-1" on:click={setPassword} {disabled}>
					Set Password
				</button>
			</div>
		{/if}
	</div>
</main>
