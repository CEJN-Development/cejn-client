<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
    const bioRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/bios/${page.params.slug}`);
		if (!bioRes.ok) return {
			status: bioRes.status,
			error: new Error("Could not load bio"),
		};

		let bio: Bio = await bioRes.json();

		return {
			props: {
        bio,
			},
		};
	};
</script>

<script lang="ts">
  import BioForm from '$lib/components/admin/Bios/BioForm.svelte';
	import type { Bio } from '$lib/types/Bios';

  export let bio: Bio;
</script>

<h1 class="squish-16 squeeze-16">Our Staff | Edit</h1>

<BioForm {bio} />