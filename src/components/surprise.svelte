<script>
    import { onMount } from 'svelte';
    let randomLink = '';

    async function fetchRssFeed(url) {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        const items = Array.from(xml.querySelectorAll('item'));
        const randomItem = items[Math.floor(Math.random() * items.length)];
        return randomItem.querySelector('link').textContent;
    }

    onMount(async () => {
        const rssUrl = 'https://myjobscotland.gov.uk/api/v1/rss?alias=councils/orkney-islands-council/jobs/rss';
        randomLink = await fetchRssFeed(rssUrl);
    });
</script>

<a href={randomLink} class="flex lg:text-xl font-light text-white rounded-full btn-sm px-4 border-white border hover:border-white animate-wiggle hover:drop-shadow-lg transition-all items-center lg:pb-1">surprise me!</a>