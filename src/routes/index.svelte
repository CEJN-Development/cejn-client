<script context="module" lang="ts">
	export const prerender = true;
	export async function load({ page, fetch, session, stuff }) {
		const articlesRes = await fetch(`${import.meta.env.VITE_API_URL}/articles?limit=3`);
		if (!articlesRes.ok) {
			return {
				status: articlesRes.status,
				error: new Error("Could not load articles")
			}
		};
		let articles = await articlesRes.json();
		return {
			props: {
				articles
			}
		};
	};
</script>

<script lang="ts">
	import LatestPosts from "$lib/shared/LatestPosts.svelte";
	import WhoAreWe from "$lib/index/WhoAreWe.svelte";
	import About from "$lib/index/About.svelte";
	import type { Article } from "$lib/types/articles";

	export let articles:Article[];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<About />
<hr class="separator stack-48" />
<WhoAreWe />
<hr class="separator stack-48" />
<LatestPosts {articles} />
