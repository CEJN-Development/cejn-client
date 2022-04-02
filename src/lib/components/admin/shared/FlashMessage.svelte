<script lang="ts">
	import { FlashMessageStore } from '$lib/stores/FlashMessageStore';
	import Icon from '$lib/components/shared/Icon.svelte';
</script>

{#if $FlashMessageStore.length > 0}
	<div id="flash-message-container" class="flex-row width-100">
		{#each $FlashMessageStore as flashMessage}
			<div
				class="align-start border--rounded-8 flex-column raised-2 squeeze-24 squish-16 stack-16 text-normal width-100"
				class:success={flashMessage.type == 'success'}
				class:error={flashMessage.type == 'error'}
			>
				{#if flashMessage.type == 'success'}
					<Icon height={'1.1rem'} width={'1.1rem'} name={'circle_checked'} classes={'spread-8'} />
				{:else if flashMessage.type == 'error'}
					<Icon height={'1.1rem'} width={'1.1rem'} name={'circle_x'} classes={'spread-8'} />
				{/if}
				{flashMessage.message}
			</div>
		{/each}
	</div>
{/if}

<style>
	#flash-message-container {
		left: 0;
		margin-left: auto;
		margin-right: auto;
		max-width: 500px;
		position: fixed;
		right: 0;
		top: 2rem;
		z-index: +10;
	}

	.success {
		background-color: rgb(129, 199, 132);
		color: rgb(255, 255, 255);
	}

	.error {
		background-color: rgb(218, 115, 105);
		color: rgb(255, 255, 255);
	}
</style>
