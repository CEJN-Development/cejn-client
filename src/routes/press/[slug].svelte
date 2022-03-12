<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const pressReleaseRes = await fetch(
			`${import.meta.env.VITE_API_URL}/press_releases/${params.slug}`
		);
		if (!pressReleaseRes.ok)
			return {
				status: pressReleaseRes.status,
				error: new Error('Could not load press release')
			};

		let pressRelease: PressRelease = await pressReleaseRes.json();

		return {
			props: {
				pressRelease
			}
		};
	}
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { getLocaleString } from '$lib/helpers';
	import type { PressRelease } from '$lib/types/PressReleases';

	export let pressRelease: PressRelease;

	let bodyParagraphs: string[];
	let publishedDate: string;

	$: {
		bodyParagraphs = pressRelease.body.split('\n\n');
		publishedDate = getLocaleString(new Date(pressRelease.created_at));
	}
</script>

<svelte:head>
	<title>{pressRelease.title}</title>
</svelte:head>

<MetaTags
	title={pressRelease.title}
	description={pressRelease.summary}
	canonical="https://www.chicagoejn.org/"
	openGraph={{
		url: 'https://www.chicagoejn.org/press/' + pressRelease.slug,
		title: pressRelease.title,
		description: pressRelease.summary,
		images: [
			{
				url: 'https://www.chicagoejn.org/images/logo_blue.png',
				alt: 'CEJN Logo'
			}
		],
		site_name: 'Chicago Environmental Justice Network'
	}}
	twitter={{
		handle: '@cejnetwork',
		site: '@cejnetwork',
		cardType: 'summary_large_image',
		title: pressRelease.title,
		description: pressRelease.summary,
		image: 'https://www.chicagoejn.org/images/logo_blue.png',
		imageAlt: 'CEJN Logo'
	}}
/>

<hr class="separator stack-48" />
<h1 class="text-strong text-huge height-huge stack-24">
	{pressRelease.title}
</h1>
<span class="text-medium text-small stack-16">
	{publishedDate}
</span>
<span class="text-medium text-normal stack-24">
	{#each bodyParagraphs as paragraph}
		<p class="stack-16">
			{@html paragraph}
		</p>
	{/each}
</span>
<a class="stack-48" href="/press">&lt;&lt; All press releases</a>
<hr class="separator stack-48" />
