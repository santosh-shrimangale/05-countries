document.addEventListener('DOMContentLoaded', () => {
    const countryName = new URLSearchParams(location.search).get('name');

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json())
        .then(data => {
            data.forEach((country) => {
                const container = document.querySelector('.container');
                const divElement = document.createElement('div');
                divElement.classList.add('country-info');
                container.append(divElement);
                divElement.innerHTML = `
                <div>
                <button class="back-button">
                  <i class="fa-solid fa-arrow-left-long"></i> Back
                </button>
                </div>
                <div class="main-container">
                <div class="img-container">
                  <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
                </div>
                <div>
                  <p class="card-title">${country.name.common}</p>
                  <div class="country-text">
                    <div>
                      <p><b>Native Name:</b> ${Object.values(country.name.nativeName)[0].common}</p>
                      <p><b>Population: </b> ${country.population.toLocaleString()}</p>
                      <p><b>Region: </b> ${country.region}</p>
                      <p><b>Sub Region: </b> ${country.subregion}</p>
                      <p><b>Capital: </b> ${country.capital.join(', ')}</p>
                    </div>
                    <div>
                      <p><b>Top Level Domain:</b> ${country.tld.join(', ')}</p>
                      <p><b>Currencies: </b> ${Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
                      <p><b>Languages: </b> ${Object.values(country.languages).join(', ')}</p>
                    </div>
                  </div>
                  <div class="border-countries">
                    <p><b>Border countries:</b></p>
                    ${country.borders ? country.borders.map(border => `<button>${border}</button>`).join('') : 'None'}
                  </div>
                </div>
                </div>
                `;

                // Add event listener for the back button
                divElement.querySelector('.back-button').addEventListener('click', () => {
                    window.location.href = './index.html';
                });
            });
        })
        .catch(error => console.error('Error fetching country data:', error));
});
