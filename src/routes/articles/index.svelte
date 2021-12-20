<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const articlesRes = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
		if (!articlesRes.ok) return {
			status: articlesRes.status,
			error: new Error("Could not load articles")
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
  import type { Article } from "$lib/types/articles";
	export let articles:Article[];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<LatestPosts {articles} />