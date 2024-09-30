<script>
    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let posts = [];
    let isLoading = false;
    let showSuccess = false;

    // Function to determine colors based on the title
    function getColors(title) {
        const categories = [
            {
                keywords: ['Hamnavoe', 'Sunnybrae', 'Smiddybrae', 'St Rognvalds', 'Responder Service Co-ordinator', 'Mobile Community Responder', 'Therapist', 'Kalisgarth', 'Care', 'OHAC', 'Lifestyles'],
                colors: { from: '#3838fc', to: '#191970', id: 'ohac' }
            },
            {
                keywords: ['Teacher', 'Relief Cook', 'Early Years', 'Centre Assistant', 'Employability', 'Outdoor Centre', 'Youth Worker', 'Instructor', 'Papdale Halls', 'Nursery', 'Nurseries', 'Learning', 'Education', 'Museum', 'Cathedral', 'Housing', 'Library', 'School', 'College', 'University', 'Leisure', 'SVQ'],
                colors: { from: '#d70000', to: '#8b0000', id: 'elh' }
            },
            {
                keywords: ['Fleet', 'Toilet', 'Engineer', 'Engineering', 'Cleaner'],
                colors: { from: '#e95500', to: '#9d3900', id: 'nsi' }
            },
            {
                keywords: ['HR', 'Licensing', 'Solicitor', 'Communications', 'Community Council', 'Members'],
                colors: { from: '#b20059', to: '#660033', id: 'spbs' }
            },
            {
                keywords: ['System', 'IT', 'Pier', 'Project Manager (Orkney World Heritage Site Gateway)', 'Finance'],
                colors: { from: '#00b000', to: '#006400', id: 'esr' }
            }
        ];

        for (const category of categories) {
            if (category.keywords.some(keyword => title.includes(keyword))) {
                return category.colors;
            }
        }

        return { from: '#D9D9D9', to: '#D9D9D9', id: 'unknown' };
    }

    // Fetch and process the RSS feed
    async function fetchRssFeed(url) {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        const items = Array.from(xml.querySelectorAll('item')).slice(0, 6);

        return items.map(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const contentSnippet = item.querySelector('description').textContent;

            // Extract data using regular expressions
            const extractData = (regex, defaultValue = 'N/A') => {
                const match = contentSnippet.match(regex);
                return match ? match[1].trim() : defaultValue;
            };

            const location = extractData(/Location:\s*([^;]*)/);
            const salary = extractData(/Salary:\s*([^;]*)/);
            const closingDate = extractData(/Closing date:\s*(.*)/);

            const tagMatch = title.match(/(ORK\d{5})/);
            const tag = tagMatch ? tagMatch[0] : '';
            const cleanTitle = tag ? title.replace(` - ${tag}`, '').trim() : title;

            // Compute colors and gradient style
            const colors = getColors(cleanTitle);
            const gradientStyle = `background: linear-gradient(to bottom, ${colors.from}, ${colors.to})`;

            return {
                title: cleanTitle,
                link,
                location,
                salary,
                closingDate,
                tag,
                colors,
                gradientStyle
            };
        });
    }

    // Custom "pop" transition for the tick icon
    function popOut(node, { duration = 300 }) {
        return {
            duration,
            easing: cubicOut,
            css: t => `
                transform: scale(${1 + (1 - t) * 0.5});
                opacity: ${t};
            `
        };
    }

    // Fetch posts on component mount
    onMount(async () => {
        const rssUrl = 'https://myjobscotland.gov.uk/api/v1/rss?alias=councils/orkney-islands-council/jobs/rss';

        // Load cached posts from localStorage
        if (typeof localStorage !== 'undefined') {
            const cachedPosts = localStorage.getItem('posts');
            if (cachedPosts) {
                try {
                    posts = JSON.parse(cachedPosts);
                } catch (e) {
                    console.error('Error parsing cached posts', e);
                    posts = [];
                }
            }
        }

        // Set loading state to true before fetching
        isLoading = true;

        // Fetch latest posts
        try {
            const latestPosts = await fetchRssFeed(rssUrl);
            posts = latestPosts;

            // Store the latest posts in localStorage
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('posts', JSON.stringify(posts));
            }
            showSuccess = true; // Set success only on successful fetch
        } catch (e) {
            console.error('Error fetching latest posts', e);
        } finally {
            // Set loading state to false after fetching
            isLoading = false;

            if (showSuccess) {
                // Hide the success message after 1 second
                setTimeout(() => {
                    showSuccess = false;
                }, 1000);
            }
        }
    });
</script>

<style>
    @media (max-width: 640px) {
        .post:nth-child(n+4) {
            display: none;
        }
    }
    .size-5 {
        width: 1.25rem; /* 20px */
        height: 1.25rem; /* 20px */
    }
</style>

<div class="flex justify-center px-8">
    <div class="xl:w-[80vw]">
        <a href="/vacancies" data-astro-reload class="w-fit items-center text-[#1e1e1e] text-2xl lg:text-4xl font-bold text-pretty mb-8 flex flex-row gap-2 hover:animate-pulse group">latest posts
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 mt-[0.4rem] lg:mt-[0.75rem] group-hover:animate-pulse transition-all">
                <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clip-rule="evenodd" />
            </svg>
        </a>

        <div class="flex justify-center items-center mb-4">
            {#if isLoading}
                <p class="mr-2">fetching latest roles</p>
                <span class="loading loading-spinner loading-md"></span>
            {:else if showSuccess}
                <p class="mr-2">you're up to date!</p>
                <span
                    in:scale={{ duration: 300 }}
                    out:popOut={{ duration: 300 }}
                >
                    <!-- Insert the SVG icon here -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 text-green-500">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                    </svg>
                </span>
            {/if}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each posts as post}
                <a
                    id={post.colors.id}
                    href={post.link}
                    aria-label={post.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="post card p-0 border rounded-lg hover:shadow-lg transition-all hover:scale-[1.02] flex flex-row"
                >
                    <div class="w-3 border rounded-l-lg" style={post.gradientStyle}></div>
                    <div class="flex flex-col p-4 w-full">
                        <p class="text-[#1e1e1e] text-lg lg:text-xl font-medium mb-2">{post.title}</p>
                        {#if post.tag}
                            <p class="text-sm text-gray-500 mb-2">{post.tag}</p>
                        {/if}
                        <p class="text-[#1e1e1e] mt-2">
                            <span class="font-medium">Location:</span> {post.location}
                        </p>
                        <p class="text-[#1e1e1e]">
                            <span class="font-medium">Salary:</span> {post.salary}
                        </p>
                        <p class="text-[#1e1e1e] mt-4">
                            <span class="font-medium">Closing Date:</span> {post.closingDate}
                        </p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</div>
