<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const writersRes = await fetch(`${import.meta.env.VITE_API_URL}/writers`);
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
	export let writers;
</script>

<svelte:head>
	<title>Admin | Our Stories</title>
</svelte:head>

<main class="squeeze-16 squish-16">
  <h1 class="stack-16">Our Contributors</h1>
  {#each writers as writer}
		{writer.full_name}
	{/each}
</main>
