<script lang="ts">
	import Modal from './Modal.svelte';

	export let show: boolean = false;
</script>

<Modal bind:show size={'large'}>
	<slot />
</Modal>
