<script lang="ts">
  import Login from '$lib/components/admin/shared/Login.svelte';
</script>

<Login />

<style>
  :global(#admin) {
    grid-template-columns: 1fr !important;
    grid-template-areas: "content" !important;
    place-content: center;
  }

  :global(#admin > main) {
    display: flex;
    justify-content: center;
  }
</style>