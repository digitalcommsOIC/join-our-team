<script>
    import { onMount } from 'svelte';
    
    export let services = [
        {
            id: 'infrastructure-services',
            title: 'Infrastructure Services',
            description: 'Roads, fleet, waste, quarries, grounds and civil engineering - these are the services people see and depend on every day.',
            details: 'Keeping them running smoothly across an archipelago requires both operational excellence and creative thinking about what island geography demands.',
            icon: '../images/infrastructure.svg'
        },
        {
            id: 'planning-regulatory',
            title: 'Planning & Regulatory Services',
            description: 'We balance growth with protection - helping development happen whilst safeguarding what makes these islands special.',
            details: 'From marine planning to building standards, environmental health to trading standards, this service enables economic development without losing our character or heritage.',
            icon: '../images/planning.svg'
        },
        {
            id: 'property-asset',
            title: 'Property & Asset Management',
            description: 'The physical buildings and digital systems that make modern council services possible. This spans everything from ICT infrastructure to capital projects, estates management to business continuity planning.',
            details: "It's about managing what we've got whilst investing strategically in what we'll need.",
            icon: '../images/it.svg'
        },
        {
            id: 'hr-od',
            title: 'Human Resources & Organisational Development',
            description: "As the islands' largest employer with roughly 1,800 staff, how we develop our people matters",
            details: 'This service leads on workforce planning, employee relations, learning and development, and organisational culture - not just for HR, but shaping how the whole council operates and evolves.',
            icon: '../images/hr.svg'
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
        currentSlide = (currentSlide + 1) % services.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + services.length) % services.length;
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

<div class="services-section mt-12">
    <!-- Desktop Grid -->
    <div class="hidden md:grid md:grid-cols-2 gap-6 text-[#1e1e1e]">
        {#each services as service}
            <div
                id={service.id}
                class="service-card bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
            >
                <div class="flex items-center gap-4 mb-3">
                    <img src={service.icon} alt="" class="w-12 h-12 flex-shrink-0" />
                    <h3 class="text-xl lg:text-2xl font-semibold text-[#1e1e1e]">{service.title}</h3>
                </div>
                <p class="mb-3">{service.description}</p>
                <p>{service.details}</p>
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
                {#each services as service}
                    <div class="w-full flex-shrink-0 px-2">
                        <div
                            id="{service.id}-mobile"
                            class="service-card bg-gray-50 p-6 rounded-lg h-full"
                            style="min-height: 280px;"
                        >
                            <div class="flex items-center gap-4 mb-3">
                                <img src={service.icon} alt="" class="w-12 h-12 flex-shrink-0" />
                                <h3 class="text-xl font-semibold text-[#1e1e1e]">{service.title}</h3>
                            </div>
                            <p class="mb-3 text-[#1e1e1e]">{service.description}</p>
                            <p class="text-[#1e1e1e]">{service.details}</p>
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
                aria-label="Previous service"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <!-- Dots Indicator -->
            <div class="flex space-x-2">
                {#each services as _, index}
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
                aria-label="Next service"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    </div>
</div>

<style>
    .service-card {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }
    
    .service-card:hover {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
</style>
