<script lang="ts">
  import type { Writer } from "$lib/types/Writers";
  import Row from "./Row.svelte";

  export let writers:Writer[] = [];
  console.log(writers);
  
</script>

<table>
  <tr>
    <th>Full name</th>
    <th>Date added</th>
  </tr>
  {#each writers as writer}
    <Row {writer} />
  {/each}
</table>

<style>
</style>