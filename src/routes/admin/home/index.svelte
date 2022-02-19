<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const splashSectionsRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/splash_sections`);
		if (!splashSectionsRes.ok) return {
			status: splashSectionsRes.status,
			error: new Error("Could not load splashSections")
		};

		let splashSections = await splashSectionsRes.json();

		return {
			props: {
				splashSections
			}
		};
	};
</script>

<script lang="ts">
  import DragAndDropSortableList from "$lib/components/admin/shared/DragAndDropSortableList.svelte";
	import type { SplashSection } from "$lib/types/SplashSections";

	export let splashSections: SplashSection[];
</script>

<svelte:head>
	<title>Admin | Splash Page Settings</title>
</svelte:head>

<main class="squeeze-16 squish-16">
	<a
		href="/admin/splashSections/new"
		class="button panel"
	>
		Edit
	</a>
  <h1 class="stack-32">Splash Page Settings</h1>
	<DragAndDropSortableList />
</main>

<style>
	a {
		float: right;
	}

	a:hover {
		text-decoration: none;
	}
</style>
