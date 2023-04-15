const fetch = (...args) => 
    import('node-fetch').then(({default:fetch}) => fetch(...args))

const URL = "https://www.mtnpowder.com/feed?resortId=60"

async function liftLoader(){
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    return data
}

module.exports = liftLoader