<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const aboutUsRes = await fetch(`${import.meta.env.VITE_API_URL}/landing_pages/about-us`);
		if (!aboutUsRes.ok)
			return {
				status: aboutUsRes.status,
				error: new Error('Could not load splash sections')
			};

		const articlesRes = await fetch(`${import.meta.env.VITE_API_URL}/articles?limit=3`);
		if (!articlesRes.ok)
			return {
				status: articlesRes.status,
				error: new Error('Could not load articles')
			};

		const nextEventsRes = await fetch(`${import.meta.env.VITE_API_URL}/events/next`);
		if (!nextEventsRes.ok)
			return {
				status: nextEventsRes.status,
				error: new Error('Could not load articles')
			};

		const organizationsRes = await fetch(`${import.meta.env.VITE_API_URL}/organizations`);
		if (!organizationsRes.ok)
			return {
				status: organizationsRes.status,
				error: new Error('Could not load organizations')
			};

		const splashSectionsRes = await fetch(`${import.meta.env.VITE_API_URL}/splash_sections`);
		if (!splashSectionsRes.ok)
			return {
				status: splashSectionsRes.status,
				error: new Error('Could not load splash sections')
			};

		let aboutUs = await aboutUsRes.json();
		let articles = await articlesRes.json();
		let nextEvent = await nextEventsRes.json();
		let organizations = await organizationsRes.json();
		let splashSections = await splashSectionsRes.json();

		return {
			props: {
				aboutUs,
				articles,
				nextEvent,
				organizations,
				splashSections
			}
		};
	}
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import About from '$lib/components/index/About.svelte';
	import EventShow from '$lib/components/Events/Show.svelte';
	import LatestPosts from '$lib/components/shared/LatestPosts.svelte';
	import OurMembers from '$lib/components/index/OurMembers.svelte';
	import type { ArticleType } from '$lib/types/Articles';
	import type { LandingPage } from '$lib/types/LandingPages';
	import type { OrganizationType } from '$lib/types/Organizations';
	import type { SplashSection } from '$lib/types/SplashSections';
	import type { EventType } from '$lib/types/Events';

	export let aboutUs: LandingPage;
	export let articles: ArticleType[];
	export let nextEvent: EventType = null;
	export let organizations: OrganizationType[];
	export let splashSections: SplashSection[];

	const sectionPriority = (sectionName: string): number => {
		return splashSections.find((section) => section.name == sectionName).priority;
	};
</script>

<svelte:head>
	<title>Chicago Environmental Justice Network</title>
</svelte:head>

<MetaTags
	title="Chicago Environmental Justice Network"
	description="Chicago Environmental Justice Network is a coalition bringing together neighborhood-based, grassroots, environmental justice organizations throughout the Chicago metro area in frontline communities."
	canonical="https://www.chicagoejn.org/"
	openGraph={{
		url: 'https://www.chicagoejn.org/',
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
		title: 'Chicago Environmental Justice Network',
		description:
			'Chicago Environmental Justice Network is a coalition bringing together neighborhood-based, grassroots, environmental justice organizations throughout the Chicago metro area in frontline communities.',
		image: 'https://www.chicagoejn.org/images/logo_blue.png',
		imageAlt: 'CEJN Logo'
	}}
/>

<main>
	<hr class="separator stack-48" name="hr_0" />
	<section id="about" name="section_0">
		<About {aboutUs} />
	</section>
	{#if !!nextEvent}
		<hr class="separator stack-48" name="hr_1" />
		<section id="events" name="section_1">
			<EventShow event={nextEvent} />
		</section>
	{/if}
	<hr class="separator stack-48" name="hr_2" />
	<section id="our-members" name="section_2">
		<OurMembers {organizations} />
	</section>
	<hr class="separator stack-48" name="hr_3" />
	<section name="section_3">
		<LatestPosts {articles} />
	</section>
</main>

<style>
	main {
		display: grid;
		grid-template-areas:
			'hr_0'
			'area_0'
			'hr_1'
			'area_1'
			'hr_2'
			'area_2'
			'hr_3'
			'area_3';
	}

	section[name='section_0'] {
		grid-area: area_0;
	}

	section[name='section_1'] {
		grid-area: area_1;
	}

	section[name='section_2'] {
		grid-area: area_2;
	}

	section[name='section_3'] {
		grid-area: area_3;
	}

	hr[name='hr_0'] {
		grid-area: hr_0;
	}

	hr[name='hr_1'] {
		grid-area: hr_1;
	}

	hr[name='hr_2'] {
		grid-area: hr_2;
	}

	hr[name='hr_3'] {
		grid-area: hr_3;
	}
</style>
