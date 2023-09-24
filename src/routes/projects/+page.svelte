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
  table {
    margin: auto;
    border-collapse: collapse;
  }
  table th {
    border: 1px solid var(--color-1-50);
    border-bottom-width: 3px;
    padding: 0.2em 1em;
  }
  table td {
    border: 1px solid var(--color-1-50);
    padding: 0.2em 1em;
  }
</style>

<svelte:head>
  <title>Web Portfolio - Projects</title>
</svelte:head>

<div class="content-root">
  {#if loaded}
    <h1 in:fly={{ x:-50, duration:900 }}>
      Projects
    </h1>
    <p in:fly={{ x:50, duration:900 }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
      culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <br />
    <LazyWrapper>
      <h3 in:fly={{ x:-50, duration:900, delay:100 }}>
        Native OS
      </h3>
      <table in:fly={{ x:50, duration:900, delay:100 }}>
        <!-- Header -->
        <tr>
          <th>Framework</th>
          <th>Examples</th>
        </tr>
        <!-- Body -->
        <tr>
          <td>Node</td>
          <td>Examples</td>
        </tr>
        <tr>
          <td>Rust</td>
          <td>Examples</td>
        </tr>
        <tr>
          <td>C#</td>
          <td>Examples</td>
        </tr>
      </table>
    </LazyWrapper>
    <br />
    <LazyWrapper>
      <h3 in:fly={{ x:-50, duration:900, delay:100 }}>
        Frontend
      </h3>
      <table in:fly={{ x:50, duration:900, delay:100 }}>
        <!-- Header -->
        <tr>
          <th>Framework</th>
          <th>Examples</th>
        </tr>
        <!-- Body -->
        <tr>
          <td>React</td>
          <td>Examples</td>
        </tr>
        <tr>
          <td>NextJS</td>
          <td>Examples</td>
        </tr>
        <tr>
          <td>Svelte</td>
          <td>Examples</td>
        </tr>
      </table>
    </LazyWrapper>
    <br />
    <LazyWrapper>
      <h3 in:fly={{ x:-50, duration:900, delay:100 }}>
        Backend
      </h3>
      <table in:fly={{ x:50, duration:900, delay:100 }}>
        <!-- Header -->
        <tr>
          <th>Framework</th>
          <th>Examples</th>
        </tr>
        <!-- Body -->
        <tr>
          <td>Mongo API Route</td>
          <td>Examples</td>
        </tr>
        <tr>
          <td>SQL API Route</td>
          <td>Examples</td>
        </tr>
      </table>
    </LazyWrapper>
    <br />
    <LazyWrapper>
      <h3 in:fly={{ x:-50, duration:900, delay:100 }}>
        Architecture
      </h3>
      <table in:fly={{ x:50, duration:900, delay:100 }}>
        <!-- Header -->
        <tr>
          <th>Framework</th>
          <th>Examples</th>
        </tr>
        <!-- Body -->
        <tr>
          <td>Local Express Server</td>
          <td>Examples</td>
        </tr>
        <tr>
          <td>AWS Lambda</td>
          <td>Examples</td>
        </tr>
      </table>
    </LazyWrapper>
  {/if}
</div>