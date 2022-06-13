<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const writersRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers`);
		if (!writersRes.ok)
			return {
				status: writersRes.status,
				error: new Error('Could not load writers')
			};

		let writers = await writersRes.json();

		return {
			props: {
				writers
			}
		};
	}
</script>

<script lang="ts">
	import WritersTable from '$lib/components/admin/Writers/WritersTable.svelte';
	import type { Writer } from '$lib/types/Writers';

	export let writers: Writer[];
</script>

<svelte:head>
	<title>Admin | Writers</title>
</svelte:head>

<main class="squeeze-24 squish-24">
	<a href="/admin/writers/new" class="button panel">New writer</a>
	<h1 class="stack-24">Writers</h1>
	<WritersTable {writers} />
</main>

<style>
	a {
		float: right;
	}

	a:hover {
		text-decoration: none;
	}
</style>
