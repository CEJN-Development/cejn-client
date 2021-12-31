<script lang="ts">
  export let name:string = "";
  export let height:string = "1rem";
  export let width:string = "1rem";
  export let alt:string = "";
  export let classes:string = "";
  export let extraStyles:any = {};

  const sourceUrlString:string = `${import.meta.env.VITE_API_URL}/icons/${name}.svg`;

  let styles = {
    height,
    width,
    ...extraStyles
  };

  let stylesString:string = Object
    .keys(styles)
    .map(key => `${key}: ${styles[key]};`)
    .join(" ");
</script>

<img
  alt={alt}
  class={classes}
  src={sourceUrlString}
  style={stylesString}
/>