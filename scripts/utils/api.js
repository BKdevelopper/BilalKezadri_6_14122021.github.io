let DataToJson = async () => {
    const url = '/data/photographers.json'
    const response = await fetch(url)
    if (response.ok) {
        return response.json()
    } else {
        console.error(response.status)
    }
}

export {DataToJson}