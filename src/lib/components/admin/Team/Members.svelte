<script lang="ts">
	import Row from './Row.svelte';
	import type { MemberType } from '$lib/types/TeamTypes';

	export let team: MemberType[] = [];

	const removeMember = (e) => {
		team = team.filter((member) => member.id != e.detail.id);
	};
</script>

<table>
	<thead>
		<tr>
			<th>Email</th>
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
