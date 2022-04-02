<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const aboutUsRes = await fetch(`${import.meta.env.VITE_API_URL}/landing_pages/about-us`);
		if (!aboutUsRes.ok)
			return {
				status: aboutUsRes.status,
				error: new Error('Could not load writer')
			};

		let aboutUs: LandingPage = await aboutUsRes.json();

		return {
			props: {
				aboutUs
			}
		};
	}
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import type { LandingPage } from '$lib/types/LandingPages';
	import AboutUs from '$lib/components/shared/AboutUs.svelte';

	export let aboutUs: LandingPage;
</script>

<svelte:head>
	<title>About Us</title>
</svelte:head>

<MetaTags
	title="About Us"
	description="Chicago Environmental Justice Network is a coalition bringing together neighborhood-based, grassroots, environmental justice organizations throughout the Chicago metro area in frontline communities."
	canonical="https://www.chicagoejn.org/"
	openGraph={{
		url: 'https://www.chicagoejn.org/about',
		title: 'Chicago Environmental Justice Network',
		description:
			'Chicago Environmental Justice Network is a coalition bringing together neighborhood-based, grassroots, environmental justice organizations throughout the Chicago metro area in frontline communities.',
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
		title: 'About Us',
		description:
			'Chicago Environmental Justice Network is a coalition bringing together neighborhood-based, grassroots, environmental justice organizations throughout the Chicago metro area in frontline communities.',
		image: 'https://www.chicagoejn.org/images/logo_blue.png',
		imageAlt: 'CEJN Logo'
	}}
/>

<main>
	<section id="about" class="squish-16">
		<AboutUs {aboutUs} />
	</section>
</main>
<hr class="separator stack-48" />
