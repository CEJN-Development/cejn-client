<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const articlesRes = await fetch(`${import.meta.env.VITE_API_URL}/articles?limit=3`);
		if (!articlesRes.ok) return {
			status: articlesRes.status,
			error: new Error("Could not load articles")
		};

		const biosRes = await fetch(`${import.meta.env.VITE_API_URL}/bios`);
		if (!biosRes.ok) return {
			status: biosRes.status,
			error: new Error("Could not load bios")
		};

		const splashSectionsRes = await fetch(`${import.meta.env.VITE_API_URL}/splash_sections`);
		if (!splashSectionsRes.ok) return {
			status: splashSectionsRes.status,
			error: new Error("Could not load splash sections")
		};

		let articles = await articlesRes.json();
		let bios = await biosRes.json();
		let splashSections = await splashSectionsRes.json();

		return {
			props: {
				articles,
				bios,
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
	import type { Bio } from "$lib/types/Bios";
	import type { SplashSection } from "$lib/types/SplashSections";

	export let articles: Article[];
	export let bios: Bio[];
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
		<About />
	</section>
	<hr class="separator stack-48" name="hr_1" />
	<section
		id="who-is-cejn"
		name={`section_${sectionPriority("staff")}`}
	>
		<WhoAreWe {bios} />
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