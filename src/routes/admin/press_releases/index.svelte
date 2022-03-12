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
	import type { PressRelease } from '$lib/types/PressReleases';

	export let pressReleases: PressRelease[];
</script>

<svelte:head>
	<title>Admin | Press Releases</title>
</svelte:head>

<main class="squeeze-16 squish-16">
	<a href="/admin/press_releases/new" class="button panel"> New press release </a>
	<h1 class="stack-16">Our Press Releases</h1>
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
