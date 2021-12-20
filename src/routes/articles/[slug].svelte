<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const articleRes = await fetch(`${import.meta.env.VITE_API_URL}/articles/${page.params.slug}`);
		if (!articleRes.ok) return {
			status: articleRes.status,
			error: new Error("Could not load article")
		};

		let article = await articleRes.json();

		return {
			props: {
				article
			}
		};
	};
</script>

<script lang="ts">
  import type { Article } from "$lib/types/articles";

	export let article:Article;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<h1 class="text-strong text-large stack-24">{article.title}</h1>
<span class="text-medium text-normal stack-24">
  {#each article.body.split("\n\n") as paragraph}
    <p class="stack-8">{@html paragraph}</p>
  {/each}
</span>
<a class="stack-16" href="/articles">&lt;&lt; All articles</a>