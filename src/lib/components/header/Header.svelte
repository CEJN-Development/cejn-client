<script lang="ts">
	import Links from './Links.svelte';

	let showNavbar:boolean = false;

	const close = () => {
		showNavbar = false;
	};

	const open = () => {
		showNavbar = true;
	};
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
			<button class="button" on:click={open}>
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
			<Links on:close={close} />
		</section>
	</nav>
</header>

<style>
	header {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 2px 6px 7px rgba(255, 255, 255, 1);
	}

	nav {
		display: grid;
		grid-template-areas: "logo expander";
		grid-template-columns: 1fr 1fr;
		width: 100%;
		max-width: 100vw;
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
		justify-content: flex-end;
		padding-right: 0.5rem;
	}

	@media screen and (min-width: 500px) {
		header {
			min-width: 100vw;
			display: flex;
			justify-content: center;
			padding-bottom: 0.5rem;
		}

		nav {
			grid-template-areas:
				"logo expander"
				"links links";
			max-width: 1000px;
			max-height: inherit;
		}

		#links {
			position: relative;
			display: flex;
			left: 0;
			grid-area: links;
			justify-content: center;
		}

		#expander,
		#links .left,
		#links .right {
			display: none;
		}
	}
</style>
