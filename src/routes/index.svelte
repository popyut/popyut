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
  import { guilds, getName, getSlug } from '../lib/guilds';
  import Kofi from '../lib/Kofi.svelte';

  const audioPath = 'https://storage.googleapis.com/assets.prayut.click/sounds';

  const pops = [
    new Howl({ src: [audioPath + '/pop1.ogg', audioPath + '/pop1.mp3'] }),
    new Howl({ src: [audioPath + '/pop2.ogg', audioPath + '/pop2.mp3'] }),
    new Howl({ src: [audioPath + '/pop3.ogg', audioPath + '/pop3.mp3'] }),
    new Howl({ src: [audioPath + '/pop4.ogg', audioPath + '/pop4.mp3'] }),
  ];

  const comboSounds = [
    new Howl({ src: [audioPath + '/naja.mp3'] }),
    new Howl({ src: [audioPath + '/najaaaaa.mp3'] }),
    new Howl({ src: [audioPath + '/thaiwin.mp3'] }),
    new Howl({ src: [audioPath + '/not-my-senpai.mp3'] }),
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
  let showBodyLeader = false;
  let trueTotal = 0;
  let touchEvents = false;

  let lastCount = $count;

  const total = tweened(0, {
    duration: 5000,
    easing: cubicOut,
  });

  const intervalSeconds = 10;
  const axiosInstance = axios.create();
  const imageUrls = [
    'https://illegal.mdes.go.th/mdes.jpg',
    // 'https://storage.googleapis.com/assets.prayut.click/images/popyut1.jpg',
    // 'https://storage.googleapis.com/assets.prayut.click/images/popyut2.jpg',
  ];

  function incrementCount() {
    if (debounceState) {
      return;
    }
    debounceState = true;

    count.update((n) => n + 1);
    total.set(++trueTotal);
    playPop();
    bgIndex = 1;
  }

  function touchStart() {
    touchEvents = true;
    incrementCount();
  }

  function mouseDown() {
    if (!touchEvents) {
      incrementCount();
    }
  }

  function unlockDebounce() {
    debounceState = false;
    bgIndex = 0;
  }

  function playPop() {
    if ($count % najaCount === 0) {
      const randIndex = ~~(Math.random() * comboSounds.length);
      comboSounds[randIndex].play();
    } else {
      pops[audioIndex].play();
      audioIndex = (audioIndex + 1) % 4;
    }
  }

  function abbreviateNumber(value: number) {
    return new Intl.NumberFormat('th-TH', { notation: 'compact' }).format(value);
  }

  function spin(node: HTMLParagraphElement, t: {}) {
    return {
      duration: 100,
      css: (t: number) => `transform: scale(${1.5 - 0.5 * t}) rotate(${-10 + t * 10}deg);`,
    };
  }

  async function fetchLeaderboard() {
    try {
      const res = {"data": {"total":203081535064,"rate":346910,"online":94413,"guilds":[{"name":"Bangkok","emoji":"🇹🇭","total":254397999,"rate":0,"id":1,"prev_total":254397999},{"id":2,"name":"Samut Prakan","emoji":"🇹🇭","total":32400595,"rate":0,"prev_total":32400595},{"id":3,"name":"Nonthaburi","emoji":"🇹🇭","total":31957202,"rate":0,"prev_total":31957202},{"id":4,"name":"Pathum Thani","emoji":"🇹🇭","total":49792129,"rate":0,"prev_total":49792129},{"id":5,"name":"Phra Nakhon Si Ayutthaya","emoji":"🇹🇭","total":31820592,"rate":0,"prev_total":31820592},{"id":6,"name":"Ang Thong","emoji":"🇹🇭","total":16278861147,"rate":0,"prev_total":16278861147},{"id":7,"name":"Lop Buri","emoji":"🇹🇭","total":18711994,"rate":0,"prev_total":18711994},{"id":8,"name":"Sing Buri","emoji":"🇹🇭","total":9020456,"rate":0,"prev_total":9020456},{"id":9,"name":"Chai Nat","emoji":"🇹🇭","total":11270000,"rate":0,"prev_total":11270000},{"id":10,"name":"Saraburi","emoji":"🇹🇭","total":1869546535,"rate":0,"prev_total":1869546535},{"id":11,"name":"Chon Buri","emoji":"🇹🇭","total":182124402,"rate":0,"prev_total":182124402},{"id":12,"name":"Rayong","emoji":"🇹🇭","total":41909100,"rate":0,"prev_total":41909100},{"id":13,"name":"Chanthaburi","emoji":"🇹🇭","total":34704854,"rate":0,"prev_total":34704854},{"id":14,"name":"Trat","emoji":"🇹🇭","total":11149219,"rate":0,"prev_total":11149219},{"id":15,"name":"Chachoengsao","emoji":"🇹🇭","total":32006478,"rate":0,"prev_total":32006478},{"id":16,"name":"Prachin Buri","emoji":"🇹🇭","total":-155855489368,"rate":320202,"prev_total":155852445208},{"id":17,"name":"Nakhon Nayok","emoji":"🇹🇭","total":10078529,"rate":0,"prev_total":10078529},{"id":18,"name":"Sa Kaeo","emoji":"🇹🇭","total":22076437,"rate":0,"prev_total":22076437},{"id":19,"name":"Nakhon Ratchasima","emoji":"🇹🇭","total":72471375,"rate":0,"prev_total":72471375},{"id":20,"name":"Buri Ram","emoji":"🇹🇭","total":31036093,"rate":0,"prev_total":31036093},{"id":21,"name":"Surin","emoji":"🇹🇭","total":30459807,"rate":0,"prev_total":30459807},{"id":22,"name":"Si Sa Ket","emoji":"🇹🇭","total":44159435,"rate":0,"prev_total":44159435},{"id":23,"name":"Ubon Ratchathani","emoji":"🇹🇭","total":44727905,"rate":0,"prev_total":44727905},{"id":24,"name":"Yasothon","emoji":"🇹🇭","total":25794900,"rate":0,"prev_total":25794900},{"id":25,"name":"Chaiyaphum","emoji":"🇹🇭","total":24551154,"rate":0,"prev_total":24551154},{"id":26,"name":"Amnat Charoen","emoji":"🇹🇭","total":30423447,"rate":24,"prev_total":30423223},{"id":27,"name":"Bueng Kan","emoji":"🇹🇭","total":10282437,"rate":0,"prev_total":10282437},{"id":28,"name":"Nong Bua Lam Phu","emoji":"🇹🇭","total":11833140,"rate":0,"prev_total":11833140},{"id":29,"name":"Khon Kaen","emoji":"🇹🇭","total":13975436448,"rate":14910,"prev_total":13975294703},{"id":30,"name":"Udon Thani","emoji":"🇹🇭","total":39837226,"rate":0,"prev_total":39837226},{"id":31,"name":"Loei","emoji":"🇹🇭","total":17828172,"rate":0,"prev_total":17828172},{"id":32,"name":"Nong Khai","emoji":"🇹🇭","total":20527857,"rate":0,"prev_total":20527857},{"id":33,"name":"Maha Sarakham","emoji":"🇹🇭","total":23628526,"rate":0,"prev_total":23628526},{"id":34,"name":"Roi Et","emoji":"🇹🇭","total":37070623,"rate":0,"prev_total":37070623},{"id":35,"name":"Kalasin","emoji":"🇹🇭","total":26064079,"rate":0,"prev_total":26064079},{"id":36,"name":"Sakon Nakhon","emoji":"🇹🇭","total":40823386,"rate":0,"prev_total":40823386},{"id":37,"name":"Nakhon Phanom","emoji":"🇹🇭","total":20403827,"rate":0,"prev_total":20403827},{"id":38,"name":"Mukdahan","emoji":"🇹🇭","total":13747058,"rate":0,"prev_total":13747058},{"id":39,"name":"Chiang Mai","emoji":"🇹🇭","total":90242301,"rate":0,"prev_total":90242301},{"id":40,"name":"Lamphun","emoji":"🇹🇭","total":25417623,"rate":0,"prev_total":25417623},{"id":41,"name":"Lampang","emoji":"🇹🇭","total":36408440,"rate":0,"prev_total":36408440},{"id":42,"name":"Uttaradit","emoji":"🇹🇭","total":1508322864,"rate":0,"prev_total":1508322864},{"id":43,"name":"Phrae","emoji":"🇹🇭","total":25405748,"rate":0,"prev_total":25405748},{"id":44,"name":"Nan","emoji":"🇹🇭","total":92463416,"rate":24,"prev_total":92463192},{"id":45,"name":"Phayao","emoji":"🇹🇭","total":28910571,"rate":0,"prev_total":28910571},{"id":46,"name":"Chiang Rai","emoji":"🇹🇭","total":46907435,"rate":0,"prev_total":46907435},{"id":47,"name":"Mae Hong Son","emoji":"🇹🇭","total":13137968,"rate":0,"prev_total":13137968},{"id":48,"name":"Nakhon Sawan","emoji":"🇹🇭","total":27974594,"rate":0,"prev_total":27974594},{"id":49,"name":"Uthai Thani","emoji":"🇹🇭","total":9879314,"rate":0,"prev_total":9879314},{"id":50,"name":"Kamphaeng Phet","emoji":"🇹🇭","total":21919872,"rate":0,"prev_total":21919872},{"id":51,"name":"Tak","emoji":"🇹🇭","total":12517951,"rate":0,"prev_total":12517951},{"id":52,"name":"Sukhothai","emoji":"🇹🇭","total":55619470,"rate":24,"prev_total":55619246},{"id":53,"name":"Phitsanulok","emoji":"🇹🇭","total":1014195083,"rate":0,"prev_total":1014195083},{"id":54,"name":"Phichit","emoji":"🇹🇭","total":1188767347,"rate":0,"prev_total":1188767347},{"id":55,"name":"Phetchabun","emoji":"🇹🇭","total":41254458,"rate":0,"prev_total":41254458},{"id":56,"name":"Ratchaburi","emoji":"🇹🇭","total":32180664,"rate":0,"prev_total":32180664},{"id":57,"name":"Kanchanaburi","emoji":"🇹🇭","total":19092079,"rate":0,"prev_total":19092079},{"id":58,"name":"Suphan Buri","emoji":"🇹🇭","total":24263213,"rate":0,"prev_total":24263213},{"id":59,"name":"Nakhon Pathom","emoji":"🇹🇭","total":236469754,"rate":0,"prev_total":236469754},{"id":60,"name":"Samut Sakhon","emoji":"🇹🇭","total":20414574,"rate":0,"prev_total":20414574},{"id":61,"name":"Samut Songkhram","emoji":"🇹🇭","total":14606945,"rate":0,"prev_total":14606945},{"id":62,"name":"Phetchaburi","emoji":"🇹🇭","total":25748524,"rate":0,"prev_total":25748524},{"id":63,"name":"Prachuap Khiri Khan","emoji":"🇹🇭","total":1480519274,"rate":0,"prev_total":1480519274},{"id":64,"name":"Nakhon Si Thammarat","emoji":"🇹🇭","total":50550820,"rate":0,"prev_total":50550820},{"id":65,"name":"Krabi","emoji":"🇹🇭","total":22642610,"rate":0,"prev_total":22642610},{"id":66,"name":"Phangnga","emoji":"🇹🇭","total":12250800,"rate":0,"prev_total":12250800},{"id":67,"name":"Phuket","emoji":"🇹🇭","total":35508724,"rate":0,"prev_total":35508724},{"id":68,"name":"Surat Thani","emoji":"🇹🇭","total":879433638,"rate":11592,"prev_total":879323430},{"id":69,"name":"Ranong","emoji":"🇹🇭","total":10932149,"rate":0,"prev_total":10932149},{"id":70,"name":"Chumphon","emoji":"🇹🇭","total":25340626,"rate":0,"prev_total":25340626},{"id":71,"name":"Songkhla","emoji":"🇹🇭","total":89688106,"rate":0,"prev_total":89688106},{"id":72,"name":"Satun","emoji":"🇹🇭","total":19518830,"rate":0,"prev_total":19518830},{"id":73,"name":"Trang","emoji":"🇹🇭","total":40595707,"rate":0,"prev_total":40595707},{"id":74,"name":"Phatthalung","emoji":"🇹🇭","total":26328751,"rate":0,"prev_total":26328751},{"id":75,"name":"Pattani","emoji":"🇹🇭","total":182974233,"rate":0,"prev_total":182974233},{"id":76,"name":"Yala","emoji":"🇹🇭","total":19118422,"rate":0,"prev_total":19118422},{"id":77,"name":"Narathiwat","emoji":"🇹🇭","total":26364211,"rate":17,"prev_total":26364046},{"id":78,"name":"Hatyai Call Out","emoji":"🍗","total":3326023,"rate":0,"prev_total":3326023},{"id":79,"name":"9ทุน","emoji":"😎","total":1976499499,"rate":0,"prev_total":1976499499},{"id":80,"name":"Onlyfans TH","emoji":"💸","total":409487814,"rate":0,"prev_total":409487814},{"id":81,"name":"จอยอย่าทิ้งพี่","emoji":"🥺","total":2459671,"rate":0,"prev_total":2459671},{"id":82,"name":"เดนหนีทรีโอยุด","emoji":"🥵","total":1486354,"rate":0,"prev_total":1486354},{"id":83,"name":"เสี่ยนิก จงเจริญ","emoji":"💦","total":1407475,"rate":0,"prev_total":1407475},{"id":84,"name":"Republic of Thailand","emoji":"🗽","total":3529998729,"rate":0,"prev_total":3529998729},{"id":85,"name":"ARMSOHANDSOME","emoji":"🍁","total":2738368,"rate":0,"prev_total":2738368},{"id":86,"name":"พี่น้องกะเหรี่ยงDragonOfSalween","emoji":"🐉","total":1786773,"rate":0,"prev_total":1786773},{"id":87,"name":"maehongson not salim","emoji":"❌","total":63641604,"rate":0,"prev_total":63641604}]}}
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
      // await axiosInstance.post('https://api.prayut.click/clicks', {
      //   n: count,
      //   g: cityGuild?.id,
      //   t,
      // });

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

    guildName = getName(cityGuild);

    if (browser) {
      goto(`?g=${getSlug(cityGuild)}`, { replaceState: true });
    }
  }

  function changeGuild(e) {
    const guildId: string = e.target.value;
    cityGuild = guilds.find((g) => g.id === +guildId);

    guildName = getName(cityGuild);

    if (browser) {
      goto(`?g=${getSlug(cityGuild)}`, { replaceState: true });
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
        cityGuild = guilds.find((g) => getSlug(g) === guildParam);

        guildName = getName(cityGuild);
      } else {
        fetchGeoData();
      }
    }
  }

  function showHideLeaderboard() {
    showFullLeaderboard = !showFullLeaderboard;
    if (showFullLeaderboard) {
      showBodyLeader = showFullLeaderboard;
    } else {
      setTimeout(() => {
        showBodyLeader = showFullLeaderboard;
      }, 400);
    }
  }

  setGuildFromQueryString();
  setSubmitCountInterval();

  onMount(fetchLeaderboard);
</script>

<svelte:body on:keydown={incrementCount} on:keyup={unlockDebounce} />

<svelte:head>
  <title>POPYUT</title>

  <meta name="title" content="POPYUT" />
  <meta name="description" content="A loud-mouthed popping dictator" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <meta property="og:url" content="https://prayut.click" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="POPYUT" />
  <meta property="og:description" content="A loud-mouthed popping dictator" />
  <meta property="og:image" content={imageUrls[1]} />
  <meta name="twitter:title" content="POPYUT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={imageUrls[1]} />

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

  <link
    rel="stylesheet"
    href="//fonts.googleapis.com/css?family=Permanent+Marker:300,400,600,700&amp;lang=en"
  />
</svelte:head>

<main
  bind:this={main}
  class="w-full h-screen flex flex-col items-center justify-center bg-transparent"
  on:touchstart={touchStart}
  on:mousedown={mouseDown}
  on:touchend={unlockDebounce}
  on:touchcancel={unlockDebounce}
  on:mouseup={unlockDebounce}
>
  {#each imageUrls as url, idx}
    <img
      src={url}
      alt="Popyut"
      class="{idx === bgIndex ? 'scale-100' : 'scale-125'} block fixed object-contain w-full h-full -z-10"
    />
  {/each}

  <select
    class="justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
    on:change={changeGuild}
  >
    <option>เลือก Guild ของคุณ</option>
    {#each guilds as guild}
      <option value={guild.id} selected={guildName === getName(guild)}>{getName(guild)}</option>
    {/each}
  </select>

  {#key $count}
    <h1 id="localCounter" class="noselect text-7xl text-white mt-4 rounded p-2 items-start" in:spin>
      {$count % 100 ? $count.toLocaleString() : 'POPYUT'}
    </h1>
  {/key}

  <div style="min-height: 70vh" />

  {#if leaderboardGuilds !== undefined}
    <div
      class="modalContent absolute bottom-0 w-80 max-h-20 bg-white rounded-t-xl overflow-y-hidden border-1 {showFullLeaderboard &&
        'open'}"
    >
      <div
        class="cursor-pointer border-b whitespace-nowrap overflow-y-hidden p-3 sm:p-3 {showFullLeaderboard
          ? 'pb-3'
          : 'pb-16'}"
        on:click={showHideLeaderboard}
      >
        <div class="flex justify-between items-center {!showFullLeaderboard && 'pb-1 border-b'}">
          <span>Leaderboard</span>
          <span class="text-right">
            <span class="text-xs mr-2 text-green-400"
              >{pps !== undefined ? `${abbreviateNumber(pps)} PPS` : '...'}</span
            >
            {Math.round($total).toLocaleString()}
          </span>
        </div>
        {#if !showFullLeaderboard}
          <div class="flex sm:justify-between items-center pt-2 justify-center">
            {#each leaderboardGuilds.slice(0, 3) as guild, idx}
              <span class={idx === 0 ? 'block' : idx === 1 ? 'hidden sm:block' : 'hidden lg:block'}
                >{idx + 1}. {guild.emoji} {guild.name.replace(/thailand/i, "████████")}: {abbreviateNumber(guild.total)}</span
              >
            {/each}
          </div>
        {/if}
      </div>
      <div class="modalBody p-3 overflow-y-scroll {showFullLeaderboard && 'max-h-60'}">
        {#if showBodyLeader}
          {#each leaderboardGuilds as guild, idx}
            <div class="flex">
              <span class="flex-1">{idx + 1}. {guild.emoji} {guild.name.replace(/thailand/i, "████████")}</span>
              <span>
                {#if guild.rate > 0}
                  <span class="text-green-400 text-xs mr-2">{abbreviateNumber(guild.rate)} PPS</span
                  >
                {/if}
                {guild.total.toLocaleString()}
              </span>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/if}

  <div class="text-xs fixed sm:text-base bottom-4 right-4 text-right z-10">
    <a
      href="https://github.com/popyut"
      class="p-1 bg-white rounded"
      target="_blank"
      rel="noreferrer">Github</a
    >
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

  select {
    text-align-last: center;
  }

  #localCounter {
    font-family: 'Permanent Marker';
    -webkit-text-stroke: 3px black;
  }

  .modalContent {
    --max-leaderboard-height: 60vh; /* Change this value according to your needs */
    min-width: 50%;
    transition: max-height 0.4s;
  }

  .modalContent.open {
    /* TODO: Make height not be estimated? */
    max-height: calc(var(--max-leaderboard-height) + 3.05rem) /* 3.05rem is an estimated value */;
  }

  .modalBody {
    max-height: var(--max-leaderboard-height);
    transition: max-height 0.4s;
  }
</style>
