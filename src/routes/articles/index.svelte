<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const articlesRes = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
		if (!articlesRes.ok)
			return {
				status: articlesRes.status,
				error: new Error('Could not load articles')
			};

		let articles: ArticleType[] = await articlesRes.json();

		return {
			props: {
				articles
			}
		};
	}
</script>

<script lang="ts">
	import LatestPosts from '$lib/components/shared/LatestPosts.svelte';
	import type { ArticleType } from '$lib/types/Articles';

	export let articles: ArticleType[];
</script>

<svelte:head>
	<title>Our Stories</title>
</svelte:head>

<hr class="separator stack-48" />
<LatestPosts {articles} />
