<script lang="ts">
	import { breakpoints } from '$lib/constants';
	import { lastIndexOfArray } from '$lib/helpers';
	import { ClientSizeStore } from '$lib/stores/ClientSizeStore';
	import type { ArticleType } from '$lib/types/Articles';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';

	export let articles: ArticleType[] = [];
</script>

<h1 class="text-strong text-large stack-48">Recent Articles</h1>
{#if !!articles.length}
	{#each articles as article, i}
		<section class="flex-reactive gap-16 stack-48">
			<div>
				<CloudinaryImage
					cloudinaryImageUrl={article.cloudinary_image_url}
					options={{ height: 300, width: 350, crop: 'fill' }}
				/>
			</div>
			<div class:width-80={$ClientSizeStore.width > breakpoints.sm}>
				<p class="text-strong text-normal stack-8">{article.title}</p>
				<div class="text-medium text-normal">
					{#each article.excerpt.split('\n\n') as paragraph}
						<p class="stack-8">{@html paragraph}</p>
					{/each}
					<a href={`/articles/${article.slug}`}>Read full article &gt;&gt;</a>
				</div>
			</div>
		</section>
		<hr
			class:width-100={i == lastIndexOfArray(articles)}
			class:width-90={i < lastIndexOfArray(articles)}
			class="separator stack-48"
		/>
	{/each}
{:else}
	<p class="text-medium text-normal stack-48">There are currently no published articles.</p>
	<hr class="separator stack-48" />
{/if}
