<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const articlesRes = await fetch(`${import.meta.env.VITE_API_URL}/articles?limit=3`);
		if (!articlesRes.ok) return {
			status: articlesRes.status,
			error: new Error("Could not load articles")
		};

		const biosRes = await fetch(`${import.meta.env.VITE_API_URL}/bios`);
		if (!biosRes.ok) return {
			status: biosRes.status,
			error: new Error("Could not load bios")
		};

		let articles = await articlesRes.json();
		let bios = await biosRes.json();

		return {
			props: {
				articles,
				bios,
			}
		};
	};
</script>

<script lang="ts">
	import LatestPosts from "$lib/components/shared/LatestPosts.svelte";
	import WhoAreWe from "$lib/components/index/WhoAreWe.svelte";
	import About from "$lib/components/index/About.svelte";
	import type { Article } from "$lib/types/Articles";
	import type { Bio } from "$lib/types/Bios";

	export let articles: Article[];
	export let bios: Bio[];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<About />
<hr class="separator stack-48" id="who-is-cejn" />
<WhoAreWe {bios} />
<hr class="separator stack-48" />
<LatestPosts {articles} />
