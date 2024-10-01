<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';

    // Testimonials data
    let testimonials = [
        {
            image: '../images/Steven Poke.webp',
            quote: 'After completing his sixth year at Stromness Academy, Steven undertook a construction-based degree at university. He returned to Orkney after graduation and undertook a temporary role within the Economic Development team at the council. After taking time out to travel, he secured a role as a Building Control/Planning Technician with the OIC and has progressed to his current role, undertaking continuous professional development and gaining additional qualifications along the way.',
            name: 'Steven Poke',
            title: 'Building Standards Service Manager'
        },
        {
            image: '../images/Mark Coleman.webp',
            quote: 'Mark qualified with a degree in Environmental Health, while there are multiple disciplines within this area, he has always specialised in food and health and safety. During his career, he has worked for local authorities in Scotland and England, supermarket chains, and has been a consultant in Health and Safety.',
            name: 'Mark Coleman',
            title: 'Environmental Health Officer (Commercial) and Lead Food Officer'
        },
        // Add more testimonials as needed
    ];

    let currentTestimonialIndex = 0;
    let intervalId;

    // Cycle through testimonials every 10 seconds
    onMount(() => {
        intervalId = setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        }, 10000); // Adjust the interval as needed
    });

    // Clean up the interval when the component is destroyed
    onDestroy(() => {
        clearInterval(intervalId);
    });
</script>

<!-- No custom CSS -->

<div class="h-[100vw] md:h-[58vh] lg:min-h-[600px] bg-gradient-to-r from-[#D1669B] to-[#3838FC] flex justify-center items-center">
    <div class="w-full h-full p-8">
        <div class="bg-white w-full h-full rounded-xl relative overflow-hidden flex justify-center">
            {#if testimonials.length > 0}
                {#key currentTestimonialIndex}
                    <div
                        class="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row justify-center items-center gap-4 p-8"
                        transition:fade={{ duration: 300 }}
                    >
                        <!-- Headshot -->
                        <!-- <div>
                            <img
                                src={testimonials[currentTestimonialIndex].image}
                                alt={testimonials[currentTestimonialIndex].name}
                                class="rounded-full w-52 h-52 object-cover mx-auto md:mx-0 md:mr-8 hidden md:block"
                            />
                        </div> -->
                        <!-- Quote, Name, and Title -->
                        <div class="w-full md:w-2/3 text-center md:text-left text-[#1e1e1e]">
                            <p class="lg:text-xl mb-6">{testimonials[currentTestimonialIndex].quote}</p>
                            <p class="text-2xl lg:text-4xl font-bold mb-2">{testimonials[currentTestimonialIndex].name}</p>
                            <p class="lg:text-xl">{testimonials[currentTestimonialIndex].title}</p>
                        </div>
                    </div>
                {/key}
            {:else}
                <p class="p-8">No testimonials available.</p>
            {/if}
        </div>
    </div>
</div>
