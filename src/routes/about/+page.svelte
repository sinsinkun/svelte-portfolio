<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  import LazyWrapper from "$lib/lazyWrapper.svelte";

  // play animation on page load
  let loaded = false;
  onMount(() => {
    loaded = true;
  })
</script>

<style>
  h1 {
    margin-bottom: 16px;
  }
  p {
    width: 90%;
    max-width: 700px;
    margin: auto;
  }
</style>

<svelte:head>
  <title>Web Portfolio - About</title>
</svelte:head>

<div class="content-root">
  {#if loaded}
    <h1 in:fly={{ x:-50, duration:900 }}>
      About Me
    </h1>
    <LazyWrapper>
      <p in:fly={{ x:50, duration:900, delay:100 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
        culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </LazyWrapper>
  {/if}
</div>