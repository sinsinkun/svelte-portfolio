<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

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
  <title>Web Portfolio</title>
</svelte:head>

<div class="content-root">
  {#if loaded}
    <div>[hero image]</div>
    <br />
    <h1 in:fly={{ x:-50, duration:900 }}>
      Introduction
    </h1>
    <p in:fly={{ x:50, duration:900 }}>
      My name is JingChang Xiao, but most people call me Chang. Welcome to my portfolio website.
    </p>
    <br />
    <p in:fly={{ x:-50, duration:900, delay:100 }}>
      With this portfolio, I am hoping to demonstrate that I am very experienced in all aspects of
      web design, including Frontend, Backend, and DevOps. This website was built using svelte and
      responsive, meaning that it will adapt the placement of page elements based on the screen size of 
      your device. The build version is statically generated for better load times, and scripting
      is done in TypeScript to maintain type safety. All JS/TS functionality is custom built and 
      all CSS is written by me.
    </p>
    <br />
    <p in:fly={{ x:50, duration:900, delay:200 }}>
      The backend is currently undecided. I am most familiar with hosting via AWS S3 static web hosting,
      though something simpler like netlify or vercel may be better for a simple static website
      like this one. No database or CICD is currently planned to be employed.
    </p>
    <br />
    <p in:fly={{ x:-50, duration:900, delay:300 }}>
      If you would like to see further demonstrations of my capacity as a developer, please feel free
      to visit my github. I hope you enjoy my website!
    </p>
  {/if}
</div>
