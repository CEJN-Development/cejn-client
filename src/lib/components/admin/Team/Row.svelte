<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { logOut } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import { getLocaleString } from '$lib/helpers';
	import Icon from '$lib/components/shared/Icon.svelte';
	import type { MemberType } from '$lib/types/TeamTypes';
	import { user } from '$lib/stores/UserStore';

	export let member: MemberType;

	let createdDate: string;
	let userId: number;

	const dispatch = createEventDispatcher();

	const deleteMember = async (e) => {
		if (confirm('Are you sure you want to delete this member?')) {
			const { response } = await ApiService.del(
				String(import.meta.env.VITE_API_URL),
				`admin/users/${member.id}`,
				{ creds: true },
				{ aud: $aud }
			);

			if (response.status == 401) logOut();

			if (response.ok) {
				FlashMessageService.setMessage({
					message: 'Member successfully deleted!',
					type: 'success'
				});
				dispatch('memberDeleted', member);
			} else {
				FlashMessageService.setMessage({
					message: 'Unexpected error. If it persists contact support.',
					type: 'error'
				});
			}
		}
	};

	$: {
		createdDate = getLocaleString(new Date(member.created_at));
		userId = $user.user?.id;
	}
</script>

<tr>
	<td class="squish-16 squeeze-16">
		<p class="text-strong text-normal">
			{member.email}
		</p>
	</td>
	<td>
		<p class="text-medium text-small">
			{createdDate}
		</p>
	</td>
	<td>
		{#if userId == member.id}
			<a href={`/admin/team/edit/${member.id}`}>
				<Icon classes="spread-8 push-8" name="edit" />
			</a>
		{/if}
		<span class="cursor-pointer" on:click={deleteMember}>
			<Icon name="delete" />
		</span>
	</td>
</tr>
