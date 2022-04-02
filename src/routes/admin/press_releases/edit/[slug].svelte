<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const pressReleaseRes = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/press_releases/${params.slug}`
		);
		if (!pressReleaseRes.ok)
			return {
				status: pressReleaseRes.status,
				error: new Error('Could not load press release')
			};

		let pressRelease: PressReleaseType = await pressReleaseRes.json();

		return {
			props: {
				pressRelease
			}
		};
	}
</script>

<script lang="ts">
	import PressReleaseForm from '$lib/components/admin/PressReleases/PressReleaseForm.svelte';
	import type { PressReleaseType } from '$lib/types/PressReleases';

	export let pressRelease: PressReleaseType;
</script>

<main class="squeeze-24 squish-24">
	<h1>Press Release | Edit</h1>

	<PressReleaseForm {pressRelease} />
</main>
