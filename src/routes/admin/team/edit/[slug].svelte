<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const memberRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${params.slug}`);
		if (!memberRes.ok)
			return {
				status: memberRes.status,
				error: new Error('Could not load member')
			};

		let member: MemberType = await memberRes.json();

		return {
			props: {
				member
			}
		};
	}
</script>

<script lang="ts">
	import MemberForm from '$lib/components/admin/Team/MemberForm.svelte';
	import type { MemberType } from '$lib/types/TeamTypes';

	export let member: MemberType = null;
</script>

<main class="squeeze-24 squish-24">
	<h1 class="stack-24">Team | Edit Member</h1>
	<MemberForm {member} />
</main>
