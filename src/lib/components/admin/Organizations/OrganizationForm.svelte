<script lang="ts">
	import { goto } from '$app/navigation';
  import { logOut } from '$lib/helpers';
  import { aud } from '$lib/stores/UserAgentStore';
  import * as ApiService from "$lib/services/Api";
  import * as FlashMessageService from '$lib/services/FlashMessage';
  import type { Organization, OrganizationCreate, OrganizationUpdate } from '$lib/types/Organizations';
  import Spinner from '$lib/components/shared/Spinner.svelte';

  export let organization: Organization = null;

  let imageUploadInput: HTMLInputElement;
  let photo: string | ArrayBuffer;
  let name: string;
  let blurb: string;
  let body: string;
  let submitting: boolean = false;

  const submit = async () => {
    submitting = true;

    let data: OrganizationCreate = {
      blurb,
      body,
      name,
    };

    if (photo) data.photo = photo;

    const { response, json } = await ApiService.post(
      String(import.meta.env.VITE_API_URL),
      "admin/organizations",
      { organization: data, creds: true },
      { aud: $aud },
    );

    if (response.status == 401) logOut();

    if (response.ok) {
      submitting = false;
      goto("/admin/organizations", { replaceState: false });
      FlashMessageService.setMessage({ message: "Organization successfully created!", type: "success" });
    };
  };

  const update = async () => {
    submitting = true;

    let data: OrganizationUpdate = {
      blurb,
      body,
      name,
    };

    if (photo) data.photo = photo;

    const { response, json } = await ApiService.put(
      String(import.meta.env.VITE_API_URL),
      `admin/organizations/${organization.id}`,
      { organization: data, creds: true },
      { aud: $aud },
    );

    if (response.status == 401) logOut();

    if (response.ok) {
      submitting = false;
      goto("/admin/organizations", { replaceState: false });
      FlashMessageService.setMessage({ message: "Organization successfully updated!", type: "success" });
    };
  };

  const getBaseUrl = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => photo = reader.result;
  };

  const clearImageUploadInput = () => {
    imageUploadInput.files[0] = undefined;
    photo = undefined;
  };

  if (organization) {
    blurb = organization.blurb;
    body = organization.body;
    name = organization.name;
  };
</script>

<form class="squish-24 squeeze-32 flex-row">
  <label for="title" class="text-small text-style-metadata text-style-italic">
    Full name
  </label>
  <input
    name="title"
    type="text"
    class="stack-16 squeeze-8 squish-8"
    bind:value={name}
  />
  <label for="blurb" class="text-small text-style-metadata text-style-italic">
    Blurb
  </label>
  <textarea
    name="blurb"
    class="stack-16 squeeze-8 squish-8 text-medium text-normal"
    rows="5"
    bind:value={blurb}
  />
  <label for="body" class="text-small text-style-metadata text-style-italic">
    Body
  </label>
  <textarea
    name="body"
    class="stack-16 squeeze-8 squish-8 text-medium text-normal"
    rows="15"
    bind:value={body}
  />
  <label for="cover-image" class="text-small text-style-metadata text-style-italic">
    Photo
  </label>
  <input
    type="file"
    name="cover-image"
    accept=".jpeg, .png, .jpg"
    class="stack-16 panel"
    bind:this={imageUploadInput}
    on:change={getBaseUrl}
  />
  <div>
    {#if organization?.id}
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
  </div>
</form>
