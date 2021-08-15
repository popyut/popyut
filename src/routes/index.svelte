<script type="ts">
	import 'twind/shim';
	let count: number = 0;
</script>

<svelte:body />

<main class="w-full h-screen flex flex-col items-center justify-center" on:click={() => count++}>
	<h1 class="text-6xl">Popyut</h1>
	<p class="text-4xl">Count: {count}</p>
</main>
