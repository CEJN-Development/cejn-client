<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const biosRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/bios`);
		if (!biosRes.ok) return {
			status: biosRes.status,
			error: new Error("Could not load bios")
		};

		let bios = await biosRes.json();

		return {
			props: {
				bios
			},
		};
	};
</script>

<script lang="ts">
  import BiosTable from "$lib/components/admin/Bios/BiosTable.svelte";
  import type { Bio } from "$lib/types/Bios";

	export let bios:Bio[];
</script>

<svelte:head>
	<title>Admin | Our Staff</title>
</svelte:head>

<main class="squeeze-16 squish-16">
  <h1 class="stack-32">Our Staff</h1>
  <BiosTable {bios} />
</main>