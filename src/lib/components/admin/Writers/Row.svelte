<script lang="ts">
  import type { Writer } from "$lib/types/Writers";
  import { getLocaleString } from "$lib/helpers";

  export let writer:Writer;

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/cejn-dev/image/upload";
  const cloudinary_public_id = writer?.cloudinary_image_url?.split(CLOUDINARY_BASE_URL)[1];

  let imagePath:string;
  let createdDate:Date = new Date(writer.created_at);

  $: {
    imagePath = cloudinary_public_id
      ? `${CLOUDINARY_BASE_URL}/b_auto,c_fill_pad,g_auto,h_40,w_40${cloudinary_public_id}`
      : "";
  }
</script>

<tr>
  <td>
    <img
      src={imagePath}
    />
  </td>
  <td class="squish-16 squeeze-16">
    <p class="text-strong text-normal">
      {writer.full_name}
    </p>
  </td>
  <td>
    <p class="text-medium text-normal">
      {getLocaleString(createdDate)}
    </p>
  </td>
</tr>

<style>
  img {
    border-radius: 50%;
  }
</style>
