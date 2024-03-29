<script lang="ts">
	import type { Writer } from '$lib/types/Writers';
	import CloudinaryImage from './CloudinaryImage.svelte';
	import Base64Image from './Base64Image.svelte';

	export let writer: Writer = null;
	export let linkToByline = false;
	export let previewPhoto: string | ArrayBuffer = null;

	let bylineParagraphs: string[];
	let hasByline: boolean;

	$: {
		hasByline = !!writer?.byline?.length;
		bylineParagraphs = writer?.byline?.split('\n\n');
	}
</script>

<section class="flex-reactive gap-16 stack-24">
	<div class="writer-image">
		{#if !!previewPhoto}
			<Base64Image photo={previewPhoto} classes="stack-24" />
		{:else}
			<CloudinaryImage
				classes={'border--rounded-circle'}
				cloudinaryImageUrl={writer.cloudinary_image_url}
				options={{ height: 350, width: 350, crop: 'fill' }}
			/>
		{/if}
	</div>
	<div>
		<p class="text-strong stack-8" class:text-large={!linkToByline}>
			{#if linkToByline}
				<a href={`/writers/${writer.slug}`}>{writer.full_name}</a>
			{:else}
				{writer.full_name || ''}
			{/if}
		</p>
		{#if hasByline}
			{#each bylineParagraphs as paragraph}
				<p class="stack-8">
					{@html paragraph}
				</p>
			{/each}
		{/if}
	</div>
</section>

<style>
	.writer-image {
		min-width: 150px;
		flex: 0;
	}
</style>
