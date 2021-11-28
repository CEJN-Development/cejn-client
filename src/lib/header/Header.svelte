<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let showNavbar:boolean = false;
	let linksList:HTMLElement;

	const close = () => {
		showNavbar = false;
	};
	
	onMount(() => {
		Array.from(linksList.getElementsByTagName("li")).forEach(elem => elem.addEventListener("click", close));
	});
</script>

<header>
	<nav>
		<section id="logo" class="left">
			<img src="/favicon.png" alt="Organization logo" />
			<b class="container text-small">
				Chicago Environmental Justice Network
			</b>
		</section>
		<section id="expander" class="right">
			<button class="button" on:click={() => showNavbar = true}>
				&#9776;
			</button>
		</section>
		<section id="links" class:active={showNavbar}>
			<section class="left">
			</section>
			<section class="right">
				<button class="button" on:click={close}>
					X
				</button>
			</section>
			<ul bind:this={linksList}>
				<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Home</a></li>
				<li class:active={$page.path === '/about'}><a sveltekit:prefetch href="/about">About Us</a></li>
				<li class:active={$page.path === '/our-stories'}><a sveltekit:prefetch href="/">Our Stories</a></li>
				<li class:active={$page.path === '/in-the-news'}><a sveltekit:prefetch href="/">CEJN in the News</a></li>
				<li class:active={$page.path === '/who-are-we'}><a sveltekit:prefetch href="/">Who is CEJN</a></li>
				<li class:active={$page.path === '/press-releases'}><a sveltekit:prefetch href="/">Press</a></li>
				<li class:active={$page.path === '/contact'}><a sveltekit:prefetch href="/">Contact</a></li>
			</ul>
		</section>
	</nav>
</header>

<style>
	header {
		display: flex;
	}

	nav {
		display: grid;
		grid-template-areas: "logo expander";
		grid-template-columns: 1fr 1fr;
		width: 100%;
		max-width: 100vw;
		max-height: 4rem;
	}

	#links {
		display: grid;
		position: fixed;
		top: 0;
		left: 100%;
		height: 100%;
		width: 100%;
		max-height: 100vh;
		max-width: 100vw;
		transition: left 0.3s ease-in-out;
		background-color: rgba(255, 255, 255, 1);
		grid-template-areas:
			"left right"
			"links links";
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 4rem 1fr;
	}

	#links.active {
			left: 0%;
		}

	#links > .left {
		grid-area: left;
	}

	#links > .right {
		grid-area: right;
	}

	#logo {
		grid-area: logo;
		display: flex;
		max-height: 100%;
		overflow: hidden;
	}

	#logo b {
		display: flex;
		align-items: center;
		max-width: 8rem;
	}

	#logo img {
		max-height: 5rem;
	}

	#expander {
		grid-area: expander;
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: end;
		padding-right: 0.5rem;
	}

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

	nav a {
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
		header {
			min-width: 100vw;
			display: flex;
			justify-content: center;
		}

		nav {
			grid-template-areas:
				"logo expander"
				"links links";
			max-width: 1000px;
			max-height: inherit;
		}

		#expander {
			visibility: hidden;
		}

		#links {
			position: relative;
			display: flex;
			left: 0;
			grid-area: links;
			justify-content: center;
		}

		#links .left,
		#links .right {
			display: none;
		}

		#links ul {
			flex-direction: row;
		}

		li > a {
			font-size: var(--text-small);
		}
	}
</style>
