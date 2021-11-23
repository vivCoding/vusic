const { searchVideos } = require("../../youtube")

const searchRoute = async (req, res) => {
    let query = req.query.query
    const results = await searchVideos(query)
    if (results.status == 200) {
        res.json(results.results)
    } else {
        res.status(results.status).send("error")
    }
}

module.exports = searchRoute
