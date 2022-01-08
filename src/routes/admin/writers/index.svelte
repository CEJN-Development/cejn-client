<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const writersRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers`);
		if (!writersRes.ok) return {
			status: writersRes.status,
			error: new Error("Could not load writers")
		};

		let writers = await writersRes.json();

		return {
			props: {
				writers
			}
		};
	};
</script>

<script lang="ts">
  import WritersTable from "$lib/components/admin/Writers/WritersTable.svelte";
  import type { Writer } from "$lib/types/Writers";

	export let writers: Writer[];
</script>

<svelte:head>
	<title>Admin | Our Contributors</title>
</svelte:head>

<main class="squeeze-16 squish-16">
	<a
		href="/admin/writers/new"
		class="button panel"
	>
		New writer
	</a>
  <h1 class="stack-32">Our Contributors</h1>
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