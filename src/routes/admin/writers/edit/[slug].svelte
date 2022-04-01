<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
    const writerRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers/${params.slug}`);
		if (!writerRes.ok) return {
			status: writerRes.status,
			error: new Error("Could not load writer")
		};

		let writer: Writer = await writerRes.json();

		return {
			props: {
        writer,
			},
		};
	};
</script>

<script lang="ts">
  import WriterForm from '$lib/components/admin/Writers/WriterForm.svelte';
	import type { Writer } from '$lib/types/Writers';

  export let writer: Writer;
</script>

<main class="squeeze-24 squish-24">
	<h1 class="stack-24">Our Contributors | Edit</h1>
	<WriterForm {writer} />
</main>
