<script lang="ts">
	import type { LandingPage } from '$lib/types/LandingPages';

	export let aboutUs: LandingPage = null;

	let bodyParagraphs: string[];
	let hasBody: boolean;

	$: {
		hasBody = !!aboutUs?.body?.length;
		bodyParagraphs = aboutUs?.body?.split('\n\n');
	}
</script>

<h1 class="flex-row stack-24 text-large">About Us</h1>
{#if hasBody}
	{#each bodyParagraphs as paragraph}
		<p class="stack-16">
			{@html paragraph}
		</p>
	{/each}
{/if}
