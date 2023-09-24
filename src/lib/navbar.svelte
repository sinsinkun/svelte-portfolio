<script lang="ts">
  import { fly } from "svelte/transition";
  import { page } from '$app/stores';
  import MediaQuery from 'svelte-media-queries';

  import Button from "./fancyButton.svelte";

  // typescript interfaces
  interface NavOption {
    url: string,
    title: string,
    active: boolean,
  }

  // nav options
  let navOptions: NavOption[] = [
    { url:"/", title: "Home", active:true },
    { url:"/projects", title: "Projects", active:false },
    { url:"/about", title: "About Me", active:false },
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
    background-color: var(--bg-color-2);
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
    background-color: var(--bg-color-2);
    color: var(--color-1);
    padding-top: 16px;
  }
  .side-nav-option {
    text-align: center;
    white-space: nowrap;
    padding: 12px;
    transition: 0.3s ease-out;
  }
</style>

<nav>
  <h3 class="title">Web Portfolio</h3>
  <MediaQuery query="(min-width: 700px)" let:matches>
    {#if matches}
      <!-- Desktop view -->
      <div class="navtabs">
        {#each navOptions as option (option.url)}
          <a href={option.url}>
            <Button class={option.active ? "tab active" : "tab"} poolColor="#fff">
              {option.title}
            </Button>
          </a>
        {/each}
      </div>
    {:else}
      <!-- Mobile view -->
      <Button class="menu-icon-container" onClick={toggleSideMenu}>
        <img 
          src="icons/menu-hamburger.svg" 
          alt="hamburger menu"
          class="menu-icon"
        />
      </Button>
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
              >
                {option.title}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    {/if}
  </MediaQuery>
</nav>