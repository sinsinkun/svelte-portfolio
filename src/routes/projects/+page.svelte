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
    max-width: 800px;
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
      Listed below are some of the personal projects I've worked on in the past. Unfortunately the bulk of
      the work that I've done are not publicly available, but I hope that these projects provide some insight
      into my abilities as a web developer, and software engineer in general.
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
          <td>
            <a href="https://github.com/sinsinkun/DiscordBot" target="_blank">
              Custom discord bot
            </a>
          </td>
        </tr>
        <tr>
          <td>Rust</td>
          <td>
            <a href="https://github.com/sinsinkun/excel-to-csv-splitter" target="_blank">
              Excel to csv converter
            </a>
          </td>
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
          <td>
            <div>
              <a href="https://github.com/sinsinkun/react-website" target="_blank">
                Old portfolio website
              </a>
            </div>
            <div>
              <a href="https://github.com/sinsinkun/React-SocketIO" target="_blank">
                Instant messaging app
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td>NextJS</td>
          <td>(No publicly available repositories)</td>
        </tr>
        <tr>
          <td>Svelte</td>
          <td>
            <a href="https://github.com/sinsinkun/svelte-portfolio" target="_blank">
              New portfolio website
            </a>
          </td>
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