<script lang="ts">
	import { getLocaleString } from '$lib/helpers';
	import type { PressReleaseType } from '$lib/types/PressReleases';

	export let pressRelease: PressReleaseType;

	let bodyParagraphs: string[];
	let publishedDate: string;

	$: {
		bodyParagraphs = pressRelease.body.split('\n\n');
		publishedDate = getLocaleString(new Date(pressRelease.created_at));
	}
</script>

<h1 class="text-strong text-huge height-huge stack-24">
	{pressRelease.title}
</h1>
<span class="text-medium text-small stack-16 flex-row">
	{publishedDate}
</span>
<span class="text-medium text-normal stack-24">
	{#each bodyParagraphs as paragraph}
		<p class="stack-16">
			{@html paragraph}
		</p>
	{/each}
</span>
