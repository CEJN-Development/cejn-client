<script lang="ts">
  import Row from "./Row.svelte";
  import type { Writer } from "$lib/types/Writers";

  export let writers:Writer[] = [];  
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