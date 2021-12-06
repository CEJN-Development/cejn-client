<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const bioRes = await fetch(`${import.meta.env.VITE_API_URL}/bios/${page.params.slug}`);
		if (!bioRes.ok) return {
			status: bioRes.status,
			error: new Error("Could not load bio")
		};

		let bio = await bioRes.json();

		return {
			props: {
				bio
			}
		};
	};
</script>

<script lang="ts">
  import type { Bio } from "$lib/types/bios";

	export let bio:Bio;
  console.log(bio);
  
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<img src={`/images/bios/${bio.slug}.jpg`} alt={bio.name}>
<h1 class="text-strong text-large stack-24">{bio.name}</h1>
<span class="text-medium text-normal stack-24">
  {#each bio.body.split("\n\n") as paragraph}
    <p class="stack-8">{@html paragraph}</p>
  {/each}
</span>
<a class="stack-16" href="/#bios">&lt;&lt; Who is CEJN?</a>