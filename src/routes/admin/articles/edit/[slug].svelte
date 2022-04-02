<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const writersRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers`);
		if (!writersRes.ok)
			return {
				status: writersRes.status,
				error: new Error('Could not load writers')
			};

		const articleRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/articles/${params.slug}`);
		if (!articleRes.ok)
			return {
				status: articleRes.status,
				error: new Error('Could not load article')
			};

		let article: ArticleType = await articleRes.json();
		let writers: Writer[] = await writersRes.json();

		return {
			props: {
				article,
				writers
			}
		};
	}
</script>

<script lang="ts">
	import ArticleForm from '$lib/components/admin/Articles/ArticleForm.svelte';
	import type { ArticleType } from '$lib/types/Articles';
	import type { Writer } from '$lib/types/Writers';

	export let article: ArticleType;
	export let writers: Writer[];
</script>

<div class="squish-24 squeeze-24">
	<h1 class="stack-24">Our Stories | Edit</h1>
	<ArticleForm {article} {writers} />
</div>
