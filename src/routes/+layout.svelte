<script lang="ts">
  import { onMount } from "svelte";
  import { Navbar, Footer } from "$lib";
  import { winW, winH } from "$lib/mediaQuery";

  // global media query listener
  const resizeListener = (e: UIEvent) => {
    const target = e.target as Window;
    winW.set(target?.innerWidth || 0);
    winH.set(target?.innerHeight || 0);
  };

  onMount(() => {
    if (!window) return;
    winW.set(window.innerWidth || 0);
    winH.set(window.innerHeight || 0);
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    }
  })
</script>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(body) {
    padding: 0;
    margin: 0;
    font-family: "Segoe UI",Tahoma,Geneva,Verdana,sans-serif;
    box-sizing: content-box;
    /* Custom colors */
    --bg-color-1: rgb(26, 26, 27);
    --bg-color-2: rgb(35, 30, 30);
    --bg-color-3: rgb(42, 42, 51);
    --bg-color-4: rgb(136, 136, 136);
    --bg-color-5: rgb(187, 187, 187);
    --color-1: rgb(255,255,255);
    --color-1-50: rgba(255,255,255,0.5);
    --color-2: rgb(59, 196, 238);
    --color-3: rgb(40, 97, 182);
    --color-4: rgb(211, 44, 128);
    --color-5: rgb(10, 10, 10);
    --color-warn: rgb(245, 184, 71);
    --color-error: rgb(206, 39, 39);
  }

  :global(body[data-theme='light']) {
    --bg-color-1: rgb(224, 224, 224);
    --bg-color-2: rgb(230, 196, 196);
    --bg-color-3: rgb(182, 182, 214);
    --bg-color-4: rgb(117, 116, 116);
    --bg-color-5: rgb(68, 68, 68);
    --color-1: rgb(0,0,0);
    --color-1-50: rgba(0,0,0,0.5);
    --color-2: rgb(23, 15, 134);
    --color-3: rgb(57, 112, 214);
    --color-4: rgb(119, 16, 16);
    --color-5: rgb(196, 196, 196);
  }

  /* Remove header margins by default */
  :global(h1, h2, h3, h4, h5, h6) {
    margin: 0;
  }

  /* Remove underlines for links by default */
  :global(a:link) { text-decoration: none; color: inherit; }
  :global(a:visited) { text-decoration: none; color: inherit; }
  :global(a:hover) { text-decoration: none; color: inherit; }
  :global(a:active) { text-decoration: none; color: inherit; }

  /* Custom scrollbar */
  /* width */
  :global(::-webkit-scrollbar) {
    width: 10px;
  }
  /* Track */
  :global(::-webkit-scrollbar-track) {
    background: #f1f1f1;
  }
  /* Handle */
  :global(::-webkit-scrollbar-thumb) {
    background: #888;
  }
  /* Handle on hover */
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #555;
  }

  /* Background for main body */
  .global-container {
    position: relative;
    background-color: var(--bg-color-3);
    color: var(--color-1);
    margin: 0;
    text-align: center;
    min-height: 100vh;
    padding-top: 48px;
  }

  :global(.content-root) {
    max-width: 1400px;
    width: 80%;
    margin: auto;
    padding: 16px;
    background: linear-gradient(#1a1a1b22, #1a1a1b88 200px, #1a1a1bee);
    min-height: calc(100vh - 80px);
    overflow-x: hidden;

    @media (max-width: 900px) {
      width: 100%;
    }
  }
  :global(body[data-theme='light'] .content-root) {
    background: linear-gradient(#e6ecec22, #e6ecec88 200px, #e6ececee);
  }
</style>

<Navbar />
<main class="global-container">
  <slot />
  <Footer />
</main>