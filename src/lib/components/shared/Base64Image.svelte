<script lang="ts">
	export let photo: string | ArrayBuffer = '';
	export let classes: string = '';
	export let alt: string = '';

	let base64String: string = '';

	$: {
		base64String = String(photo);
	}
</script>

{#if base64String.length}
	<img class={classes} src={base64String} {alt} />
{/if}

<style>
	img {
		width: 100%;
		height: fit-content;
	}
</style>
