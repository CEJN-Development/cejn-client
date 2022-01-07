<script lang="ts">
  import { aud } from '$lib/stores/UserAgentStore';
  import * as ApiService from "$lib/services/ApiService";
  import type { Bio, BioCreate, BioUpdate } from '$lib/types/Bios';

  export let bio: Bio = null;

  let imageUploadInput: HTMLInputElement;
  let photo: string | ArrayBuffer;
  let name: string;
  let blurb: string;
  let body: string;

  const submit = async () => {
    let data: BioCreate = {
      blurb,
      body,
      name,
    };

    if (photo) data.photo = photo;

    const { response, json } = await ApiService.post(
      String(import.meta.env.VITE_API_URL),
      "admin/bios",
      { bio: data, creds: true },
      { aud: $aud },
    );
  };

  const update = async () => {
    let data: BioUpdate = {
      blurb,
      body,
      name,
    };

    if (photo) data.photo = photo;

    const { response, json } = await ApiService.put(
      String(import.meta.env.VITE_API_URL),
      `admin/bios/${bio.id}`,
      { bio: data, creds: true },
      { aud: $aud },
    );
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

  if (bio) {
    blurb = bio.blurb;
    body = bio.body;
    name = bio.name;
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
    {#if bio?.id}
      <button
        class="panel button spread-8"
        type="submit"
        on:click|preventDefault={update}
      >
        Update
      </button>
    {:else}
      <button
        class="panel button spread-8"
        type="submit"
        on:click|preventDefault={submit}
      >
        Save
      </button>
    {/if}
  </div>
</form>
