<script lang="ts">
	import Row from './Row.svelte';
	import type { MemberType } from '$lib/types/TeamTypes';

	export let team: MemberType[] = [];

	const removeMember = (e) => {
		team = team.filter((member) => member.id != e.detail.id);
	};
</script>

<table class="full-width">
	<thead>
		<tr>
			<th>Contact Info</th>
			<th>Date added</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each team as member}
			<Row {member} on:memberDeleted={removeMember} />
		{/each}
	</tbody>
</table>

<style>
	th {
		text-align: left;
	}
</style>
