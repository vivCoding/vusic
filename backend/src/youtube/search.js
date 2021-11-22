const { google } = require("googleapis")

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_AUTH
})

const search = async (query) => {
    console.log(`- received search query for "${query}"`)
    const results = await youtube.search.list({
        part: "id, snippet",
        q: query,
        maxResults: process.env.MAX_RESULTS,
        type: "video",
        relevanceLanguage: "en"
    }).then(response => {
        if (response.status == 200) {
            const items = []
            response.data.items.forEach(item => {
                items.push({
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.default.url
                })
            });
            return {
                status: 200,
                results: items
            }
        } else {
            console.log("youtube error")
            return { status: 500 }
        }
    }).catch(error => {
        console.log(error)
        return { status: 400 }
    })
    return results
}

module.exports = { search }