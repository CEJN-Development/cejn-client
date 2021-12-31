<script lang="ts">
  import type { Writer } from "$lib/types/Writers";
  import Icon from "$lib/components/admin/shared/Icon.svelte";
  import { createEventDispatcher } from "svelte";

  export let author:Writer;
  export let authoredBy:number[];

  const dispatch = createEventDispatcher();

  const deselect = () => dispatch('deselect', [...authoredBy.filter(id => id != author.id)]);
</script>

<span
  on:click={deselect}
  class="rounded bordered squish-8 squeeze-8 cursor-pointer raised"
>
  {author.full_name}
  <Icon
    name="close"
    alt="button for removing this item from selection"
    height="0.70rem"
    width="0.70rem"
  />
</span>

<style>
  span {
    display: inline-block;
  }
</style>
