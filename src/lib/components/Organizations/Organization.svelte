<script lang="ts">
	import type { OrganizationType } from '$lib/types/Organizations';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';
	import Base64Image from '../shared/Base64Image.svelte';

	export let organization: OrganizationType;
	export let previewPhoto: string | ArrayBuffer = null;

	let bodyParagraphs: string[];
	let hasBody: boolean;

	$: {
		hasBody = !!organization?.body?.length;
		bodyParagraphs = organization?.body?.split('\n\n');
	}
</script>

<div class="stack-24">
	{#if !!previewPhoto}
		<Base64Image photo={previewPhoto} classes="stack-24" />
	{:else}
		<CloudinaryImage
			cloudinaryImageUrl={organization.cloudinary_image_url}
			options={{ height: 405, width: 720, crop: 'fit' }}
			classes="stack-24"
		/>
	{/if}
	<h1 class="text-strong text-large stack-24">
		{organization.name || ''}
	</h1>
	<span class="text-medium text-normal">
		{#if hasBody}
			{#each bodyParagraphs as paragraph}
				<p class="stack-8">
					{@html paragraph}
				</p>
			{/each}
		{/if}
	</span>
</div>
