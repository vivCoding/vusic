const mongoose = require('mongoose')

const connection = () => {
    return new Promise((resolve, reject) => {
        try {
            const uri = process.env.ATLAS_URI
            if (!uri) reject(new Error('No MongoDB uri specified'))

            mongoose.connect(uri)
            const db = mongoose.connection
            db.once('open', () => {
                console.log('Successfully connected to MongoDb')
                return resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { connectDb: connection }