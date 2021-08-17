<script lang="ts">
  export const ssr = false;
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fade, blur, fly, slide, scale } from 'svelte/transition';
  import axios from 'axios';
  import 'twind/shim';
  import { Howl } from 'howler';
  import { goto } from '$app/navigation';

  import { count } from '../lib/store';
  import { guilds } from '../lib/guilds';
  import Kofi from '../lib/Kofi.svelte';

  const pops = [
    new Howl({ src: ['audio/pop1.ogg', 'audio/pop1.mp3'] }),
    new Howl({ src: ['audio/pop2.ogg', 'audio/pop2.mp3'] }),
    new Howl({ src: ['audio/pop3.ogg', 'audio/pop3.mp3'] }),
    new Howl({ src: ['audio/pop4.ogg', 'audio/pop4.mp3'] }),
  ];

  const comboSounds = [
    new Howl({ src: ['audio/naja.mp3'] }),
    new Howl({ src: ['audio/najaaaaa.mp3'] }),
    new Howl({ src: ['audio/thaiwin.mp3'] }),
    new Howl({ src: ['audio/not-my-senpai.mp3'] }),
  ];

  let najaCount = 100;
  let audioIndex = 0;
  let main: HTMLElement;
  let bgIndex = 0;
  let debounceState = false;
  let pps: number;
  let guildName: string;
  let cityGuild;
  let leaderboardGuilds: Array<any>;
  let showFullLeaderboard = false;
  let playSounds = true;
  let trueTotal = 0;

  let lastCount = $count;

  const total = tweened(0, {
    duration: 1000,
    easing: cubicOut,
  });

  const intervalSeconds = 10;
  const axiosInstance = axios.create();
  const imageUrls = [
    'https://i.imgur.com/qAT7YUY.jpg',
    'https://i.imgur.com/5s87Xgb.jpg',
    'https://i.imgur.com/g3oLmKI.jpg',
    'https://i.imgur.com/U0r4aAO.jpg',
  ];

  function incrementCount() {
    if (debounceState) {
      return;
    }
    debounceState = true;

    count.update((n) => n + 1);
    total.set(++trueTotal);
    if (playSounds) {
      playPop();
      playNaja();
    }
    changeBg();
  }

  function unlockDebounce() {
    debounceState = false;
  }

  function playPop() {
    pops[audioIndex].play();
    audioIndex = (audioIndex + 1) % 4;
  }

  function playNaja() {
    if ($count % najaCount === 0) {
      const randIndex = ~~(Math.random() * comboSounds.length);

      comboSounds[randIndex].play();
    }
  }

  function changeBg() {
    bgIndex = (bgIndex + 1) % imageUrls.length;
  }

  /**
   * Code From
   * https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
   */
  function abbreviateNumber(value: number) {
    let newValue: any = value;
    if (value >= 1000) {
      var suffixes = ['', 'k', 'm', 'b', 't'];
      var suffixNum = Math.floor(('' + value).length / 3);
      var shortValue: any = '';
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat(
          (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(precision),
        );
        var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }

    return newValue;
  }

  function spin(node) {
    return {
      duration: 100,
      css: (t) => `transform: scale(${1.5 - 0.5 * t}) rotate(${-10 + t * 10}deg);`,
    };
  }

  async function fetchLeaderboard() {
    try {
      const res = await axiosInstance.get('https://api.prayut.click/leaderboard');
      pps = res.data.rate;
      trueTotal = res.data.total;
      total.set(trueTotal);
      leaderboardGuilds = res.data.guilds
        .filter((guild) => guild.total > 0)
        .sort((a, b) => {
          if (a.total === b.total) return 0;
          return a.total > b.total ? -1 : 1;
        });
    } catch (e) {
      console.error(e);
    }
  }

  async function submitCount(count: number, countUpdate: number) {
    if (count == 0) {
      await fetchLeaderboard();
      return;
    }

    try {
      const t = String(Date.now());
      await axiosInstance.post('https://api.prayut.click/clicks', {
        n: count,
        g: cityGuild?.id,
        t,
      });

      lastCount = countUpdate;

      await fetchLeaderboard();
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchGeoData() {
    const ipRes = await axiosInstance.get('https://api.ipify.org?format=json');
    const ip = ipRes.data.ip;

    const geoRes = await axiosInstance.get(`https://reallyfreegeoip.org/json/${ip}`);
    const city = geoRes.data.city;
    cityGuild = guilds.find((g) => g.en.toLowerCase() === city.toLowerCase());

    guildName = cityGuild?.th;

    if (browser) {
      goto(`?g=${provinceGuildSlug(cityGuild.en)}`, { replaceState: true });
    }
  }

  function changeGuild(e) {
    const guildId: string = e.target.value;
    cityGuild = guilds.find((g) => g.id === +guildId);

    guildName = cityGuild?.th;

    if (browser) {
      goto(`?g=${provinceGuildSlug(cityGuild.en)}`, { replaceState: true });
    }
  }

  function setSubmitCountInterval() {
    setInterval(() => {
      const intervalCount = $count - lastCount;

      submitCount(intervalCount, $count);
    }, intervalSeconds * 1000);
  }

  function setGuildFromQueryString() {
    if (browser) {
      const searchParams = new URLSearchParams(window.location.search);
      const guildParam = searchParams.get('g');

      if (guildParam) {
        cityGuild = guilds.find((g) => provinceGuildSlug(g.en) === guildParam);

        guildName = cityGuild?.th;
      } else {
        fetchGeoData();
      }
    }
  }

  function provinceGuildSlug(name: string) {
    const provinceName = name.toLowerCase().split(' ').join('');
    const provinceNameWithSuffix = provinceName.replace(/[aeiou]$/, '') + 'ian';
    return provinceNameWithSuffix;
  }

  setGuildFromQueryString();
  setSubmitCountInterval();

  onMount(fetchLeaderboard);
</script>

<svelte:body on:keydown={incrementCount} on:keyup={unlockDebounce} />

<svelte:head>
  <title>POPYUT (Beta)</title>

  <meta name="title" content="POPYUT (Beta)" />
  <meta name="description" content="POPYUT" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta property="og:url" content="https://prayut.click" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="POPYUT" />
  <meta property="og:description" content="A loud-mouthed popping despot" />
  <meta
    property="og:image"
    content="https://raw.githubusercontent.com/narze/timelapse/master/projects/popyut_home.png"
  />
  <meta name="twitter:title" content="POPYUT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:image"
    content="https://raw.githubusercontent.com/narze/timelapse/master/projects/popyut_home.png"
  />

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6FLPY30SGR"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-6FLPY30SGR');
  </script>
</svelte:head>

<main
  bind:this={main}
  class="w-full h-screen flex flex-col items-center justify-center bg-transparent"
  on:mousedown={incrementCount}
  on:mouseup={unlockDebounce}
>
  {#each imageUrls as url, idx}
    <img
      src={url}
      alt="Popyut"
      class={`${idx === bgIndex ? 'block' : 'hidden'} fixed object-cover w-full h-full -z-10`}
    />
  {/each}
  <h1 class="noselect mt-40 text-6xl border-black text-white rounded p-2 flex bg-black items-start">
    POPYUT
    <span class="text-xs text-red-300 mt-2 ml-2">Beta</span>
  </h1>

  {#key $count}
    <p class="noselect text-5xl border-black text-white mt-8 bg-black rounded p-2" in:spin>
      {$count.toLocaleString()}
    </p>
  {/key}

  <p class="noselect text-3xl border-black text-white mt-8 bg-black rounded p-2">
    Total: {Math.round($total).toLocaleString()}
    <span class="text-xs ml-1 text-green-400"
      >{pps !== undefined ? `${abbreviateNumber(pps)} PPS` : '...'}</span
    >
  </p>

  <label class="my-4"><input type="checkbox" bind:checked={playSounds} /> Play sounds</label>

  {#if guildName !== undefined}
    <p class="noselect text-3xl border-black text-white mt-8 bg-black rounded p-2">
      Guild: {guildName}
    </p>
  {/if}

  <select
    class="mt-4 justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
    on:change={changeGuild}
  >
    <option>เลือก Guild ของคุณ</option>
    {#each guilds as guild}
      <option value={guild.id} selected={guildName === guild.th}>{guild.th}</option>
    {/each}
  </select>

  {#if leaderboardGuilds !== undefined}
    <div class="bg-white rounded w-80 mt-8 p-4" on:click={() => (showFullLeaderboard = true)}>
      <h3 class="text-center mb-3 font-medium">Leaderboard</h3>
      {#each leaderboardGuilds.slice(0, 5) as guild, idx}
        <div class="flex">
          <span class="flex-1">{idx + 1}. {guild.emoji} {guild.name}</span>
          <span>
            {#if guild.rate > 0}
              <span class="text-green-400 text-xs mr-2">{abbreviateNumber(guild.rate)} PPS</span>
            {/if}
            {guild.total.toLocaleString()}
          </span>
        </div>
      {/each}
      <p class="text-gray-700 text-center w-full mt-2">See more</p>
    </div>

    <div class={`modal ${showFullLeaderboard && 'open'}`}>
      <div class="modalContent w-80">
        <div class="modalHeader" on:click={() => (showFullLeaderboard = false)}>
          Leaderboard <span class="text-right font-sm text-gray-400">Close</span>
        </div>
        <div class="modalBody">
          {#each leaderboardGuilds as guild, idx}
            <div class="flex">
              <span class="flex-1">{idx + 1}. {guild.emoji} {guild.name}</span>
              <span>
                {#if guild.rate > 0}
                  <span class="text-green-400 text-xs mr-2">{abbreviateNumber(guild.rate)} PPS</span
                  >
                {/if}
                {guild.total.toLocaleString()}
              </span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <Kofi name="narze" />

  <div
    class="text-xs fixed sm:text-base bottom-4 right-4 p-1 text-right z-10 mb-0 bg-white rounded"
  >
    <div>
      <a href="https://twitter.com/PrayutClick" target="_blank" rel="noreferrer">@PrayutClick</a> |
      <a href="https://github.com/narze/popyut" target="_blank" rel="noreferrer">Github</a>
      <!-- | <a href="https://thailand-grand-opening.web.app" target="_blank" rel="noreferrer"
        >120วันเปิดประเทศ?</a
      >
      |
      <a href="https://watasalim.vercel.app" target="_blank" rel="noreferrer">วาทะสลิ่มสุดเจ๋ง</a> -->
    </div>
  </div>
</main>

<style>
  * {
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: none;
    transition: all 0.3s ease;
    /* font-size: 1.5rem; */
  }

  .modal.open {
    display: block;
  }

  .modalContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 30%;
    min-width: 30%;
    background-color: white;
    border-radius: 10px;
  }

  .modalHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    border-bottom: 1px solid #eaeaea;
  }

  .modalBody {
    padding: 0.75rem;
    max-height: 60vh; /* Change this value according to your needs */
    overflow: auto;
  }
</style>
