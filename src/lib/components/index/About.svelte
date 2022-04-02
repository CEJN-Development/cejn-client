<script lang="ts">
	import type { LandingPage } from '$lib/types/LandingPages';

	export let aboutUs: LandingPage;

	let bodyParagraphs: string[];
	let hasContent: boolean;

	$: {
		bodyParagraphs = aboutUs?.preview?.split('\n\n');
		hasContent = !!bodyParagraphs?.length;
	}
</script>

<section class="flex-row stack-48 text-normal">
	<h1 class="flex-row stack-24 text-large">About Us</h1>
	<p class="stack-16">
		{#if hasContent}
			{#each bodyParagraphs as paragraph}
				<p class="stack-16">
					{@html paragraph}
				</p>
			{/each}
		{/if}
	</p>
	<a href="/about">Learn more about CEJN</a>
</section>

<style>
	h1 {
		text-align: center;
		width: 100%;
	}
</style>
