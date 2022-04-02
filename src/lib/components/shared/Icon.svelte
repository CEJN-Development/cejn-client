<script lang="ts">
	export let alt: string = '';
	export let classes: string = '';
	export let extraStyles: any = {};
	export let height: string = '1rem';
	export let name: string = '';
	export let width: string = '1rem';

	const sourceUrlString: string = `${import.meta.env.VITE_API_URL}/icons/${name}.svg`;

	let styles = {
		height,
		width,
		...extraStyles
	};

	let stylesString: string = Object.keys(styles)
		.map((key) => `${key}: ${styles[key]};`)
		.join(' ');
</script>

<img {alt} class={classes} src={sourceUrlString} style={stylesString} />
