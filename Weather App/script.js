async function main(city) {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '61f46325famsh0395896d38c3751p1e93a1jsn969a4fa384de',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        cloud_pct.innerHTML = result.cloud_pct
        temp.innerHTML = result.temp
        temp2.innerHTML = result.temp
        feels_like.innerHTML = result.feels_like
        humidity.innerHTML = result.humidity
        humidity2.innerHTML = result.humidity
        min_temp.innerHTML = result.min_temp
        max_temp.innerHTML = result.max_temp
        wind_speed.innerHTML = result.wind_speed
        wind_speed2.innerHTML = result.wind_speed
        wind_degrees.innerHTML = result.wind_degrees
        sunrise.innerHTML = result.sunrise
        sunset.innerHTML = result.sunset
    } catch (error) {
        console.error(error);
    }
}
async function main2() {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=uttarakhand';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '61f46325famsh0395896d38c3751p1e93a1jsn969a4fa384de',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result2 = await response.json();
        uk_cloud_pct.innerHTML = result2.cloud_pct
        uk_temp.innerHTML = result2.temp
        uk_feels_like.innerHTML = result2.feels_like
        uk_humidity.innerHTML = result2.humidity
        uk_min_temp.innerHTML = result2.min_temp
        uk_max_temp.innerHTML = result2.max_temp
        uk_wind_speed.innerHTML = result2.wind_speed
        uk_wind_degrees.innerHTML = result2.wind_degrees
        uk_sunrise.innerHTML = result2.sunrise
        uk_sunset.innerHTML = result2.sunset
    } catch (error) {
        console.error(error);
    }
}
async function main3() {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Bengaluru';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '61f46325famsh0395896d38c3751p1e93a1jsn969a4fa384de',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result2 = await response.json();
        bl_cloud_pct.innerHTML = result2.cloud_pct
        bl_temp.innerHTML = result2.temp
        bl_feels_like.innerHTML = result2.feels_like
        bl_humidity.innerHTML = result2.humidity
        bl_min_temp.innerHTML = result2.min_temp
        bl_max_temp.innerHTML = result2.max_temp
        bl_wind_speed.innerHTML = result2.wind_speed
        bl_wind_degrees.innerHTML = result2.wind_degrees
        bl_sunrise.innerHTML = result2.sunrise
        bl_sunset.innerHTML = result2.sunset
    } catch (error) {
        console.error(error);
    }
}
async function main4() {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=mumbai';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '61f46325famsh0395896d38c3751p1e93a1jsn969a4fa384de',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result2 = await response.json();
        mi_cloud_pct.innerHTML = result2.cloud_pct
        mi_temp.innerHTML = result2.temp
        mi_feels_like.innerHTML = result2.feels_like
        mi_humidity.innerHTML = result2.humidity
        mi_min_temp.innerHTML = result2.min_temp
        mi_max_temp.innerHTML = result2.max_temp
        mi_wind_speed.innerHTML = result2.wind_speed
        mi_wind_degrees.innerHTML = result2.wind_degrees
        mi_sunrise.innerHTML = result2.sunrise
        mi_sunset.innerHTML = result2.sunset
    } catch (error) {
        console.error(error);
    }
}
async function main5() {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=kolkata';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '61f46325famsh0395896d38c3751p1e93a1jsn969a4fa384de',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result2 = await response.json();
        kt_cloud_pct.innerHTML = result2.cloud_pct
        kt_temp.innerHTML = result2.temp
        kt_feels_like.innerHTML = result2.feels_like
        kt_humidity.innerHTML = result2.humidity
        kt_min_temp.innerHTML = result2.min_temp
        kt_max_temp.innerHTML = result2.max_temp
        kt_wind_speed.innerHTML = result2.wind_speed
        kt_wind_degrees.innerHTML = result2.wind_degrees
        kt_sunrise.innerHTML = result2.sunrise
        kt_sunset.innerHTML = result2.sunset
    } catch (error) {
        console.error(error);
    }
}
document.querySelector("#SSubmit").addEventListener("click", () => {
    main(city.value);
    cityName.innerHTML = city.value;
})
document.querySelector("#Bengaluru-weather").addEventListener("click", () => {
    main("Bengaluru")
    cityName.innerHTML = "Bengaluru";
})
document.querySelector("#uk_weather").addEventListener("click", () => {
    main("Uttarakhand")
    cityName.innerHTML = "Uttarakhand";
})
document.querySelector("#london_weather").addEventListener("click", () => {
    main("London")
    cityName.innerHTML = "London";
})
main("Delhi");
main2()
main3()
main4()
main5()
