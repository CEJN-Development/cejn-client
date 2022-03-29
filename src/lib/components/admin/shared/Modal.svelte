<script lang="ts">
	import Icon from '$lib/components/shared/Icon.svelte';

	export let show: boolean = false;
	export let size: 'small' | 'medium' | 'large' = 'small';

	const close = (e: Event) => {
		show = false;
	};
</script>

{#if show}
	<section class="modal-overlay width-100 background-shade">
		<section
			class:modal-large={size == 'large'}
			class:modal-medium={size == 'medium'}
			class:modal-small={size == 'small'}
			class="squish-24 squeeze-24 margin-x--auto border--rounded-8 raised-2 drop-32 background-white"
		>
			<div class="flex-row align-items-end">
				<span on:click={close} class="cursor-pointer">
					<Icon name="close" />
				</span>
			</div>
			<div class="max-width--tablet margin-x--auto modal-scrollable">
				<div class="stack-48">
					<slot />
				</div>
				<hr class="separator invisible" />
			</div>
		</section>
	</section>
{/if}
