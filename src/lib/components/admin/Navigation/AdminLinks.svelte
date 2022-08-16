<script lang="ts">
	import { page } from '$app/stores';
</script>

<ul>
	<li class:active={$page.url.pathname === '/'} class="squish-8 squeeze-8 panel">
		<a href="/admin/about">About Us</a>
	</li>
	<li class:active={$page.url.pathname === '/admin/articles'} class="squish-8 squeeze-8 panel">
		<a href="/admin/articles">Articles</a>
	</li>
	<li class:active={$page.url.pathname === '/admin/events'} class="squish-8 squeeze-8 panel">
		<a href="/admin/events">Events</a>
	</li>
	<!-- <li class:active={$page.url.pathname === '/'} class="squish-8 squeeze-8 panel">
    <a href="/admin/home">
      Splash
    </a>
  </li> -->
	<li class:active={$page.url.pathname === '/admin/organizations'} class="squish-8 squeeze-8 panel">
		<a href="/admin/organizations">Organizations</a>
	</li>
	<li
		class:active={$page.url.pathname === '/admin/press_releases'}
		class="squish-8 squeeze-8 panel"
	>
		<a href="/admin/press_releases">Press Releases</a>
	</li>
	<li class:active={$page.url.pathname === '/admin/team'} class="squish-8 squeeze-8 panel">
		<a href="/admin/team">Team</a>
	</li>
	<li class:active={$page.url.pathname === '/admin/writers'} class="squish-8 squeeze-8 panel">
		<a href="/admin/writers">Writers</a>
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
