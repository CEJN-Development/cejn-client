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
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<div class="stack-24">
  <img
    class="stack-24"
    src={`/images/bios/${bio.slug}.jpg`}
    alt={bio.name}
  />
  <h1 class="text-strong text-large stack-24">
    {bio.name}
  </h1>
  <span class="text-medium text-normal">
    {#each bio.body.split("\n\n") as paragraph}
      <p class="stack-8">
        {@html paragraph}
      </p>
    {/each}
  </span>
</div>
<a class="stack-16" href="/#who-is-cejn">
  &lt;&lt; Who is CEJN?
</a>

<style>
  img {
    border-radius: 10rem;
    overflow: hidden;
    max-width: 100%;
  }

  @media screen and (min-width: 500px) {
    img {
      float: right;
      max-width: 15rem;
      margin-left: 2rem;
    }
  }
</style>