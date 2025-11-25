<script>
    import { onMount, onDestroy } from 'svelte';
    
    export let images = [];
    export let interval = 5000; // milliseconds between slides
    export let height = "h-[100vw] md:h-[50svh] lg:min-h-[600px]"; // Tailwind classes for height
    
    let currentIndex = 0;
    let autoplayInterval;
    let isPaused = false;
    let container;

    function nextSlide() {
        if (!isPaused) {
            currentIndex = (currentIndex + 1) % images.length;
        }
    }

    function startAutoplay() {
        if (images.length > 1) {
            autoplayInterval = setInterval(nextSlide, interval);
        }
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    function handleMouseEnter() {
        isPaused = true;
    }

    function handleMouseLeave() {
        isPaused = false;
    }

    onMount(() => {
        startAutoplay();
    });

    onDestroy(() => {
        stopAutoplay();
    });
</script>

<div 
    class="relative w-full overflow-hidden rounded-xl {height} my-2 lg:my-0"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    bind:this={container}
>
    {#each images as image, index}
        <div
            class="carousel-image absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-center bg-cover"
            style="background-image: url('{image}'); opacity: {index === currentIndex ? 1 : 0};"
        ></div>
    {/each}
</div>

<style>
    /* Ensure smooth transitions between images */
    .carousel-image {
        will-change: opacity;
    }
</style>
