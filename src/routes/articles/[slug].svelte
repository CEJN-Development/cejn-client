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
	import { getLocaleString } from "$lib/helpers";
  import type { Article } from "$lib/types/Articles";

	export let article: Article;

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/cejn-dev/image/upload";
  const cloudinary_public_id = article.cloudinary_image_url?.split(CLOUDINARY_BASE_URL)[1];

	let publishedDate: Date = new Date(article.created_at);
  let imagePath: string;

	$: {
		imagePath = cloudinary_public_id
      ? `${CLOUDINARY_BASE_URL}/c_fill,g_auto,h_720,w_1280${cloudinary_public_id}`
      : "";
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<h1 class="text-strong text-huge stack-24">{article.title}</h1>
<p class="text-strong text-normal stack-24">{article.excerpt}</p>
<img
	class="stack-24"
  src={imagePath}
	alt={article.title}
/>
<span class="text-strong text-normal stack-16">
	{article.authors.map(author => author.full_name).join(", ")}
</span>
<span class="text-medium text-small stack-16">
	{getLocaleString(publishedDate)}
</span>
<span class="text-medium text-normal stack-24">
  {#each article.body.split("\n\n") as paragraph}
    <p class="stack-16">{@html paragraph}</p>
  {/each}
</span>
<a class="stack-16" href="/articles">&lt;&lt; All articles</a>
