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
	import type { PressReleaseType } from '$lib/types/PressReleases';
	import PressRelease from '$lib/components/shared/PressRelease.svelte';

	export let pressRelease: PressReleaseType;
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
<PressRelease {pressRelease} />
<a class="stack-48" href="/press">&lt;&lt; All press releases</a>
<hr class="separator stack-48" />
