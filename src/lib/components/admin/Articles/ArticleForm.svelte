<script lang="ts">
	import { goto } from '$app/navigation';
	import { logOut, numericArrayEquality } from '$lib/helpers';
	import { aud } from '$lib/stores/UserAgentStore';
	import * as ApiService from '$lib/services/Api';
	import * as FlashMessageService from '$lib/services/FlashMessage';
	import type { Writer } from '$lib/types/Writers';
	import type { MultiSelectObject } from '$lib/types/MultiSelect';
	import type { ArticleType, ArticleCreate, ArticleUpdate } from '$lib/types/Articles';
	import AuthorMultiSelect from '$lib/components/admin/shared/MultiSelect.svelte';
	import Base64Image from '$lib/components/shared/Base64Image.svelte';
	import CloudinaryImage from '$lib/components/shared/CloudinaryImage.svelte';
	import PreviewModal from '$lib/components/admin/shared/PreviewModal.svelte';
	import Spinner from '$lib/components/shared/Spinner.svelte';
	import Article from '$lib/components/Articles/Article.svelte';

	export let article: ArticleType = null;
	export let writers: Writer[];

	let authorIds: number[] = [];
	let caption: string;
	let body: string;
	let excerpt: string;
	let existingArticle: boolean = false;
	let hasImage: boolean = false;
	let imageUploadInput: HTMLInputElement;
	let multiSelectWriters: MultiSelectObject[];
	let photo: string | ArrayBuffer;
	let previewArticle: ArticleType = null;
	let show: boolean = false;
	let submitting: boolean = false;
	let title: string;

	let authorIdsOnLoad: number[] = article?.authors.map((author) => author.id).sort((a, b) => a - b);

	const preview = () => {
		let authors = writers.filter((writer) => authorIds.includes(writer.id));

		previewArticle = {
			authors,
			body,
			caption,
			created_at: new Date(),
			excerpt,
			id: 0,
			slug: '',
			title,
			updated_at: new Date()
		};

		if (!!article?.id) previewArticle.cloudinary_image_url = article.cloudinary_image_url;

		show = true;
	};

	const submit = async () => {
		submitting = true;

		let data: ArticleCreate = {
			body,
			caption,
			excerpt,
			title,
			author_ids: [...authorIds]
		};

		if (photo) data.photo = photo;

		const { response, json } = await ApiService.post(
			String(import.meta.env.VITE_API_URL),
			'admin/articles',
			{ article: data, creds: true },
			{ aud: $aud }
		);

		if (response.status == 401) logOut();

		if (response.ok) {
			submitting = false;
			goto('/admin/articles', { replaceState: false });
			FlashMessageService.setMessage({ message: 'Article successfully created!', type: 'success' });
		} else {
			submitting = false;
			FlashMessageService.setMessage({
				message: 'Unexpected error. If it persists contact support.',
				type: 'error'
			});
		}
	};

	const update = async () => {
		submitting = true;

		let data: ArticleUpdate = {
			body,
			caption,
			excerpt,
			title
		};

		if (photo) data.photo = photo;
		// we dont want to update this unless there's any changes
		if (!numericArrayEquality(authorIdsOnLoad, authorIds)) data.author_ids = [...authorIds];

		const { response, json } = await ApiService.put(
			String(import.meta.env.VITE_API_URL),
			`admin/articles/${article.id}`,
			{ article: data, creds: true },
			{ aud: $aud }
		);

		if (response.status == 401) logOut();

		if (response.ok) {
			submitting = false;
			goto('/admin/articles', { replaceState: false });
			FlashMessageService.setMessage({ message: 'Article successfully updated!', type: 'success' });
		}
	};

	const saveDraft = () => {
		console.log(body, 'body');
		console.log(caption, 'caption');
		console.log(excerpt, 'excerpt');
		console.log(photo, 'photo');
		console.log(title, 'title');
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

	if (article) {
		authorIds = article.authors.map((author) => author.id);
		caption = article.caption;
		body = article.body;
		excerpt = article.excerpt;
		title = article.title;
	}

	$: {
		existingArticle = !!article?.id;
		hasImage = !!article?.cloudinary_image_url || !!photo;
		multiSelectWriters = writers.map((writer) => {
			return {
				text: writer.full_name,
				key: writer.id,
				elementName: writer.slug
			};
		});
	}
</script>

<form class="flex-row form">
	<label for="title" class="text-small text-style-metadata text-style-italic">Title</label>
	<input name="title" type="text" class="stack-16 squeeze-8 squish-8" bind:value={title} />
	<label for="author" class="text-small text-style-metadata text-style-italic">Author(s)</label>
	<AuthorMultiSelect
		bind:objectArray={multiSelectWriters}
		bind:keyArray={authorIds}
		className={'Writer'}
	/>
	<label for="excerpt" class="text-small text-style-metadata text-style-italic">Excerpt</label>
	<textarea
		name="excerpt"
		class="stack-16 squeeze-8 squish-8 text-medium text-normal"
		rows="4"
		bind:value={excerpt}
	/>
	<label for="body" class="text-small text-style-metadata text-style-italic">Body</label>
	<textarea
		name="body"
		class="stack-16 squeeze-8 squish-8 text-medium text-normal"
		rows="20"
		bind:value={body}
	/>
	<label for="cover-image" class="text-small text-style-metadata text-style-italic">
		Cover Image
	</label>
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
			<Base64Image {photo} alt={caption} classes="stack-8" />
		{:else if article.cloudinary_image_url}
			<label for="current-image" class="text-small text-style-metadata text-style-italic">
				Current Image
			</label>
			<CloudinaryImage
				cloudinaryImageUrl={article.cloudinary_image_url}
				options={{ height: 720, width: 1280, crop: 'fill' }}
				classes="stack-8"
			/>
		{/if}
	{/if}
	<label for="caption" class="text-small text-style-metadata text-style-italic">Caption</label>
	<input name="caption" type="text" class="stack-16 squeeze-8 squish-8" bind:value={caption} />
	<div class="flex-column align-center">
		{#if existingArticle}
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
					Publish
				{/if}
			</button>
		{/if}
		<button class="panel button spread-8" type="submit" on:click|preventDefault={preview}>
			Preview
		</button>
		<a class="push-8" href="/admin/articles">Cancel</a>
	</div>
</form>
<PreviewModal bind:show>
	<div class="squeeze-24 squish-24">
		<Article article={previewArticle} previewPhoto={photo} />
	</div>
</PreviewModal>

<style>
	button[disabled] {
		cursor: wait;
	}
</style>
