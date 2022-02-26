<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ url, params, fetch, session, stuff }) {
		const writersRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers`);
		if (!writersRes.ok) return {
			status: writersRes.status,
			error: new Error("Could not load writers")
		};

		let writers: Writer[] = await writersRes.json();

		return {
			props: {
				writers
			},
		};
	};
</script>

<script lang="ts">
  import type { Writer } from '$lib/types/Writers';
  import ArticleForm from '$lib/components/admin/Articles/ArticleForm.svelte';

  export let writers: Writer[];
</script>

<h1 class="squish-16 squeeze-16">Our Stories | New</h1>

<div>
  <ArticleForm {writers} />
</div>
