<script lang="ts">
  import type { Writer } from "$lib/types/Writers";

  export let writer:Writer;
</script>

<tr>
  <td class="squish-16 squeeze-16">
    <p class="text-strong text-normal">
      {writer.full_name}
    </p>
  </td>
  <td>
    <p class="text-medium text-normal">
      {writer.created_at}
    </p>
  </td>
</tr>