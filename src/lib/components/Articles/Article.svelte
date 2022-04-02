<script lang="ts">
	import { getLocaleString } from '$lib/helpers';
	import type { ArticleType } from '$lib/types/Articles';
	import AuthorLink from '$lib/components/Articles/AuthorLink.svelte';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';
	import Base64Image from '../shared/Base64Image.svelte';

	export let article: ArticleType;
	export let previewPhoto: string | ArrayBuffer = null;

	let bodyParagraphs: string[];
	let hasPhoto: boolean;
	let publishedDate: string;

	$: {
		bodyParagraphs = article.body.split('\n\n');
		hasPhoto = !!article?.cloudinary_image_url || !!previewPhoto;
		publishedDate = getLocaleString(new Date(article.created_at));
	}
</script>

<h1 class="text-strong text-huge height-huge stack-24">
	{article.title}
</h1>
<p class="text-strong text-normal stack-24">
	{article.excerpt}
</p>
{#if hasPhoto}
	<div class="stack-24">
		{#if !!previewPhoto}
			<Base64Image photo={previewPhoto} classes="stack-8" />
		{:else}
			<CloudinaryImage
				cloudinaryImageUrl={article.cloudinary_image_url}
				options={{ height: 720, width: 1280, crop: 'fill' }}
				classes="stack-8"
			/>
		{/if}
		{#if !!article.caption}
			<span class="flex-row text-style-metadata text-small align-items-end">
				{article.caption}
			</span>
		{/if}
	</div>
{/if}
<p class="text-strong text-normal height-normal stack-16">
	{#each article.authors as author, index}
		<AuthorLink {author} end={article.authors.length - 1 == index} />
	{/each}
</p>
<p class="text-medium text-small height-small stack-16">
	{publishedDate}
</p>
<span class="text-medium text-normal stack-24">
	{#each bodyParagraphs as paragraph}
		<p class="stack-16">
			{@html paragraph}
		</p>
	{/each}
</span>
