export const prerender = false;

export async function GET({ request }) {
    const rssUrl = 'https://admin.myjobscotland.gov.uk/feeds/organisation?alias=/councils/orkney-islands-council/jobs/rss';

    try {
        const response = await fetch(rssUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; OrkneyIslandsCouncil/1.0)',
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch RSS feed:', response.status, response.statusText);
            return new Response(JSON.stringify({
                error: 'Failed to fetch RSS feed',
                status: response.status
            }), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }

        const rssText = await response.text();

        return new Response(rssText, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache for 5 minutes
            }
        });
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return new Response(JSON.stringify({
            error: 'Internal server error',
            message: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}
