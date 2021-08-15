<script type="ts">
	import 'twind/shim';
	let count: number = 0;
	let audio1: HTMLAudioElement;
	let audio2: HTMLAudioElement;
	let audio3: HTMLAudioElement;
	let audio4: HTMLAudioElement;
	let audioIndex = 0;

	function incrementCount() {
		count++;
		playPop();
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
</script>

<svelte:body on:keydown={incrementCount} />

<main class="w-full h-screen flex flex-col items-center justify-center" on:click={incrementCount}>
	<h1 class="text-6xl">Popyut</h1>
	<p class="text-4xl">Count: {count}</p>

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
