<script lang="ts">
	import { page } from '$app/stores';
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

	const close = () => {
    dispatch("close");
	};
</script>

<ul>
	<li class:active={$page.path === '/'} class="squish-8 squeeze-8 panel">
    <a href="/admin/about" on:click={close}>
      About Us
    </a>
  </li>
	<li class:active={$page.path === '/'} class="squish-8 squeeze-8 panel">
    <a href="/admin/articles" on:click={close}>
      Our Stories
    </a>
  </li>
  <li class:active={$page.path === '/'} class="squish-8 squeeze-8 panel">
    <a href="/admin/home" on:click={close}>
      Splash
    </a>
  </li>
	<li class:active={$page.path === '/'} class="squish-8 squeeze-8 panel">
    <a href="/admin/bios" on:click={close}>
      Who is CEJN
    </a>
  </li>
</ul>

<style>
  ul {
		position: relative;
		padding: 0;
		margin: 0;
		list-style: none;
	}

  a {
		color: var(--heading-color);
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}

  @media screen and (min-width: 500px) {
		li > a {
			font-size: var(--text-medium);
		}
  }
</style>