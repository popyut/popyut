<script lang="ts">
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

  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  function incrementCount() {
    if (debounceState) {
      return;
    }
    debounceState = true;

    count.update((n) => n + 1);
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

  async function fetchLeaderboard() {
    try {
      const res = await axios.get('https://asia-southeast1-popyut.cloudfunctions.net/leaderboard');

      total = res.data.total;
    } catch (e) {
      console.error(e);
    }
  }

  async function submitCount(count: number) {
    if (count == 0) {
      return;
    }

    try {
      const res = await axios.post('https://asia-southeast1-popyut.cloudfunctions.net/clicks', {
        data: { n: count },
      });

      total = res.data.total;
    } catch (e) {
      console.error(e);
    }
  }

  lastCount = $count;

  onMount(fetchLeaderboard);

  setInterval(() => {
    const intervalCount = $count - lastCount;
    lastCount = $count;

    submitCount(intervalCount);
  }, 5000);
</script>

<svelte:body on:keydown={incrementCount} on:keyup={unlockDebounce} />
<svelte:head><title>Popyut (Beta)</title></svelte:head>

<main
  bind:this={main}
  class="w-full h-screen flex flex-col items-center justify-center"
  on:mousedown={incrementCount}
  on:mouseup={unlockDebounce}
  style={`background-image: url('images/p${bgIndex + 1}.jpg');"`}
>
  <h1 class="noselect text-6xl border-black text-white bg-black rounded p-2 flex items-start">
    Popyut <span class="text-xs text-red-300 mt-2 ml-2">Beta</span>
  </h1>
  <p class="noselect text-3xl border-black text-white mt-8 bg-black rounded p-2">Count: {$count}</p>
  <p class="noselect text-5xl border-black text-white mt-8 bg-black rounded p-2">Total: {total}</p>

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
</main>

<style>
  main {
    background-repeat: no-repeat;
    background-size: cover;
  }

  * {
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }
</style>
