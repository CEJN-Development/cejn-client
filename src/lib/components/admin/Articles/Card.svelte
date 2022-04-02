<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { logOut } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import type { ArticleType } from '$lib/types/Articles';
	import { getLocaleString, truncateWithEllipses } from '$lib/helpers';
	import Icon from '$lib/components/shared/Icon.svelte';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';

	export let article: ArticleType;

	let sample: string;
	let articleAuthors: string;
	let publishedDate: string;

	const dispatch = createEventDispatcher();

	const deleteArticle = async (e) => {
		if (confirm('Are you sure you want to delete this article?')) {
			const { response } = await ApiService.del(
				String(import.meta.env.VITE_API_URL),
				`admin/articles/${article.id}`,
				{ creds: true },
				{ aud: $aud }
			);

			if (response.status == 401) logOut();

			if (response.ok) {
				FlashMessageService.setMessage({
					message: 'Article successfully deleted!',
					type: 'success'
				});
				dispatch('articleDeleted', article);
			} else {
				FlashMessageService.setMessage({
					message: 'Unexpected error. If it persists contact support.',
					type: 'error'
				});
			}
		}
	};

	$: {
		sample = truncateWithEllipses(article.sample, 300);
		articleAuthors = article.authors.map((author) => author.full_name).join(', ');
		publishedDate = getLocaleString(new Date(article.created_at));
	}
</script>

<div class="card">
	<CloudinaryImage
		cloudinaryImageUrl={article.cloudinary_image_url}
		options={{ height: 169, width: 300, crop: 'fill' }}
		classes="stack-8"
	/>
	<div class="squeeze-16 stack-8">
		<div class="text-strong text-normal stack-8">
			{article.title}
		</div>
		{#if article.authors.length >= 1}
			<div class="text-thin text-small">
				<span class="text-style-italic">By:</span>
				{articleAuthors}
			</div>
		{/if}
		<div class="text-thin text-small stack-8">
			<span class="text-style-italic">On:</span>
			{publishedDate}
		</div>
		<div class="text-medium text-normal stack-16">
			{article.excerpt}
		</div>
	</div>
	<div class="squeeze-16 flex-column space-between stack-16">
		<a href={`/admin/articles/edit/${article.id}`}>
			<Icon name="edit" />
		</a>
		<span class="cursor-pointer" on:click={deleteArticle}>
			<Icon name="delete" />
		</span>
	</div>
</div>
