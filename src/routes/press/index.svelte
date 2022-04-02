<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const pressReleasesRes = await fetch(`${import.meta.env.VITE_API_URL}/press_releases`);
		if (!pressReleasesRes.ok)
			return {
				status: pressReleasesRes.status,
				error: new Error('Could not load press releases')
			};

		let pressReleases: PressReleaseType[] = await pressReleasesRes.json();

		return {
			props: {
				pressReleases
			}
		};
	}
</script>

<script lang="ts">
	import PressReleasesList from '$lib/components/PressReleases/List.svelte';
	import type { PressReleaseType } from '$lib/types/PressReleases';

	export let pressReleases: PressReleaseType[];
</script>

<svelte:head>
	<title>Press Releases</title>
</svelte:head>

<hr class="separator stack-48" />
<PressReleasesList {pressReleases} />
