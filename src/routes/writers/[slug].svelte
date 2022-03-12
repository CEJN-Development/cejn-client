<script context="module" lang="ts">
	export const prerender = false;

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
  import Byline from "$lib/components/shared/Byline.svelte";
  import LatestPosts from "$lib/components/shared/LatestPosts.svelte";

	export let writer: Writer;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<Byline {writer} />
<LatestPosts articles={writer.articles} />
