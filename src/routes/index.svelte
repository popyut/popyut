<script lang="ts">
  export const ssr = false;
  import { onMount } from 'svelte';
  import axios from 'axios';
  import 'twind/shim';

  import { count } from '../lib/store';
  import Kofi from '../lib/Kofi.svelte';

  let audio1: HTMLAudioElement;
  let audio2: HTMLAudioElement;
  let audio3: HTMLAudioElement;
  let audio4: HTMLAudioElement;
  let naja: HTMLAudioElement;
  let audioIndex = 0;
  let main: HTMLElement;
  let bgIndex = 0;
  let debounceState = false;
  let total = 0;
  let lastCount;
  let pps: number = 0;

  const intervalSeconds = 10;
  const axiosInstance = axios.create();

  function incrementCount() {
    if (debounceState) {
      return;
    }
    debounceState = true;

    count.update((n) => n + 1);
    total += 1;
    playPop();
    playNaja();
    changeBg();
  }

  function unlockDebounce() {
    debounceState = false;
  }

  function playPop() {
    switch (audioIndex) {
      case 0:
        audio1.currentTime = 0;
        audio1.play();
        break;
      case 1:
        audio2.currentTime = 0;
        audio2.play();
        break;
      case 2:
        audio3.currentTime = 0;
        audio3.play();
        break;
      case 3:
        audio4.currentTime = 0;
        audio4.play();
        break;
    }

    audioIndex = (audioIndex + 1) % 4;
  }

  function playNaja() {
    if ($count % 100 === 0) {
      naja.currentTime = 0;
      naja.play();
    }
  }

  function changeBg() {
    bgIndex = (bgIndex + 1) % 4;
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

  async function fetchLeaderboard() {
    try {
      const res = await axiosInstance.get(
        'https://api.prayut.click/leaderboard',
      );

      pps = Math.floor((res.data.total - total) / intervalSeconds);
      total = res.data.total;
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
      const res = await axiosInstance.post(
        'https://api.prayut.click/clicks',
        {
          n: count,
          t,
        },
      );

      pps = Math.floor((res.data.total - total) / intervalSeconds);
      total = Math.max(total, res.data.total);

      lastCount = countUpdate;
    } catch (e) {
      console.error(e);
    }
  }

  lastCount = $count;

  onMount(fetchLeaderboard);

  setInterval(() => {
    const intervalCount = $count - lastCount;

    submitCount(intervalCount, $count);
  }, intervalSeconds * 1000);
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
  class="w-full h-screen flex flex-col items-center justify-center bg-gray-200"
  on:mousedown={incrementCount}
  on:mouseup={unlockDebounce}
>
  <h1 class="noselect text-6xl border-black text-white bg-black rounded p-2 flex items-start">
    POPYUT <span class="text-xs text-red-300 mt-2 ml-2">Beta</span>
  </h1>
  <p class="noselect text-3xl border-black text-white mt-8 bg-black rounded p-2">
    Count: {$count.toLocaleString()}
  </p>
  <p class="noselect text-5xl border-black text-white mt-8 bg-black rounded p-2">
    Total: {total.toLocaleString()}
    <span class="text-xs ml-1 text-green-400">{pps > 0 ? `${abbreviateNumber(pps)} PPS` : ''}</span>
  </p>

  <p class="noselect text-2xl text-black">เอารูปลุงออกแปปนึงนะจ๊ะ</p>

  <audio bind:this={audio1}>
    <source src="pop1.ogg" type="audio/ogg" />
  </audio>

  <audio bind:this={audio2}>
    <source src="pop2.ogg" type="audio/ogg" />
  </audio>

  <audio bind:this={audio3}>
    <source src="pop3.ogg" type="audio/ogg" />
  </audio>

  <audio bind:this={audio4}>
    <source src="pop4.ogg" type="audio/ogg" />
  </audio>

  <audio bind:this={naja}>
    <source src="naja.mp3" type="audio/mpeg" />
  </audio>

  <Kofi name="narze" />

  <div
    class="text-xs sm:text-base md:fixed bottom-16 sm:bottom-2 text-right mr-4 w-screen z-10 mb-20 md:mb-0"
  >
    <div>
      <a href="https://github.com/narze/popyut" target="_blank" rel="noreferrer">Github</a> |
      <a href="https://thailand-grand-opening.web.app" target="_blank" rel="noreferrer"
        >120วันเปิดประเทศ?</a
      >
      |
      <a href="https://watasalim.vercel.app" target="_blank" rel="noreferrer">วาทะสลิ่มสุดเจ๋ง</a>
    </div>
  </div>
</main>

<style>
  main {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  * {
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }
</style>
