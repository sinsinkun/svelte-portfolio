<script lang="ts">
  import { fly } from "svelte/transition";
  import { page } from '$app/stores';
  import { base } from "$app/paths";

  import { FancyButton } from "$lib";
  import { viewType } from "./mediaQuery";

  let fullView = false;
  viewType.subscribe(type => {
    switch (type) {
      case "md":
      case "lg":
      case "xl":
        fullView = true;
        break;
      case "xs":
      case "sm":
      default:
        fullView = false;
        break;
    }
  })

  // typescript interfaces
  interface NavOption {
    url: string,
    title: string,
    active: boolean,
  }

  // nav options
  let navOptions: NavOption[] = [
    { url:base, title: "Home", active:true },
    { url:base + "/projects", title: "Projects", active:false },
    { url:base + "/about", title: "About Me", active:false },
  ]
  let sideMenuOpen = false;

  // react to navigation event
  page.subscribe((navEvent) => {
    if (!navEvent) return;
    let newRoute = navEvent?.route?.id;
    navOptions = navOptions.map(option => {
      let newOption = { ...option};
      if (newRoute === option.url) newOption.active = true;
      else newOption.active = false;
      return newOption;
    })
  })

  // mobile menu button handler
  function toggleSideMenu() {
    sideMenuOpen = !sideMenuOpen;
  }

  // toggle theme
  let theme = 'dark';
  function toggleTheme() {
    if (!document) return;
    if (document.body.dataset.theme !== "light") {
      document.body.dataset.theme = "light";
      theme = 'light';
    } else {
      document.body.dataset.theme = "dark";
      theme = 'dark';
    }
  }

</script>

<style>
  nav {
    position: fixed;
    display: flex;
    background-color: var(--bg-color-3);
    height: 48px;
    width: 100%;
    box-shadow: 0 5px 10px var(--color-3);
    z-index: 1000;
  }
  /* Nav tabs */
  .navtabs {
    margin: 0;
    margin-left: auto;
    display: flex;
    list-style: none;
    flex-basis: content;
  }
  nav :global(.tab) {
    width: 160px;
    height: 48px;
    line-height: 42px;
    text-align: center;
    color: var(--color-1);
    transition: 0.3s ease-out;
    background-color: inherit;
  }
  .title {
    height: 48px;
    line-height: 48px;
    padding-left: 0.5em;
    padding-right: 1em;
    color: var(--color-1);
    margin: auto 0;
  }
  nav :global(.active) {
    font-weight: 700;
    background-color: var(--color-3);
  }
  /* Mobile */
  nav :global(.menu-icon-container) {
    /* note: needs to be global to share class with child component */
    margin-left: auto;
    padding: 8px;
    background-color: var(--bg-color-3);
  }
  .menu-icon {
    height: 30px;
    margin: auto;
  }
  .side-nav-container {
    position: absolute;
    right: 0;
    top: 100%;
    overflow: hidden;
  }
  .side-nav {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 48px);
    min-width: 50vw;
    overflow-x: hidden;
    background-color: var(--bg-color-3);
    color: var(--color-1);
    padding-top: 16px;
  }
  .side-nav-option {
    text-align: center;
    white-space: nowrap;
    padding: 12px;
    transition: 0.3s ease-out;
  }

  .theme-btn {
    background-color: transparent;
    border: none;
    padding-top: 4px;
    cursor: pointer;
  }
</style>

<nav>
  <h3 class="title">Web Portfolio</h3>
  <button class="theme-btn" on:click={toggleTheme}>
    {#if theme === 'light'}
      <img height="50%" src="{base}/icons/moon.svg" alt="moon icon" />
    {:else}
      <img height="50%" src="{base}/icons/sun.svg" alt="sun icon" />
    {/if}
    
  </button>
  {#if fullView}
    <!-- Desktop view -->
    <div class="navtabs">
      {#each navOptions as option (option.url)}
        <a href={option.url}>
          <FancyButton class={option.active ? "tab active" : "tab"} poolColor="#fff">
            {option.title}
          </FancyButton>
        </a>
      {/each}
    </div>
  {:else}
    <!-- Mobile view -->
    <FancyButton class="menu-icon-container" onClick={toggleSideMenu}>
      {#if theme === 'light'}
        <img 
          src="{base}/icons/menu-hamburger-black.svg" 
          alt="hamburger menu"
          class="menu-icon"
        />
      {:else}
        <img 
          src="{base}/icons/menu-hamburger.svg" 
          alt="hamburger menu"
          class="menu-icon"
        />
      {/if}
    </FancyButton>
    <!-- Side nav -->
    {#if sideMenuOpen}
      <div class="side-nav-container">
        <div 
          class="side-nav" 
          in:fly={{ duration:500, x:200 }}
          out:fly={{ duration:500, x:200 }}
        >
          {#each navOptions as option, i (option.url)}
            <a 
              href={option.url} 
              class="side-nav-option"
              class:active={option.active}
              in:fly={{ x:100, duration: 800, delay: i*100 }}
              on:click={toggleSideMenu}
            >
              {option.title}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</nav>