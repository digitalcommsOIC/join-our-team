<script>
    import { onMount } from 'svelte';
    
    export let schools = [
        {
            id: 'kirkwall-grammar',
            title: 'Kirkwall Grammar School',
            description: 'Brand new secondary school with state-of-the-art facilities, modern science labs, and contemporary learning spaces.',
            image: 'https://www.kgsorkney.com/uploads/1/4/9/3/14935550/6226839_orig.jpg', // placeholder path
            type: 'Secondary School'
        },
        {
            id: 'stromness-primary',
            title: 'Stromness Primary',
            description: 'Community-focused primary school serving the historic town of Stromness with excellent local connections.',
            image: 'https://schools.orkneyislands.uk/wp-content/uploads/2023/09/news_4143-768x431.jpg', // placeholder path
            type: 'Primary School'
        },
        {
            id: 'papdale-primary',
            title: 'Papdale Primary',
            description: 'Modern primary school with bright, contemporary learning environments and excellent educational resources.',
            image: 'https://schools.orkneyislands.uk/wp-content/uploads/2023/09/Papdale-Primary-School-2esmmoij3-e1636368977582.jpg', // placeholder path
            type: 'Primary School'
        },
        {
            id: 'uhi-orkney',
            title: 'UHI Orkney',
            description: 'Further and higher education campus providing pathways to higher education and vocational training opportunities.',
            image: 'https://www.orkney.uhi.ac.uk/t4-media/one-web/orkney/campus/Orkney2023_201-banner.jpg', // placeholder path
            type: 'Further Education'
        },
        {
            id: 'view-all-schools',
            title: 'Explore all of our schools',
            description: 'Discover every educational facility across the Orkney Islands',
            link: 'https://schools.orkneyislands.uk/',
            type: 'View All Schools'
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
        currentSlide = (currentSlide + 1) % schools.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + schools.length) % schools.length;
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

<div class="schools-section">
    <!-- Desktop Grid -->
    <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {#each schools as school}
            {#if school.id === 'view-all-schools'}
                <a
                    href={school.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={school.id}
                    class="school-card card p-0 border rounded-lg hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col overflow-hidden min-h-[280px]"
                    style="background: linear-gradient(to bottom right, #3838fc, #8888fd); color: white;"
                >
                    <div class="flex flex-col p-6 justify-center items-center text-center h-full">
                        <div class="mb-4">
                            <svg class="w-12 h-12 mx-auto mb-4" style="opacity: 0.9;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <p class="text-xl font-bold mb-6">{school.title}</p>
                        <div class="flex items-center gap-2 text-sm font-medium">
                            <span>Learn More</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </div>
                    </div>
                </a>
            {:else}
                <div
                    id={school.id}
                    class="school-card card p-0 border rounded-lg hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col overflow-hidden relative min-h-[280px]"
                    style="background-image: url('{school.image}'); background-size: cover; background-position: center;"
                >
                    <!-- Dark overlay for better text readability -->
                    <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                    
                    <!-- Text overlay at bottom -->
                    <div class="relative z-10 mt-auto p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <p class="text-white text-lg font-bold">{school.title}</p>
                    </div>
                </div>
            {/if}
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
                {#each schools as school}
                    <div class="w-full flex-shrink-0 px-2">
                        {#if school.id === 'view-all-schools'}
                            <a
                                href={school.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                id="{school.id}-mobile"
                                class="school-card card p-0 border rounded-lg hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col overflow-hidden h-full"
                                style="background: linear-gradient(to bottom right, #3838fc, #8888fd); color: white; min-height: 280px;"
                            >
                                <div class="flex flex-col p-6 justify-center items-center text-center h-full">
                                    <div class="mb-4">
                                        <svg class="w-12 h-12 mx-auto mb-4" style="opacity: 0.9;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                        </svg>
                                    </div>
                                    <p class="text-xl font-bold mb-6">{school.title}</p>
                                    <div class="flex items-center gap-2 text-sm font-medium">
                                        <span>Learn More</span>
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        {:else}
                            <div
                                id="{school.id}-mobile"
                                class="school-card card p-0 border rounded-lg hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col overflow-hidden h-full relative"
                                style="background-image: url('{school.image}'); background-size: cover; background-position: center; min-height: 280px;"
                            >
                                <!-- Dark overlay for better text readability -->
                                <div class="absolute inset-0 bg-black bg-opacity-40"></div>
                                
                                <!-- Text overlay at bottom -->
                                <div class="relative z-10 mt-auto p-4 bg-gradient-to-t from-black/70 to-transparent">
                                    <p class="text-white text-lg font-bold">{school.title}</p>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>

        <!-- Carousel Controls -->
        <div class="flex justify-between items-center mt-4">
            <button 
                on:click={prevSlide}
                class="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                aria-label="Previous school"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <!-- Dots Indicator -->
            <div class="flex space-x-2">
                {#each schools as _, index}
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
                aria-label="Next school"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    </div>
</div>

<style>
    .school-card {
        background: white;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }
    
    .school-card:hover {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
</style>