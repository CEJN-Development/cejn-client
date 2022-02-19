<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
    const aboutUsRes = await fetch(`${import.meta.env.VITE_API_URL}/landing_pages/about-us`);
		if (!aboutUsRes.ok) return {
			status: aboutUsRes.status,
			error: new Error("Could not load writer")
		};

		let aboutUs: LandingPage = await aboutUsRes.json();

		return {
			props: {
        aboutUs,
			},
		};
	};
</script>

<script lang="ts">
	import type { LandingPage } from '$lib/types/LandingPages';

  export let aboutUs: LandingPage;

	let bodyParagraphs: string[];
	let hasBody: boolean;

	$: {
		hasBody = !!aboutUs?.body?.length;
		bodyParagraphs = aboutUs?.body?.split("\n\n");
	};
</script>

<svelte:head>
	<title>About Us</title>
</svelte:head>

<main>
	<section id="about" class="squish-16">
		<h1 class="flex-row stack-24 text-large">About Us</h1>
		{#if hasBody}
			{#each bodyParagraphs as paragraph}
				<p class="stack-16">
					{@html paragraph}
				</p>
			{/each}
		{/if}
	</section>
</main>
