<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ url, params, fetch, session, stuff }) {
		const articlesRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/articles`);
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
  import ArticlesTable from "$lib/components/admin/Articles/ArticlesTable.svelte";
  import type { Article } from "$lib/types/Articles";

	export let articles: Article[];
</script>

<svelte:head>
	<title>Admin | Our Stories</title>
</svelte:head>

<main class="squeeze-16 squish-16">
	<a
		href="/admin/articles/new"
		class="button panel"
	>
		New article
	</a>
  <span class="text-large text-strong stack-16">Our Stories</span>
  <ArticlesTable {articles} />
</main>

<style>
	a {
		float: right;
	}

	a:hover {
		text-decoration: none;
	}
	
	main > span {
		display: inline-block;
	}
</style>
