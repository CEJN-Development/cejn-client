<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const pressReleasesRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/press_releases`);
		if (!pressReleasesRes.ok)
			return {
				status: pressReleasesRes.status,
				error: new Error('Could not load pressReleases')
			};

		let pressReleases = await pressReleasesRes.json();

		return {
			props: {
				pressReleases
			}
		};
	}
</script>

<script lang="ts">
	import PressReleasesTable from '$lib/components/admin/PressReleases/PressReleasesTable.svelte';
	import type { PressReleaseType } from '$lib/types/PressReleases';

	export let pressReleases: PressReleaseType[];
</script>

<svelte:head>
	<title>Admin | Press Releases</title>
</svelte:head>

<main class="squeeze-24 squish-24">
	<a href="/admin/press_releases/new" class="button panel">New press release</a>
	<h1 class="stack-24">Our Press Releases</h1>
	<PressReleasesTable {pressReleases} />
</main>

<style>
	a {
		float: right;
	}

	a:hover {
		text-decoration: none;
	}
</style>
