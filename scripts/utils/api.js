let DataToJson = async () => {
    const url = 'https://bkdevelopper.github.io/BilalKezadri_6_14122021.github.io/data/photographers.json'
    const response = await fetch(url)
    if (response.ok) {
        return response.json()
    } else {
        console.error(response.status)
    }
}

export {DataToJson}