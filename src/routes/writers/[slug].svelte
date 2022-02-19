<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ url, params, fetch, session, stuff }) {
		const writerRes = await fetch(`${import.meta.env.VITE_API_URL}/writers/${params.slug}`);
		if (!writerRes.ok) return {
			status: writerRes.status,
			error: new Error("Could not load writer")
		};

		let writer = await writerRes.json();

		return {
			props: {
				writer
			}
		};
	};
</script>

<script lang="ts">
  import type { Writer } from "$lib/types/Writers";

	export let writer: Writer;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<div class="stack-24">
  <img
    class="stack-24"
    src={`/images/writers/${writer.slug}.jpg`}
    alt={writer.full_name}
  />
  <h1 class="text-strong text-large stack-24">
    {writer.full_name}
  </h1>
  <span class="text-medium text-normal">
    {#each writer.byline.split("\n\n") as paragraph}
      <p class="stack-8">
        {@html paragraph}
      </p>
    {/each}
  </span>
</div>

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
