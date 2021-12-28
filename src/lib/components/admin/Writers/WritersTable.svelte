<script lang="ts">
  import Row from "./Row.svelte";
  import type { Writer } from "$lib/types/Writers";

  export let writers:Writer[] = [];  
</script>

<table>
  <thead>
    <tr>
      <th></th>
      <th>Full name</th>
      <th>Date added</th>
    </tr>
  </thead>
  <tbody> 
    {#each writers as writer}
      <Row {writer} />
    {/each}
  </tbody>
</table>
