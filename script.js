document.addEventListener('DOMContentLoaded', () => {
    const countryContainer = document.querySelector('.countries-container');

    fetch('https://restcountries.com/v3.1/all')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            data.forEach((country) => {
                const countryCard = document.createElement('a');
                countryCard.classList.add('country-card');
                countryCard.href = `/country.html?name=${country.name.common}`
                countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="flags">
            <div class="country-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString()}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital ? country.capital?.[0] : 'N/A'}</p>
            </div>`;
                countryContainer.append(countryCard);
            });
        })
        .catch((error) => {
            console.error('Fetch error: ', error);
        });
});
