<script lang="ts">
	import type { ArticleType } from '$lib/types/Articles';
	import Card from './Card.svelte';

	export let articles: ArticleType[] = [];

	const removeArticle = (e) => {
		articles = articles.filter((article) => article.id != e.detail.id);
	};
</script>

<section>
	{#each articles as article}
		<Card {article} on:articleDeleted={removeArticle} />
	{/each}
</section>

<style>
	section {
		max-width: fit-content;
		display: grid;
		grid-gap: 1rem;
	}

	@media screen and (min-width: 700px) {
		section {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (min-width: 900px) {
		section {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
