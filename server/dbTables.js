(async () => {
    const database = require('./db')

    try {
        await database.sync()
    } catch (e) {
        console.log(e)
    }
})()