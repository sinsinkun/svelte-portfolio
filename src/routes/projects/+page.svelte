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
    margin-bottom: 8px;
  }
  a {
    text-decoration: underline;
  }
  .project {
    width: inherit;
    text-align: left;
  }
  .project h3 {
    margin-bottom: 8px;
    @media (max-width: 900px) {
      text-align: center;
    }
  }
  .project .info {
    display: flex;
    width: inherit;
    @media (max-width: 900px) {
      flex-wrap: wrap;
    }
  }
  .project .preview {
    min-width: 250px;
    max-width: 350px;
    min-height: 250px;
    height: fit-content;
    padding-bottom: 8px;

    @media (max-width: 900px) {
      margin: auto;
    }
  }
  .project .preview img {
    width: 100%;
  }
  .project .description {
    flex-grow: 1;
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
    <!-- WebGPU Library -->
    <LazyWrapper>
      <div class="project" in:fly={{ x:-50, duration:900, delay:100 }}>
        <h3>Custom WebGPU Library</h3>
        <div class="info">
          <div class="preview">
            <img
              src="https://raw.githubusercontent.com/sinsinkun/webgpu-quickdraw/main/public/screenshot2.png"
              alt="custom webgpu library"
            />
          </div>
          <div class="description">
            <p>
              <span><b>Language: Typescript</b></span> -
              <span><b>Framework: Vite</b></span>
            </p>
            <p>
              This is a simple library I built for personal use that simplifies interacting
              with the WebGPU API from a browser. Abstracts away setup configurations for the 
              most common render pipeline setup and simplifies usage to only requiring a shader 
              and vertex group inputs. I've released it as an Open Source Library on NPM as well,
              so others also hopefully find it useful.
            </p>
            <p>
              Through developing this library, I learned a lot about the WebGPU API interface,
              the intricacies of setting up graphics pipelines, as well as more detailed looks 
              at some shader basics that are typically provided by other graphics libraries,
              such as setting up your own model/view/projection matrices, enabling transparency,
              and enabling multi-sampling anti-aliasing.
            </p>
            <br />
            <p> NPM Package:
              <a href="https://www.npmjs.com/package/webgpu-quickdraw" target="_blank">
                https://www.npmjs.com/package/webgpu-quickdraw
              </a>
            </p>
            <p> Live link: 
              <a href="https://sinsinkun.github.io/webgpu-quickdraw" target="_blank">
                https://sinsinkun.github.io/webgpu-quickdraw
              </a>
            </p>
            <p> Github link:
              <a href="https://github.com/sinsinkun/webgpu-quickdraw" target="_blank">
                https://github.com/sinsinkun/webgpu-quickdraw
              </a>
            </p>
          </div>
        </div>
      </div>
    </LazyWrapper>
    <br />
    <!-- Raylib 3D render -->
    <LazyWrapper>
      <div class="project" in:fly={{ x:50, duration:900, delay:100 }}>
        <h3>Custom 3D Rendering</h3>
        <div class="info">
          <div class="preview">
            <img src="https://raw.githubusercontent.com/sinsinkun/raylib-3d/main/assets/screenshot.png" alt="raylib 3d screenshot" />
          </div>
          <div class="description">
            <p>
              <span><b>Language: C++</b></span> -
              <span><b>Framework: Raylib</b></span>
            </p>
            <p>
              This is a small learning project I put together to deepen my understanding of
              rendering pipelines, materials, lighting, and shaders. Using the raylib library
              to establish an OpenGL context and handle the window interface, I wrote my own
              basic rendering pipeline, making use of basic materials and lights systems, as well
              as some basic post processing to add light bloom.
            </p>
            <p>
              Through developing this rendering pipeline, I learned a lot about graphics rendering,
              GLSL shader creation, and the fundamentals of rendering 3D scenes such as MVP
              transformations, custom shader variables, and the underlying math behind shading objects.
              I also learned a bunch about C++ compilers, static vs dynamic links, and how to handle
              library dependencies.
            </p>
            <br />
            <p> Github link:
              <a href="https://github.com/sinsinkun/raylib-3d" target="_blank">
                https://github.com/sinsinkun/raylib-3d
              </a>
            </p>
          </div>
        </div>
      </div>
    </LazyWrapper>
    <br />
    <!-- Suika game -->
    <LazyWrapper>
      <div class="project" in:fly={{ x:-50, duration:900, delay:100 }}>
        <h3>Suika Game Clone</h3>
        <div class="info">
          <div class="preview">
            <img src="{base}/assets/suika-clone.png" alt="suika game clone" />
          </div>
          <div class="description">
            <p>
              <span><b>Language: Rust</b></span> -
              <span><b>Framework: Bevy</b></span>
            </p>
            <p>
              This is a small project I threw together over a long weekend. It's a clone of a 
              popular game on the Switch that is only available in Japan (as of the time of this
              writing). I was inspired by seeing other people making their own versions, so I
              decided to give it a shot myself.
            </p>
            <p>
              Through developing this game, I learned a lot about the Bevy game engine and the 
              ideas behind ECS systems as a whole. It was originally built as a native app for 
              windows, but I later decided to also compile it into wasm and host it through 
              github pages so it could be played on mobile devices. Give it a try!
            </p>
            <br />
            <p> Live link: 
              <a href="https://sinsinkun.github.io/suika-clone" target="_blank">
                https://sinsinkun.github.io/suika-clone
              </a>
            </p>
            <p> Github link:
              <a href="https://github.com/sinsinkun/suika-clone" target="_blank">
                https://github.com/sinsinkun/suika-clone
              </a>
            </p>
          </div>
        </div>
      </div>
    </LazyWrapper>
    <br />
    <!-- Discord bot -->
    <LazyWrapper>
      <div class="project" in:fly={{ x:50, duration:900, delay:100 }}>
        <h3>Discord Bot</h3>
        <div class="info">
          <div class="preview">
            <img src="{base}/assets/discord-bot.png" alt="discord bot commands list" />
          </div>
          <div class="description">
            <p>
              <span><b>Language: Javascript</b></span> -
              <span><b>Framework: Discord SDK</b></span>
            </p>
            <p>
              This is a discord bot that I made with a friend. It's primary purpose was to
              keep track of emoji usage statics for a mutual server, but we expanded on its'
              use cases by adding small utility commands, like rolling a die or unit conversion.
              It has also been updated to take advantage of the autocomplete API that Discord
              made available to third party bots, which will show a preview of available commands
              and how to use them.
            </p>
            <p>
              The bot utilizes AWS DynamoDB for saving emoji usage, and is hosted on an Oracle
              Cloud server instance via Docker. Unfortunately there's no way to preview its 
              capabilities without attaching your own bot instance to a discord server.
            </p>
            <br />
            <p>Github link:
              <a href="https://github.com/sinsinkun/Discordbot" target="_blank">
                https://github.com/sinsinkun/Discordbot
              </a>
            </p>
          </div>
        </div>
      </div>
    </LazyWrapper>
    <br />
    <!-- Invoice Maker -->
    <LazyWrapper>
      <div class="project" in:fly={{ x:-50, duration:900, delay:100 }}>
        <h3>Invoice Maker</h3>
        <div class="info">
          <div class="preview">
            <img src="{base}/assets/invoice-maker.png" alt="invoice maker" />
          </div>
          <div class="description">
            <p>
              <span><b>Language: Javascript + Rust</b></span> -
              <span><b>Framework: Tauri</b></span>
            </p>
            <p>
              This is a native app, built using a hybrid Web-Native OS system on the Tauri framework.
              Tauri launches a small rust based local server, through which it serves a stripped down
              web framework to display the JS/HTML based GUI layer. This hybrid system allows you to 
              take advantage of Native level efficiency by performing complex tasks using Rust, but 
              still using the quick to iterate web client for easy GUI generation.
            </p>
            <p>
              This small app allows you to build and preview an invoice in real time, which can be exported
              as a png or a pdf. The first version was built in half a day, to meet personal demands. 
              The pdf is built by converting the position and sizing of HTML objects into page coordinates,
              then added to a pdf object using the jsPDF library.
            </p>
            <br />
            <p>Github Link:
              <a href="https://github.com/sinsinkun/invoice-maker" target="_blank">
                https://github.com/sinsinkun/invoice-maker
              </a>
            </p>
          </div>
        </div>
        
      </div>
    </LazyWrapper>
    <br />
    <!-- React portfolio -->
    <LazyWrapper>
      <div class="project" in:fly={{ x:50, duration:900, delay:100 }}>
        <h3>React Portfolio (Old)</h3>
        <div class="info">
          <div class="preview">
            <img src="{base}/assets/react-portfolio.png" alt="excel split script" />
          </div>
          <div class="description">
            <p>
              <span><b>Language: Javascript</b></span> -
              <span><b>Framework: ReactJS</b></span>
            </p>
            <p>
              Old portfolio written in React. Although this was written in 2021, my more
              recent works in react are unfortunately private and cannot be shared externally.
              It is still relatively well designed in my opinion, but may not reflect my 
              current skill level as a front end developer (or contain any )
            </p>
            <p>
              Unfortunately due to heroku shutting down their free tier, the projects
              mentioned in this portfolio are no longer available. Their github repos however 
              are still available for perusing, and a local version can be deployed to test
              their functionality.
            </p>
            <br />
            <p>Github Link:
              <a href="https://github.com/sinsinkun/react-website" target="_blank">
                https://github.com/sinsinkun/react-website
              </a>
            </p>
          </div>
        </div>
        
      </div>
    </LazyWrapper>
    <br />
  {/if}
</div>