<script lang="ts">
	import Row from './Row.svelte';
	import type { Writer } from '$lib/types/Writers';

	export let writers: Writer[] = [];

	const removeArticle = (e) => {
		writers = writers.filter((writer) => writer.id != e.detail.id);
	};
</script>

<table>
	<thead>
		<tr>
			<th />
			<th>Full name</th>
			<th>Date added</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each writers as writer}
			<Row {writer} on:writerDeleted={removeArticle} />
		{/each}
	</tbody>
</table>
