<script lang="ts">
	import type { OrganizationType } from '$lib/types/Organizations';
	import Card from './Card.svelte';

	export let organizations: OrganizationType[] = [];

	const removeOrganization = (e) => {
		organizations = organizations.filter((organization) => organization.id != e.detail.id);
	};
</script>

<section>
	{#each organizations as organization}
		<Card {organization} on:organizationDeleted={removeOrganization} />
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-gap: 1rem;
	}

	@media screen and (min-width: 900px) {
		section {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
