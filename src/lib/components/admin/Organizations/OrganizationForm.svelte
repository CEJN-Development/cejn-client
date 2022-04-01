<script lang="ts">
	import { goto } from '$app/navigation';
	import { logOut } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import type {
		OrganizationType,
		OrganizationCreate,
		OrganizationUpdate
	} from '$lib/types/Organizations';
	import Spinner from '$lib/components/shared/Spinner.svelte';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';
	import Base64Image from '$lib/components/shared/Base64Image.svelte';
	import Organization from '$lib/components/Organizations/Organization.svelte';
	import PreviewModal from '$lib/components/admin/shared/PreviewModal.svelte';

	export let organization: OrganizationType = null;

	let blurb: string;
	let body: string;
	let exisitingOrganization: boolean = false;
	let hasImage: boolean = false;
	let imageUploadInput: HTMLInputElement;
	let photo: string | ArrayBuffer;
	let previewOrganization: OrganizationType = null;
	let name: string = null;
	let show: boolean = false;
	let submitting: boolean = false;

	const preview = () => {
		previewOrganization = {
			body,
			created_at: new Date(),
			updated_at: new Date(),
			slug: '',
			name,
			id: 0
		};
		if (exisitingOrganization)
			previewOrganization.cloudinary_image_url = organization.cloudinary_image_url;

		show = true;
	};

	const submit = async () => {
		submitting = true;

		let data: OrganizationCreate = {
			blurb,
			body,
			name
		};

		if (photo) data.photo = photo;

		const { response, json } = await ApiService.post(
			String(import.meta.env.VITE_API_URL),
			'admin/organizations',
			{ organization: data, creds: true },
			{ aud: $aud }
		);

		if (response.status == 401) logOut();

		if (response.ok) {
			submitting = false;
			goto('/admin/organizations', { replaceState: false });
			FlashMessageService.setMessage({
				message: 'Organization successfully created!',
				type: 'success'
			});
		} else {
			submitting = false;
			if (response.status == 422) {
				json.messages.forEach((message: string) =>
					FlashMessageService.setMessage({
						message,
						type: 'error'
					})
				);
			} else {
				FlashMessageService.setMessage({
					message: 'An unexpected error occurred. If it persists, contact support.',
					type: 'error'
				});
			}
		}
	};

	const update = async () => {
		submitting = true;

		let data: OrganizationUpdate = {
			blurb,
			body,
			name
		};

		if (photo) data.photo = photo;

		const { response, json } = await ApiService.put(
			String(import.meta.env.VITE_API_URL),
			`admin/organizations/${organization.id}`,
			{ organization: data, creds: true },
			{ aud: $aud }
		);

		if (response.status == 401) logOut();

		if (response.ok) {
			submitting = false;
			goto('/admin/organizations', { replaceState: false });
			FlashMessageService.setMessage({
				message: 'Organization successfully updated!',
				type: 'success'
			});
		} else {
			submitting = false;
			if (response.status == 422) {
				json.messages.forEach((message: string) =>
					FlashMessageService.setMessage({
						message,
						type: 'error'
					})
				);
			} else {
				FlashMessageService.setMessage({
					message: 'An unexpected error occurred. If it persists, contact support.',
					type: 'error'
				});
			}
		}
	};

	const getBaseUrl = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => (photo = reader.result);
	};

	const clearImageUploadInput = () => {
		imageUploadInput.files[0] = undefined;
		photo = undefined;
	};

	if (organization) {
		blurb = organization.blurb;
		body = organization.body;
		name = organization.name;
	}

	$: {
		exisitingOrganization = !!organization?.id;
		hasImage = !!organization?.cloudinary_image_url || !!photo;
	}
</script>

<form class="flex-row form">
	<label for="title" class="text-small text-style-metadata text-style-italic"> Name </label>
	<input name="title" type="text" class="stack-16 squeeze-8 squish-8" bind:value={name} />
	<label for="blurb" class="text-small text-style-metadata text-style-italic"> Blurb </label>
	<textarea
		name="blurb"
		class="stack-16 squeeze-8 squish-8 text-medium text-normal"
		rows="5"
		bind:value={blurb}
	/>
	<label for="body" class="text-small text-style-metadata text-style-italic"> Body </label>
	<textarea
		name="body"
		class="stack-16 squeeze-8 squish-8 text-medium text-normal"
		rows="15"
		bind:value={body}
	/>
	<label for="cover-image" class="text-small text-style-metadata text-style-italic"> Photo </label>
	<input
		type="file"
		name="cover-image"
		accept=".jpeg, .png, .jpg"
		class="stack-16 panel"
		bind:this={imageUploadInput}
		on:change={getBaseUrl}
	/>
	{#if hasImage}
		{#if photo}
			<label for="new-image" class="text-small text-style-metadata text-style-italic">
				New Image
			</label>
			<Base64Image {photo} classes="stack-8" />
		{:else if organization.cloudinary_image_url}
			<label for="current-image" class="text-small text-style-metadata text-style-italic">
				Current Image
			</label>
			<CloudinaryImage
				cloudinaryImageUrl={organization.cloudinary_image_url}
				options={{ height: 720, width: 1280, crop: 'fill' }}
				classes="stack-16"
			/>
		{/if}
	{/if}
	<div>
		{#if exisitingOrganization}
			<button
				class="panel button spread-8"
				disabled={submitting}
				type="submit"
				on:click|preventDefault={update}
			>
				{#if submitting}
					<Spinner />
				{:else}
					Update
				{/if}
			</button>
		{:else}
			<button
				class="panel button spread-8"
				disabled={submitting}
				type="submit"
				on:click|preventDefault={submit}
			>
				{#if submitting}
					<Spinner />
				{:else}
					Save
				{/if}
			</button>
		{/if}
		<button class="panel button spread-8" type="submit" on:click|preventDefault={preview}>
			Preview
		</button>
		<a href="/admin/organizations"> Cancel </a>
	</div>
</form>
<PreviewModal bind:show>
	<div class="squeeze-24 squish-24">
		<Organization organization={previewOrganization} previewPhoto={photo} />
	</div>
</PreviewModal>
