<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const resetPasswordToken = url.searchParams.get('reset_password_token');

		if (!resetPasswordToken) {
			return {
				props: {
					resetPasswordToken: {
						status: 401,
						message: { invalid: 'Password reset token is required.' }
					}
				}
			};
		}

		return {
			props: {
				resetPasswordToken: {
					status: 200,
					message: {
						reset_password_token: resetPasswordToken
					}
				}
			}
		};
	}
</script>

<script lang="ts">
	export let resetPasswordToken: { status: number; message: any };

	let password: string, passwordConfirmation: string;

	let errors: any = {};

	let errorMessages = {
		passwordStrength:
			'Password must contain at least one lowercase letter, uppercase letter, and number. It must also be at least 10 characters.',
		passwordMatch: 'Password and Password Confirmation must match.'
	};

	let disabled = true;

	const setPassword = () => {
		if (!password || !passwordConfirmation || password !== passwordConfirmation) {
			return;
		}

		let params = {
			password,
			password_confirmation: passwordConfirmation,
			...resetPasswordToken.message
		};
	};

	const passwordResetValidator = (e) => {
		const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,})');

		let source = e.originalTarget;

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
			!errors.password ||
			!errors.password_confirmation ||
			(password !== passwordConfirmation && !!password && !!passwordConfirmation);
	}
</script>

<main class="flex-row squeeze-24 squish-48 align-center">
	<div
		class="max-width--mobile flex-row bordered border--rounded raised-2 squeeze-24 squish-24 align-center full-width"
	>
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
		<div>
			<button class="panel button raised-1" on:click={setPassword} {disabled}>
				set password
			</button>
		</div>
	</div>
</main>
