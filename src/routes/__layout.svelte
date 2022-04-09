<script lang="ts">
	import { onMount } from 'svelte';
	import { setCurrentClientSize, recalculateViewportDimensions } from '$lib/helpers';
	import Header from '$lib/components/header/Header.svelte';
	import Contact from '$lib/components/shared/Contact.svelte';
	import '../app.css';

	onMount(() => setCurrentClientSize(window));
</script>

<svelte:window on:resize={recalculateViewportDimensions} />

<Header />
<main>
	<slot />
	<Contact />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 5rem 2rem 0 2rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media screen and (min-width: 500px) {
		main {
			max-width: 880px;
			min-width: 500px;
			width: 90vw;
			padding: 7rem 2rem 0 2rem;
		}
	}
</style>
