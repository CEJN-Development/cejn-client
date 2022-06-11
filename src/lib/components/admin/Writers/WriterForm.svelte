<script lang="ts">
	import { goto } from '$app/navigation';
	import { logOut } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import type { Writer, WriterCreate, WriterUpdate } from '$lib/types/Writers';
	import PreviewModal from '../shared/PreviewModal.svelte';
	import Byline from '$lib/components/shared/Byline.svelte';

	export let writer: Writer = null;

	let byline: string = null;
	let imageUploadInput: HTMLInputElement;
	let name: string = null;
	let photo: string | ArrayBuffer;
	let previewWriter: Writer = null;
	let show: boolean = false;
	let submitting: boolean = false;

	const preview = () => {
		previewWriter = {
			full_name: name,
			byline,
			slug: '',
			id: 0,
			created_at: new Date(),
			updated_at: new Date()
		};

		if (!!writer?.id) previewWriter.cloudinary_image_url = writer.cloudinary_image_url;

		show = true;
	};

	const submit = async () => {
		submitting = true;

		let data: WriterCreate = {
			byline,
			full_name: name
		};

		if (photo) data.photo = photo;

		const { response, json } = await ApiService.post(
			String(import.meta.env.VITE_API_URL),
			'admin/writers',
			{ writer: data, creds: true },
			{ aud: $aud }
		);

		if (response.status == 401) logOut();

		if (response.ok) {
			submitting = false;
			goto('/admin/articles', { replaceState: false });
			FlashMessageService.setMessage({ message: 'Writer successfully created!', type: 'success' });
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
		let data: WriterUpdate = {
			byline,
			full_name: name
		};

		if (photo) data.photo = photo;

		const { response, json } = await ApiService.put(
			String(import.meta.env.VITE_API_URL),
			`admin/writers/${writer.id}`,
			{ writer: data, creds: true },
			{ aud: $aud }
		);

		if (response.status == 401) logOut();

		if (response.ok) {
			submitting = false;
			goto('/admin/writers', { replaceState: false });
			FlashMessageService.setMessage({ message: 'Writer successfully created!', type: 'success' });
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

	if (writer) {
		byline = writer.byline;
		name = writer.full_name;
	}
</script>

<form class="flex-row form">
	<label for="title" class="text-small text-style-metadata text-style-italic">Full name</label>
	<input name="title" type="text" class="stack-16 squeeze-8 squish-8" bind:value={name} />
	<label for="body" class="text-small text-style-metadata text-style-italic">Byline</label>
	<textarea
		name="body"
		class="stack-16 squeeze-8 squish-8 text-medium text-normal"
		rows="5"
		bind:value={byline}
	/>
	<label for="cover-image" class="text-small text-style-metadata text-style-italic">Photo</label>
	<input
		type="file"
		name="cover-image"
		accept=".jpeg, .png, .jpg"
		class="stack-16 panel"
		bind:this={imageUploadInput}
		on:change={getBaseUrl}
	/>
	<div>
		{#if writer?.id}
			<button class="panel button spread-8" type="submit" on:click|preventDefault={update}>
				Update
			</button>
		{:else}
			<button class="panel button spread-8" type="submit" on:click|preventDefault={submit}>
				Save
			</button>
		{/if}
		<button class="panel button spread-8" type="submit" on:click|preventDefault={preview}>
			Preview
		</button>
		<a href="/admin/writers"> Cancel </a>
	</div>
</form>
<PreviewModal bind:show>
	<div class="squeeze-24 squish-24">
		<Byline writer={previewWriter} previewPhoto={photo} />
	</div>
</PreviewModal>
