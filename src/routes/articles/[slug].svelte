<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const articleRes = await fetch(`${import.meta.env.VITE_API_URL}/articles/${params.slug}`);
		if (!articleRes.ok)
			return {
				status: articleRes.status,
				error: new Error('Could not load article')
			};

		let article: Article = await articleRes.json();

		return {
			props: {
				article
			}
		};
	}
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import type { ArticleType } from '$lib/types/Articles';
	import Byline from '$lib/components/shared/Byline.svelte';
	import Article from '$lib/components/Articles/Article.svelte';

	export let article: ArticleType;
</script>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<MetaTags
	title={article.title}
	description={article.excerpt}
	canonical="https://www.chicagoejn.org/"
	openGraph={{
		url: 'https://www.chicagoejn.org/articles/' + article.slug,
		title: article.title,
		description: article.excerpt,
		images: [
			{
				url: article.cloudinary_image_url,
				alt: article.caption
			}
		],
		site_name: 'Chicago Environmental Justice Network'
	}}
	twitter={{
		handle: '@cejnetwork',
		site: '@cejnetwork',
		cardType: 'summary_large_image',
		title: article.title,
		description: article.excerpt,
		image: article.cloudinary_image_url,
		imageAlt: article.caption
	}}
/>

<hr class="separator stack-48" />
<Article {article} />
<a class="stack-48" href="/articles"> &lt;&lt; All articles </a>
<section>
	<p class="text-strong text-large stack-24">
		About the Author{#if article.authors.length > 1}s{/if}
	</p>
	{#each article.authors as author}
		<Byline writer={author} linkToByline={true} />
	{/each}
</section>
<hr class="separator stack-48" />
