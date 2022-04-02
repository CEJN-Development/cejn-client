<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const writerRes = await fetch(`${import.meta.env.VITE_API_URL}/writers/${params.slug}`);
		if (!writerRes.ok)
			return {
				status: writerRes.status,
				error: new Error('Could not load writer')
			};

		let writer = await writerRes.json();

		return {
			props: {
				writer
			}
		};
	}
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import type { Writer } from '$lib/types/Writers';
	import Byline from '$lib/components/shared/Byline.svelte';
	import LatestPosts from '$lib/components/shared/LatestPosts.svelte';

	export let writer: Writer;
</script>

<svelte:head>
	<title>{writer.full_name}</title>
</svelte:head>

<MetaTags
	title={writer.full_name}
	description={writer.byline}
	canonical="https://www.chicagoejn.org/"
	openGraph={{
		url: `https://www.chicagoejn.org/our-members/${writer.slug}`,
		title: writer.full_name,
		description: writer.byline,
		images: [
			{
				url: writer.cloudinary_image_url,
				alt: writer.full_name
			}
		],
		site_name: 'Chicago Environmental Justice Network'
	}}
	twitter={{
		handle: '@cejnetwork',
		site: '@cejnetwork',
		cardType: 'summary_large_image',
		title: writer.full_name,
		description: writer.byline,
		image: writer.cloudinary_image_url,
		imageAlt: writer.full_name
	}}
/>

<hr class="separator stack-48" />
<Byline {writer} />
<LatestPosts articles={writer.articles} />
