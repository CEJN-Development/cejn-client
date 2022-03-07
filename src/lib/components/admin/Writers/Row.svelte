<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { logOut } from '$lib/helpers';
  import { aud } from '$lib/stores/UserAgentStore';
  import * as ApiService from '$lib/services/Api';
  import * as FlashMessageService from '$lib/services/FlashMessage';
  import type { Writer } from "$lib/types/Writers";
  import { getLocaleString } from "$lib/helpers";
  import Icon from "$lib/components/shared/Icon.svelte";
  import CloudinaryImage from "$lib/components/shared/CloudinaryImage.svelte";

  export let writer:Writer;

  let createdDate: string;

  const dispatch = createEventDispatcher();

  const deleteWriter = async (e) => {
    if (confirm("Are you sure you want to delete this writer?")) {
      const { response } = await ApiService.del(
        String(import.meta.env.VITE_API_URL),
        `admin/writers/${writer.id}`,
        { creds: true },
        { aud: $aud },
      );

      if (response.status == 401) logOut();

      if (response.ok) {
        FlashMessageService.setMessage({ message: "Writer successfully deleted!", type: "success" });
        dispatch("writerDeleted", writer);
      } else {
        FlashMessageService.setMessage({
          message: "Unexpected error. If it persists contact support.",
          type: "error"
        });
      };
    }
  };

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
    <span class="cursor-pointer" on:click={deleteWriter}>
      <Icon name="delete" />
    </span>
  </td>
</tr>
