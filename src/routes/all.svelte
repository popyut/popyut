<script lang="ts">
  export const ssr = false;
  import 'twind/shim';
</script>

<svelte:head>
  <script src="https://unpkg.com/@ungap/custom-elements-builtin"></script>
  <script src="https://unpkg.com/x-frame-bypass"></script>
</svelte:head>

<main class="w-full h-screen flex flex-row items-center justify-center bg-transparent">
  <iframe src="https://prayut.click" frameborder="0" class="flex-1 border-0 h-full" />
  <iframe src="https://popcat.click" frameborder="0" class="flex-1 border-0 h-full" />
  <iframe
    src="https://popdog.click/play"
    frameborder="0"
    class="flex-1 border-0 h-full"
    is="x-frame-bypass"
  />
  <iframe src="https://popass.click" frameborder="0" class="flex-1 border-0 h-full" />
</main>
