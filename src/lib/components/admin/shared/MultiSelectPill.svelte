<script lang="ts">
	import Icon from '$lib/components/shared/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let text: string;
	export let selectionIds: number[];
	export let selectionId: number;

	const dispatch = createEventDispatcher();

	const deselect = () => dispatch('deselect', [...selectionIds.filter((id) => id != selectionId)]);
</script>

<span on:click={deselect} class="rounded bordered squish-8 squeeze-8 cursor-pointer raised">
	{text}
	<Icon
		name="close"
		alt="button for removing this item from selection"
		height="0.70rem"
		width="0.70rem"
	/>
</span>

<style>
	span {
		display: inline-block;
	}
</style>
