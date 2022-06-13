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
	import ResetForm from '$lib/components/Password/ResetForm.svelte';

	export let resetPasswordToken: { status: number; message: any };
</script>

<ResetForm {resetPasswordToken} />
