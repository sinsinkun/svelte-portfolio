<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { base } from "$app/paths";
  import { LazyWrapper, DragDrop } from "$lib";

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
  .drag-drop {
    width: 90%;
    max-width: 800px;
    margin: auto;
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
        is done in TypeScript to maintain type safety.
      </p>
    </LazyWrapper>
    <br />
    <LazyWrapper>
      <p in:fly={{ x:50, duration:900, delay:100 }}>
        If your browser supports WebGL, you will see a cube flying around in the background,
        tracking the movements of the mouse. This is rendered through the WebGL API available on all
        major browsers, using the ThreeJS WebGL library. This effect is disabled for mobile devices
        due to the relatively high graphics requirements.
      </p>
    </LazyWrapper>
    <br />
    <LazyWrapper>
      <p in:fly={{ x:-50, duration:900, delay:100 }}>
        This website is hosted on github pages. Although I am most familiar with hosting via AWS S3 
        static web hosting, something simpler like netlify, vercel, or github pages is better suited 
        for a simple static website like this one. Since I require no database connections or any
        sensitive data to be sent to the client, github pages was the simplest solution. CICD is 
        handled through github actions.
      </p>
    </LazyWrapper>
    <br />
    <LazyWrapper>
      <p in:fly={{ x:50, duration:900, delay:100 }}>
        If you would like to see further demonstrations of my capacity as a developer, please feel free
        to visit <a class="link" href="https://github.com/sinsinkun" target="_blank">my github</a>, 
        or take a look at the <a class="link" href="{base}/projects">projects</a> page. I hope you enjoy my website!
      </p>
    </LazyWrapper>
    <br /><br />
    <h1 in:fly={{ x:-50, duration:900 }}>Demos</h1>
    <!-- Suika clone link -->
    <LazyWrapper>
      <div in:fly={{ x:50, duration:900, delay:100 }}>
        <h3>Suika Game Clone</h3>
        <p>
          This is a small project I threw together over a long weekend. It's a clone of a 
          popular game on the Switch that is only available in Japan (as of the time of this
          writing). I was inspired by seeing other people making their own versions, so I
          decided to give it a shot myself. You can play the WebAssembly compiled version
          <a href="https://sinsinkun.github.io/suika-clone" target="_blank"><u>here</u></a>.
        </p>
        <br />
        <img src="{base}/assets/suika-clone.png" alt="suika clone screenshot" width="50%" />
      </div>
    </LazyWrapper>
    <br />
    <!-- Drag and drop demo -->
    <LazyWrapper>
      <div class="drag-drop" in:fly={{ x:-50, duration:900, delay:100 }}>
        <DragDrop />
      </div>
    </LazyWrapper>
    <br />
    <!-- TODO: more content -->
  {/if}
</div>
