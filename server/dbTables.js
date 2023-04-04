(async () => {
    const database = require('./db')
    const User = require('./model/user')

    try{
        await database.sync()
    }catch(e){
        console.log(e)
    }
})()