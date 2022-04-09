<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { logOut } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import type { OrganizationType } from '$lib/types/Organizations';
	import { getLocaleString, truncateWithEllipses } from '$lib/helpers';
	import Icon from '$lib/components/shared/Icon.svelte';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';

	export let organization: OrganizationType;

	let blurb: string;
	let createdDate: string;

	const dispatch = createEventDispatcher();

	const deleteOrganization = async (e) => {
		if (confirm('Are you sure you want to delete this organization?')) {
			const { response } = await ApiService.del(
				String(import.meta.env.VITE_API_URL),
				`admin/organizations/${organization.id}`,
				{ creds: true },
				{ aud: $aud }
			);

			if (response.status == 401) logOut();

			if (response.ok) {
				FlashMessageService.setMessage({
					message: 'Organization successfully deleted!',
					type: 'success'
				});
				dispatch('organizationDeleted', organization);
			} else {
				FlashMessageService.setMessage({
					message: 'Unexpected error. If it persists contact support.',
					type: 'error'
				});
			}
		}
	};

	$: {
		blurb = truncateWithEllipses(organization?.blurb, 300);
		createdDate = getLocaleString(new Date(organization.created_at));
	}
</script>

<div class="card squeeze-16 squish-16">
	<div class="gap-16 stack-8 height-100">
		<div class="flex-row">
			<div class="image">
				<CloudinaryImage
					cloudinaryImageUrl={organization.cloudinary_image_url}
					options={{ height: 405, width: 720, crop: 'fill_pad' }}
					classes="stack-8 border--rounded-16"
				/>
			</div>
		</div>
		<div class="stack-8">
			<div class="text-strong text-normal stack-8">
				{organization.name}
			</div>
			<div class="text-thin text-small stack-8">
				<span class="text-style-italic">Added on:</span>
				{createdDate}
			</div>
			<div class="text-medium text-normal stack-16">
				{@html blurb}
			</div>
		</div>
	</div>
	<div class="squeeze-16 flex-column space-between">
		<a href={`/admin/organizations/edit/${organization.id}`}>
			<Icon name="edit" />
		</a>
		<span class="cursor-pointer" on:click={deleteOrganization}>
			<Icon name="delete" />
		</span>
	</div>
</div>

<style>
	.image {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
</style>
