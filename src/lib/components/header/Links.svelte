<script lang="ts">
	import { page } from '$app/stores';
  import { createEventDispatcher } from "svelte";
  
  const dispatch = createEventDispatcher();
	const close = () => {
    dispatch("close");
	};
</script>

<ul>
  <li class:active={$page.path === '/'}>
    <a href="/" on:click={close}>
      Home
    </a>
  </li>
  <li class:active={$page.path === '/about'}>
    <a sveltekit:prefetch href="/about" on:click={close}>
      About Us
    </a>
  </li>
  <li class:active={$page.path === '/our-stories'}>
    <a href="/articles" on:click={close}>
      Our Stories
    </a>
  </li>
  <!-- <li class:active={$page.path === '/in-the-news'}>
    <a href="/" on:click={close}>
      CEJN in the News
    </a>
  </li> -->
  <li class:active={$page.path === '/who-is-cejn'}>
    <a href="/#who-are-we" on:click={close}>
      Who is CEJN
    </a>
  </li>
  <!-- <li class:active={$page.path === '/press-releases'}>
    <a href="/" on:click={close}>
      Press
    </a>
  </li> -->
  <li class:active={$page.path === '/contact'}>
    <a sveltekit:prefetch href="/" on:click={close}>
      Contact
    </a>
  </li>
</ul>

<style>
  ul {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0;
		margin: 0;
		list-style: none;
		grid-area: links;
	}

	li {
		position: relative;
		height: 100%;
	}

  a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}

  @media screen and (min-width: 500px) {
    ul {
			flex-direction: row;
		}

		li > a {
			font-size: var(--text-small);
		}
  }
</style>