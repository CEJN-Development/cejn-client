<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
    const organizationRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/organizations/${page.params.slug}`);
		if (!organizationRes.ok) return {
			status: organizationRes.status,
			error: new Error("Could not load organization"),
		};

		let organization: Organization = await organizationRes.json();

		return {
			props: {
        organization,
			},
		};
	};
</script>

<script lang="ts">
  import OrganizationForm from '$lib/components/admin/Organizations/OrganizationForm.svelte';
	import type { Organization } from '$lib/types/Organizations';

  export let organization: Organization;
</script>

<h1 class="squish-16 squeeze-16">Our Staff | Edit</h1>

<OrganizationForm {organization} />