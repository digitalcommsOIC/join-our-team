<script>
    import { onMount } from 'svelte';

    let posts = [];
    let displayCount = 6; // Number of posts to display initially
    let isLoading = false; // Loading state for initial fetch
    let isLoadingMore = false; // Loading state for "Load More" link
    let isAllLoaded = false; // Indicates if all posts are loaded

    let searchQuery = ''; // Search query input by the user

    const sectorDefinitions = [
        {
            id: 'ohac',
            fullName: 'Orkney Health and Care',
            abbreviation: 'OHAC'
        },
        {
            id: 'elh',
            fullName: 'Education, Leisure and Housing',
            abbreviation: 'ELH'
        },
        {
            id: 'nsi',
            fullName: 'Neighbourhood Services and Infrastructure',
            abbreviation: 'NSI'
        },
        {
            id: 'spbs',
            fullName: 'Strategy, Performance and Business Solutions',
            abbreviation: 'SPBS'
        },
        {
            id: 'esr',
            fullName: 'Enterprise and Sustainable Regeneration',
            abbreviation: 'ESR'
        },
        {
            id: 'other',
            fullName: 'Other',
            abbreviation: 'Other'
        }
    ];

    let sectors = [{ id: 'all', fullName: 'All', abbreviation: 'All' }, ...sectorDefinitions];

    let selectedSector = 'all';

    // Function to determine colors and service name based on the title
    function getColors(title) {
        const categories = [
            {
                serviceName: 'Orkney Health and Care',
                keywords: ['Hamnavoe', 'Sunnybrae', 'Smiddybrae', 'St Rognvalds', 'Responder Service Co-ordinator', 'Mobile Community Responder', 'Therapist', 'Kalisgarth', 'Care', 'OHAC', 'Lifestyles'],
                colors: { from: '#3838fc', to: '#191970' },
                id: 'ohac'
            },
            {
                serviceName: 'Education, Leisure and Housing',
                keywords: ['Teacher', 'Relief Cook', 'Early Years', 'Centre Assistant', 'Employability', 'Outdoor Centre', 'Youth Worker', 'Instructor', 'Papdale Halls', 'Nursery', 'Nurseries', 'Learning', 'Education', 'Museum', 'Cathedral', 'Housing', 'Library', 'School', 'College', 'University', 'Leisure', 'SVQ'],
                colors: { from: '#d70000', to: '#8b0000' },
                id: 'elh'
            },
            {
                serviceName: 'Neighbourhood Services and Infrastructure',
                keywords: ['Fleet', 'Toilet', 'Engineer', 'Engineering', 'Cleaner'],
                colors: { from: '#e95500', to: '#9d3900' },
                id: 'nsi'
            },
            {
                serviceName: 'Strategy, Performance and Business Solutions',
                keywords: ['HR', 'Licensing', 'Solicitor', 'Communications', 'Community Council', 'Members'],
                colors: { from: '#b20059', to: '#660033' },
                id: 'spbs'
            },
            {
                serviceName: 'Enterprise and Sustainable Regeneration',
                keywords: ['System', 'IT', 'Pier', 'Project Manager (Orkney World Heritage Site Gateway)', 'Finance'],
                colors: { from: '#00b000', to: '#006400' },
                id: 'esr'
            }
        ];

        for (const category of categories) {
            if (category.keywords.some(keyword => title.includes(keyword))) {
                return {
                    colors: category.colors,
                    id: category.id,
                    serviceName: category.serviceName
                };
            }
        }

        return {
            colors: { from: '#D9D9D9', to: '#D9D9D9' },
            id: 'other',
            serviceName: 'Other'
        };
    }

    // Fetch and process the RSS feed
    async function fetchRssFeed(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, 'application/xml');

            const items = Array.from(xml.querySelectorAll('item'));

            return items.map(item => {
                const title = item.querySelector('title')?.textContent || 'No Title';
                const link = item.querySelector('link')?.textContent || '#';
                const contentSnippet = item.querySelector('description')?.textContent || '';

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

                // Compute colors, id, and serviceName
                const { colors, id, serviceName } = getColors(cleanTitle);
                const gradientStyle = `background: linear-gradient(to bottom, ${colors.from}, ${colors.to})`;

                return {
                    title: cleanTitle,
                    link,
                    location,
                    salary,
                    closingDate,
                    tag,
                    colors,
                    id,
                    serviceName,
                    gradientStyle,
                    sectorId: id // Assign sectorId for filtering
                };
            });
        } catch (error) {
            console.error('Error parsing RSS feed:', error);
            return [];
        }
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

        // Check if all posts are already loaded
        if (displayCount >= posts.length) {
            displayCount = posts.length;
            isAllLoaded = true;
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

            // Re-check if all posts are loaded after fetching
            if (displayCount >= posts.length) {
                displayCount = posts.length;
                isAllLoaded = true;
            } else {
                isAllLoaded = false;
            }
        } catch (e) {
            console.error('Error fetching latest posts', e);
        } finally {
            // Set loading state to false after fetching
            isLoading = false;
        }
    });

    // Function to load more posts
    function loadMore(event) {
        event.preventDefault();
        isLoadingMore = true;

        setTimeout(() => {
            displayCount += 12;
            if (displayCount >= filteredPosts.length) {
                displayCount = filteredPosts.length;
                isAllLoaded = true;
            }
            isLoadingMore = false;
        }, 500); // Simulate loading time
    }

    // Function to scroll back to top
    function scrollToTop(event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Function to select a sector
    function selectSector(sectorId) {
        selectedSector = sectorId;
        displayCount = 15; // Reset display count when changing filters
        isAllLoaded = displayCount >= filteredPosts.length;
    }

    // Computed property for filtered posts
    $: filteredPosts = posts.filter(post => {
        const matchesSector = selectedSector === 'all' || post.sectorId === selectedSector;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              post.salary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSector && matchesSearch;
    });
</script>

<style>
    .size-5 {
        width: 1.25rem; /* 20px */
        height: 1.25rem; /* 20px */
    }
    .sector-button {
        display: inline-block;
        padding: 0.5rem 1rem; /* Equivalent to px-4 py-2 */
        border-radius: 9999px; /* Rounded-full */
        background-color: #e5e7eb; /* bg-gray-200 */
        overflow: hidden;
        white-space: nowrap;
        vertical-align: middle;
        transition: width 0.3s ease, background-color 0.3s ease;
        text-align: center;
    }
    .sector-button:hover {
        background-color: #d1d5db; /* bg-gray-300 */
    }
    .sector-button.active-filter {
        background-color: #1e1e1e; /* Active background color */
        color: #fff;
    }
    .sector-button .abbreviation,
    .sector-button .full-name {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
    }
    .sector-button .full-name {
        display: none;
    }
    .sector-button:hover .abbreviation,
    .sector-button.active-filter .abbreviation {
        display: none;
    }
    .sector-button:hover .full-name,
    .sector-button.active-filter .full-name {
        display: inline-block;
    }
    .search-input {
        border: 1px solid #d1d5db;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        width: 100%;
        max-width: 400px;
        background-color: #e5e7eb; /* Same as unselected filters */
        display: flex;
        align-items: center;
    }
    .search-input input {
        border: none;
        outline: none;
        background: transparent;
        width: 100%;
    }
    .search-input svg {
        margin-right: 0.5rem;
    }
    .search-input:focus-within {
        background-color: #d1d5db; /* bg-gray-300 */
    }
    .filters-container {
        display: none;
    }

    @media (min-width: 768px) {
        .filters-container {
            display: flex;
            flex: 1;
        }
    }
</style>

<div class="flex justify-center px-8 -mb-8">
    <div class="xl:w-[80vw]">
        <!-- <h2 class="text-[#1e1e1e] text-2xl lg:text-4xl font-bold text-pretty mb-4">Latest Posts</h2> -->

        <!-- Filter Buttons and Search Bar -->
        <div class="flex items-center justify-between mb-4">
            <!-- Filters Hidden on Small Screens, Visible at md and Above -->
            <!-- <div class="filters-container">
                <div class="flex gap-2">
                    {#each sectors as sector}
                        <button
                            class="sector-button {sector.id === selectedSector ? 'active-filter' : ''}"
                            on:click={() => selectSector(sector.id)}
                        >
                            {#if sector.id === 'all' || sector.id === 'other'}
                                {sector.fullName}
                            {:else}
                                <span class="abbreviation">{sector.abbreviation}</span>
                                <span class="full-name">{sector.fullName}</span>
                            {/if}
                        </button>
                    {/each}
                </div>
            </div> -->
            <a name="vacancies" class="text-[#1e1e1e] text-2xl lg:text-4xl font-bold text-pretty mb-4 w-full hidden md:block">find your role</a>
            <!-- Search Bar -->
            <div class="flex w-full justify-end	mb-4">
                <div class="search-input">
                    <!-- SVG Icon for Search -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
                    </svg>
                    <input
                        class="focus:text-[#1e1e1e]"
                        type="text"
                        placeholder="Search..."
                        bind:value={searchQuery}
                    />
                </div>
            </div>
        </div>

        {#if isLoading}
            <div class="flex justify-center items-center mb-4">
                <p class="mr-2">fetching roles</p>
                <span class="loading loading-spinner loading-md"></span>
            </div>
        {/if}

        {#if filteredPosts.length === 0 && !isLoading}
            <p class="text-center text-gray-500">No posts available at this time.</p>
        {/if}

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {#each (searchQuery ? filteredPosts : filteredPosts.slice(0, displayCount)) as post}
                <a
                    id={post.id}
                    href={post.link}
                    aria-label={post.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="post card p-0 border rounded-lg hover:shadow-lg transition-all hover:scale-[1.02] flex flex-row"
                >
                    <!-- <div class="w-3 border rounded-l-lg" style={post.gradientStyle}></div> -->
                    <div class="flex flex-col p-4 w-full">
                        <h4 class="text-[#1e1e1e] text-lg lg:text-xl font-medium mb-2">{post.title}</h4>
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

        <!-- Load More / Back to Top Link -->
        {#if !isLoading && filteredPosts.length > 0 && !searchQuery}
            <div class="flex justify-center mt-8">
                {#if isLoadingMore}
                    <span class="loading loading-spinner loading-md"></span>
                {:else}
                    {#if !isAllLoaded}
                        <a
                            href="#"
                            on:click|preventDefault={loadMore}
                            class="btn rounded-full text-white lg:text-lg hover:drop-shadow-lg transition-all bg-[#1e1e1e] font-medium"
                        >
                            <!-- Load More SVG Icon -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                                <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd" />
                            </svg>
                            load more
                        </a>
                    {:else}
                        <a
                            href="#vacancies"
                            class="btn rounded-full text-white lg:text-lg hover:drop-shadow-lg transition-all bg-[#1e1e1e] font-medium"
                            >
                            <!-- Back to Top SVG Icon -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                                <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
                              </svg>                              
                            back to top
                        </a>
                    {/if}
                {/if}
            </div>
        {/if}
    </div>
</div>
