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

		let pressRelease: PressRelease = await pressReleaseRes.json();

		return {
			props: {
				pressRelease
			}
		};
	}
</script>

<script lang="ts">
	import PressReleaseForm from '$lib/components/admin/PressReleases/PressReleaseForm.svelte';
	import type { PressRelease } from '$lib/types/PressReleases';

	export let pressRelease: PressRelease;
</script>

<h1 class="squish-16 squeeze-16">Press Release | Edit</h1>

<PressReleaseForm {pressRelease} />
