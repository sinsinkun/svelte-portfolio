<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { base } from "$app/paths";
  import { LazyWrapper } from "$lib";

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
    max-width: 800px;
    margin: auto;
  }
  .link {
    text-decoration: underline;
  }
</style>

<svelte:head>
  <title>Web Portfolio</title>
</svelte:head>

<div class="content-root">
  {#if loaded}
    <img src="{base}/icons/sinsin_v3.png" alt="logo" />
    <br />
    <h1 in:fly={{ x:-50, duration:900 }}>
      Introduction
    </h1>
    <p in:fly={{ x:50, duration:900 }}>
      My name is JingChang Xiao, but most people call me Chang. Welcome to my portfolio website.
    </p>
    <br />
    <LazyWrapper>
      <p in:fly={{ x:-50, duration:900, delay:100 }}>
        With this portfolio, I am hoping to demonstrate that I am very experienced in all aspects of
        web design, including Frontend, Backend, and DevOps. This website was built using svelte and
        responsive, meaning that it will adapt the placement of page elements based on the screen size of 
        your device. The build version is statically generated for better load times, and scripting
        is done in TypeScript to maintain type safety. All JS/TS functionality is custom built and 
        all CSS is written by me.
      </p>
    </LazyWrapper>
    <br />
    <LazyWrapper>
      <p in:fly={{ x:50, duration:900, delay:100 }}>
        This website is hosted on github pages. Although I am most familiar with hosting via AWS S3 
        static web hosting, something simpler like netlify, vercel, or github pages is better suited 
        for a simple static website like this one. Since I require no database connections or any
        sensitive data to be sent to the client, github pages was the simplest solution. CICD is 
        handled through github actions.
      </p>
    </LazyWrapper>
    <br />
    <LazyWrapper>
      <p in:fly={{ x:-50, duration:900, delay:100 }}>
        If you would like to see further demonstrations of my capacity as a developer, please feel free
        to visit <a class="link" href="https://github.com/sinsinkun" target="_blank">my github</a>, 
        or take a look at the <a class="link" href="{base}/projects">projects</a> page. I hope you enjoy my website!
      </p>
    </LazyWrapper>
    <br /><br /><br />
    <!-- TODO: more content -->
  {/if}
</div>
