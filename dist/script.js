const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement);

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if(place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})


const icon = document.querySelector('#icon')
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')
icon.src = `https://openweathermap.org/img/wn/01d@2x.png`

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.weather[0].description
    temperatureElement.textContent = `${data.main.temp}`
    precipitationElement.textContent = data.main.humidity
    windElement.textContent = data.wind.speed
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
}