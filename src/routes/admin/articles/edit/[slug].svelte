<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const writersRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers`);
		if (!writersRes.ok) return {
			status: writersRes.status,
			error: new Error("Could not load writers")
		};

    const articleRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/articles/${page.params.slug}`);
		if (!articleRes.ok) return {
			status: articleRes.status,
			error: new Error("Could not load article")
		};

		let article: Article = await articleRes.json();
		let writers: Writer[] = await writersRes.json();

		return {
			props: {
        article,
				writers,
			},
		};
	};
</script>

<script lang="ts">
  import ArticleForm from '$lib/components/admin/Articles/ArticleForm.svelte';
  import type { Article } from '$lib/types/Articles';
  import type { Writer } from '$lib/types/Writers';

  export let article: Article;
  export let writers: Writer[];
</script>

<h1 class="squish-16 squeeze-16">Our Stories | Edit</h1>

<div>
  <ArticleForm
    {article}
    {writers}
  />
</div>
