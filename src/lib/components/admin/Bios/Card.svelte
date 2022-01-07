<script lang="ts">
  import type { Bio } from "$lib/types/Bios";
  import { getLocaleString, truncateWithEllipses } from "$lib/helpers";
  import Icon from "$lib/components/shared/Icon.svelte";
  import CloudinaryImage from "$lib/components/shared/CloudinaryImage.svelte";

  export let bio: Bio;

  let blurb: string;
	let createdDate: string;

  $: {
    blurb = truncateWithEllipses(bio?.blurb, 300);
    createdDate = getLocaleString(new Date(bio.created_at));
  };
</script>

<div class="card squeeze-16 squish-16">
  <div class="flex-column gap-16 stack-8">
    <CloudinaryImage
      cloudinaryImageUrl={bio.cloudinary_image_url}
      options={{ height: 300, width: 169 }}
      classes="stack-8 border--rounded-16"
    />
    <div class="stack-8">
      <div class="text-strong text-normal stack-8">
        {bio.name}
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
    <a href={`/admin/staff/edit/${bio.id}`}>
      <Icon name="edit" />
    </a>
    <Icon name="delete" />
  </div>
</div>
