<script lang="ts">
	import { page } from '$app/stores';
	import AdminLinks from './AdminLinks.svelte';

	let showNavbar: boolean = false;

	const open = () => {
		showNavbar = true;
	};

	const close = () => {
		showNavbar = false;
	};
</script>

{#if $page.path !== "/admin/login"}
	<header>
		<div id="top">
			<section id="expander" class="right panel">
				<button class="button button-flat" on:click={open}>
					&#9776;
				</button>
			</section>
			<section id="logo" class="panel squish-16 squeeze-8">
				<img src="/favicon.png" alt="Organization logo" />
				<b class="container text-small">
					Chicago Environmental Justice Network
				</b>
			</section>
		</div>
		<nav>
			<section id="links" class:active={showNavbar}>
				<AdminLinks on:close={close} />
			</section>
		</nav>
	</header>
{/if}

<style>
	header {
		grid-area: navigation;
		display: block;
		top: 0;
		left: 0;
		background: rgba(255, 255, 255, 1);
		box-shadow: 1px 0 5px -1px rgba(50, 50, 50, 0.7);
		border-right: 1px solid rgba(200, 200, 200, 0.75);
		z-index: +1;
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
		max-width: 5rem;
	}

	#logo img {
		max-height: 4rem;
		max-width: 4rem;
	}

	#expander {
		grid-area: expander;
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: end;
	}

	@media screen and (min-width: 700px) {
		header {
			display: block;
		}

		#links {
			position: relative;
			left: 0;
			justify-content: center;
		}
	}
</style>
