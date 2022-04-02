<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const writersRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers`);
		if (!writersRes.ok)
			return {
				status: writersRes.status,
				error: new Error('Could not load writers')
			};

		let writers: Writer[] = await writersRes.json();

		return {
			props: {
				writers
			}
		};
	}
</script>

<script lang="ts">
	import type { Writer } from '$lib/types/Writers';
	import ArticleForm from '$lib/components/admin/Articles/ArticleForm.svelte';

	export let writers: Writer[];
</script>

<div class="squish-24 squeeze-24">
	<h1 class="stack-24">Our Stories | New</h1>
	<ArticleForm {writers} />
</div>
