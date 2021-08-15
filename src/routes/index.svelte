<script type="ts">
	import 'twind/shim';

	import { count } from '../lib/store';

	let audio1: HTMLAudioElement;
	let audio2: HTMLAudioElement;
	let audio3: HTMLAudioElement;
	let audio4: HTMLAudioElement;
	let audioIndex = 0;
	let main: HTMLElement;
	let bgIndex = 0;

	function incrementCount() {
		count.update((n) => n + 1);
		playPop();
		changeBg();
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

	function changeBg() {
		bgIndex = (bgIndex + 1) % 4;
	}
</script>

<svelte:body on:keydown={incrementCount} />

<main
	bind:this={main}
	class="w-full h-screen flex flex-col items-center justify-center"
	on:click={incrementCount}
	style={`background-image: url('images/p${bgIndex + 1}.jpg');"`}
>
	<h1 class="text-6xl border-black text-white bg-black rounded p-2">Popyut</h1>
	<p class="text-4xl border-black text-white mt-8 bg-black rounded p-2">Count: {$count}</p>

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
</main>

<style>
	main {
		/* background-image: url('images/p1.jpg'); */
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
