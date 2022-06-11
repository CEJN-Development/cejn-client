<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const articlesRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/articles`);
		if (!articlesRes.ok)
			return {
				status: articlesRes.status,
				error: new Error('Could not load articles')
			};

		let articles = await articlesRes.json();

		return {
			props: {
				articles
			}
		};
	}
</script>

<script lang="ts">
	import ArticlesTable from '$lib/components/admin/Articles/ArticlesTable.svelte';
	import type { ArticleType } from '$lib/types/Articles';

	export let articles: ArticleType[];
</script>

<svelte:head>
	<title>Admin | Articles</title>
</svelte:head>

<main class="squeeze-24 squish-24">
	<a href="/admin/articles/new" class="button panel">New article</a>
	<h1 class="stack-24">Articles</h1>
	<ArticlesTable {articles} />
</main>

<style>
	a {
		float: right;
	}

	a:hover {
		text-decoration: none;
	}
</style>
