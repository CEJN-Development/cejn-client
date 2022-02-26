<script lang="ts">
  import type { Writer } from "$lib/types/Writers";

  export let author: Writer;
  export let index: number;
  export let end: boolean;
</script>

<a href={`/writers/${author.slug}`}>{author.full_name}</a>{#if !end},&nbsp;{/if}
