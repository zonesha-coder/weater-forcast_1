let getdiv = document.getElementById("getdiv");
let getsearch = document.getElementById("news");

function getnews() {

    let city = getsearch.value.trim();

    if (city === "") {
        alert("Please Enter City Name");
        return;
    }

    getdiv.innerHTML = "<h3 class='text-center'>Loading...</h3>";

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)

    .then(response => response.json())

    .then(location => {

        if (!location.results) {
            getdiv.innerHTML = "<h3 class='text-danger text-center'>City Not Found</h3>";
            return;
        }

        let latitude = location.results[0].latitude;
        let longitude = location.results[0].longitude;
        let cityName = location.results[0].name;
        let country = location.results[0].country;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`)

        .then(response => response.json())

        .then(data => {

            getdiv.innerHTML = `

            <div class="col-md-6 mx-auto">

                <div class="card shadow">

                    <div class="card-body text-center">

                        <h2>${cityName}</h2>

                        <h5>${country}</h5>

                        <hr>

                        <h3>Temperature</h3>
                        <h1>${data.current.temperature_2m} °C</h1>

                        <h4> Humidity</h4>
                        <p>${data.current.relative_humidity_2m}%</p>

                        <h4>Wind Speed</h4>
                        <p>${data.current.wind_speed_10m} km/h</p>

                    </div>

                </div>

            </div>

            `;

        });

    })

    .catch(error => {

        console.log(error);

        getdiv.innerHTML = "<h3 class='text-danger text-center'>Something Went Wrong!</h3>";

    });

}