<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ url, params, fetch, session, stuff }) {
		const articleRes = await fetch(`${import.meta.env.VITE_API_URL}/articles/${params.slug}`);
		if (!articleRes.ok) return {
			status: articleRes.status,
			error: new Error("Could not load article")
		};

		let article: Article = await articleRes.json();

		return {
			props: {
				article,
			},
		};
	};
</script>

<script lang="ts">
	import { getLocaleString } from "$lib/helpers";
  import type { Article } from "$lib/types/Articles";
  import CloudinaryImage from "$lib/components/shared/CloudinaryImage.svelte";
	import AuthorLink from "$lib/components/Articles/AuthorLink.svelte";

	export let article: Article;

	let bodyParagraphs: string[];
	let publishedDate: string;

	$: {
		bodyParagraphs = article.body.split("\n\n");
		publishedDate = getLocaleString(new Date(article.created_at));
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<h1 class="text-strong text-huge stack-24">
	{article.title}
</h1>
<p class="text-strong text-normal stack-24">
	{article.excerpt}
</p>
<CloudinaryImage
	cloudinaryImageUrl={article.cloudinary_image_url}
	options={{ height: 720, width: 1280, crop: "fill" }}
	classes="stack-24"
/>
<span class="text-strong text-normal stack-16">
	{#each article.authors as author, index}
		<AuthorLink {author} {index} end={article.authors.length - 1 == index} />
	{/each}
</span>
<span class="text-medium text-small stack-16">
	{publishedDate}
</span>
<span class="text-medium text-normal stack-24">
  {#each bodyParagraphs as paragraph}
    <p class="stack-16">
			{@html paragraph}
		</p>
  {/each}
</span>
<a class="stack-16" href="/articles">
	&lt;&lt; All articles
</a>
