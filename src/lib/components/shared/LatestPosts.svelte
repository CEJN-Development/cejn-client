<script lang="ts">
	import type { ArticleType } from '$lib/types/Articles';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';

	export let articles: ArticleType[] = [];
</script>

<h1 class="text-strong text-large stack-48">Recent Articles</h1>
{#if articles?.length > 0}
	{#each articles as article}
		<section class="flex-reactive gap-16 stack-48">
			<div>
				<CloudinaryImage
					cloudinaryImageUrl={article.cloudinary_image_url}
					options={{ height: 300, width: 350, crop: 'fill' }}
				/>
			</div>
			<div>
				<p class="text-strong text-normal stack-8">{article.title}</p>
				<div class="text-medium text-normal">
					{#each article.excerpt.split('\n\n') as paragraph}
						<p class="stack-8">{@html paragraph}</p>
					{/each}
					<a href={`/articles/${article.slug}`}>Read full article &gt;&gt;</a>
				</div>
			</div>
		</section>
		<hr class="separator stack-48" />
	{/each}
{:else}
	<p class="text-medium text-normal stack-48">There are currently no published articles.</p>
	<hr class="separator stack-48" />
{/if}

<style>
	.separator {
		width: 80%;
		margin-left: auto;
		margin-right: auto;
	}

	.separator:last-child {
		width: 100%;
	}
</style>
