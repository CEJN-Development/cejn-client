<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const confirmation_token = url.searchParams.get('confirmation_token');
		const email = url.searchParams.get('email');

		const confirmationRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/confirmation?confirmation_token=${confirmation_token}&email=${email}`
		);

		let confirmation = {
			status: confirmationRes.status,
			message: await confirmationRes.json()
		};

		return {
			props: {
				confirmation,
				email
			}
		};
	}
</script>

<script>
	export let confirmation;
	export let email;

	console.log(email);
	console.log(confirmation);
</script>
