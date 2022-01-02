<script lang="ts">
  import type { Bio } from "$lib/types/Bios";
  import { getLocaleString, truncateWithEllipses } from "$lib/helpers";
  import Icon from "$lib/components/shared/Icon.svelte";

  export let bio:Bio;

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/cejn-dev/image/upload";
  const cloudinary_public_id = bio.cloudinary_image_url?.split(CLOUDINARY_BASE_URL)[1];

  let blurb:string;
  let imagePath:string;
	let createdDate:string;

  $: {
    blurb = truncateWithEllipses(bio?.blurb, 300);
    imagePath = cloudinary_public_id
      ? `${CLOUDINARY_BASE_URL}/c_fill,g_auto,h_169,w_300${cloudinary_public_id}`
      : "";
    createdDate = getLocaleString(new Date(bio.created_at));
  };
</script>

<div class="card">
  {#if cloudinary_public_id}
    <img
      src={imagePath}
      alt={bio.name}
      class="stack-8"
    />
  {/if}
  <div class="squeeze-16 stack-8">
    <div class="text-strong text-normal stack-8">
      {bio.name}
    </div>
    <div class="text-thin text-small stack-8">
      <span class="text-style-italic">On:</span>
      {createdDate}
    </div>
    <div class="text-medium text-normal stack-16">
      {blurb}
    </div>
  </div>
  <div class="squeeze-16 flex-column space-between stack-16">
    <a href={`/admin/staff/edit/${bio.id}`}>
      <Icon name="edit" />
    </a>
    <Icon name="delete" />
  </div>
</div>