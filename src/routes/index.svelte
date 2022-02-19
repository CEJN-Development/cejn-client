<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const articlesRes = await fetch(`${import.meta.env.VITE_API_URL}/articles?limit=3`);
		if (!articlesRes.ok) return {
			status: articlesRes.status,
			error: new Error("Could not load articles")
		};

		const organizationsRes = await fetch(`${import.meta.env.VITE_API_URL}/organizations`);
		if (!organizationsRes.ok) return {
			status: organizationsRes.status,
			error: new Error("Could not load organizations")
		};

		const splashSectionsRes = await fetch(`${import.meta.env.VITE_API_URL}/splash_sections`);
		if (!splashSectionsRes.ok) return {
			status: splashSectionsRes.status,
			error: new Error("Could not load splash sections")
		};

		const aboutUsRes = await fetch(`${import.meta.env.VITE_API_URL}/landing_pages/about-us`);
		if (!aboutUsRes.ok) return {
			status: aboutUsRes.status,
			error: new Error("Could not load splash sections")
		};

		let articles = await articlesRes.json();
		let organizations = await organizationsRes.json();
		let splashSections = await splashSectionsRes.json();
		let aboutUs = await aboutUsRes.json();

		return {
			props: {
				aboutUs,
				articles,
				organizations,
				splashSections,
			}
		};
	};
</script>

<script lang="ts">
	import LatestPosts from "$lib/components/shared/LatestPosts.svelte";
	import WhoAreWe from "$lib/components/index/WhoAreWe.svelte";
	import About from "$lib/components/index/About.svelte";
	import type { Article } from "$lib/types/Articles";
	import type { Organization } from "$lib/types/Organizations";
	import type { SplashSection } from "$lib/types/SplashSections";
	import type { LandingPage } from "$lib/types/LandingPages";

	export let aboutUs: LandingPage;
	export let articles: Article[];
	export let organizations: Organization[];
	export let splashSections: SplashSection[];

	const sectionPriority = (sectionName: string) => {
		return splashSections.find(section => section.name == sectionName).priority
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main>
	<hr class="separator stack-48" name="hr_0" />
	<section
		id="about"
		name={`section_${sectionPriority("about")}`}
	>
		<About {aboutUs} />
	</section>
	<hr class="separator stack-48" name="hr_1" />
	<section
		id="who-is-cejn"
		name={`section_${sectionPriority("staff")}`}
	>
		<WhoAreWe {organizations} />
	</section>
	<hr class="separator stack-48" name="hr_2" />
	<section name={`section_${sectionPriority("articles")}`}>
		<LatestPosts {articles} />
	</section>
</main>

<style>
	main {
		display: grid;
		grid-template-areas:
			"hr_0"
			"area_0"
			"hr_1"
			"area_1"
			"hr_2"
			"area_2";
	}

	section[name="section_0"] {
		grid-area: area_0
	}

	section[name="section_1"] {
		grid-area: area_1
	}

	section[name="section_2"] {
		grid-area: area_2
	}

	hr[name="hr_0"] {
		grid-area: hr_0
	}

	hr[name="hr_1"] {
		grid-area: hr_1
	}

	hr[name="hr_2"] {
		grid-area: hr_2
	}
</style>