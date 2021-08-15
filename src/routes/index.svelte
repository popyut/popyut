<script type="ts">
	import 'twind/shim';
	let count: number = 0;

	function incrementCount() {
		count++;
	}
</script>

<svelte:body on:keydown={incrementCount} />

<main class="w-full h-screen flex flex-col items-center justify-center" on:click={incrementCount}>
	<h1 class="text-6xl">Popyut</h1>
	<p class="text-4xl">Count: {count}</p>
</main>
