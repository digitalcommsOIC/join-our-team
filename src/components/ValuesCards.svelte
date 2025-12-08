<script>
    import { onMount } from 'svelte';
    
    export let values = [
        {
            id: 'collaborative',
            title: 'Collaborative',
            description: 'Working across service boundaries is essential. Infrastructure planning informs workforce strategies. Property assets enable service transformation. ICT underpins everything.',
            details: 'You\'ll build partnerships with unions, communities, and external stakeholders whilst fostering collaboration within your diverse directorate.',
            color: '#E95500'
        },
        {
            id: 'accountable',
            title: 'Accountable',
            description: 'With a £27 million funding gap through to 2028 and a £188 million Strategic Reserve Fund to protect, financial stewardship matters.',
            details: 'You\'ll make difficult decisions, own outcomes, and demonstrate transparent leadership through challenging times whilst maintaining service excellence.',
            color: '#3838FC'
        },
        {
            id: 'respectful',
            title: 'Respectful',
            description: 'Respect flows through everything - from how infrastructure teams respond to winter emergencies, to how HR handles sensitive employee matters.',
            details: 'Island communities depend on these services. Your teams deserve support and development. Respectful leadership creates the foundation for resilient services.',
            color: '#00B000'
        },
        {
            id: 'considerate',
            title: 'Considerate',
            description: 'Every decision has ripple effects across island communities. Road closures affect school transport. Capital projects impact local businesses. Workforce policies shape lives.',
            details: 'Considerate leadership means thinking beyond immediate pressures to long-term sustainability and community impact.',
            color: '#B20059'
        }
    ];

    let currentSlide = 0;
    let carouselContainer;
    let isDesktop = false;

    onMount(() => {
        // Check if we're on desktop
        const checkDesktop = () => {
            isDesktop = window.innerWidth >= 768;
        };
        
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        
        return () => {
            window.removeEventListener('resize', checkDesktop);
        };
    });

    function nextSlide() {
        currentSlide = (currentSlide + 1) % values.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + values.length) % values.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function updateCarousel() {
        if (carouselContainer && !isDesktop) {
            const translateX = -currentSlide * 100;
            carouselContainer.style.transform = `translateX(${translateX}%)`;
        }
    }

    // Auto-advance carousel on mobile
    let autoAdvanceInterval;
    onMount(() => {
        if (!isDesktop) {
            autoAdvanceInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
        
        return () => {
            if (autoAdvanceInterval) {
                clearInterval(autoAdvanceInterval);
            }
        };
    });
</script>

<div class="values-section">
    <!-- Desktop Grid -->
    <div class="hidden md:grid md:grid-cols-2 gap-6 text-white">
        {#each values as value}
            <div
                id={value.id}
                class="value-card p-6 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
                style="background-color: {value.color};"
            >
                <h3 class="text-xl lg:text-2xl font-semibold mb-3">{value.title}</h3>
                <p class="mb-3">{value.description}</p>
                <p>{value.details}</p>
            </div>
        {/each}
    </div>

    <!-- Mobile Carousel -->
    <div class="md:hidden">
        <div class="relative overflow-hidden rounded-lg">
            <div 
                bind:this={carouselContainer}
                class="flex transition-transform duration-300 ease-in-out"
                style="transform: translateX(-{currentSlide * 100}%)"
            >
                {#each values as value}
                    <div class="w-full flex-shrink-0 px-2">
                        <div
                            id="{value.id}-mobile"
                            class="value-card p-6 rounded-lg h-full text-white"
                            style="min-height: 280px; background-color: {value.color};"
                        >
                            <h3 class="text-xl font-semibold mb-3">{value.title}</h3>
                            <p class="mb-3">{value.description}</p>
                            <p>{value.details}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Carousel Controls -->
        <div class="flex justify-between items-center mt-4">
            <button 
                on:click={prevSlide}
                class="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                aria-label="Previous value"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <!-- Dots Indicator -->
            <div class="flex space-x-2">
                {#each values as _, index}
                    <button
                        on:click={() => goToSlide(index)}
                        class="w-2 h-2 rounded-full transition-colors {index === currentSlide ? 'bg-[#1e1e1e]' : 'bg-gray-300'}"
                        aria-label="Go to slide {index + 1}"
                    ></button>
                {/each}
            </div>

            <button 
                on:click={nextSlide}
                class="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                aria-label="Next value"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    </div>
</div>

<style>
    .value-card {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }
    
    .value-card:hover {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
</style>
