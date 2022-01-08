<script lang="ts">
  import type { Writer } from "$lib/types/Writers";
  import { getLocaleString } from "$lib/helpers";
  import Icon from "$lib/components/shared/Icon.svelte";
  import CloudinaryImage from "$lib/components/shared/CloudinaryImage.svelte";

  export let writer:Writer;

  let createdDate: string;

  $: {
    createdDate = getLocaleString(new Date(writer.created_at));
  };
</script>

<tr>
  <td>
    <CloudinaryImage
      cloudinaryImageUrl={writer.cloudinary_image_url}
      options={{ height: 40, width: 40, crop: "fill_pad" }}
      classes="border--rounded-24"
    />
  </td>
  <td class="squish-16 squeeze-16">
    <p class="text-strong text-normal">
      {writer.full_name}
    </p>
  </td>
  <td>
    <p class="text-medium text-normal">
      {createdDate}
    </p>
  </td>
  <td>
    <a href={`/admin/writers/edit/${writer.id}`}>
      <Icon
        classes="spread-8 push-8"
        name="edit"
      />
    </a>
    <Icon name="delete" />
  </td>
</tr>
