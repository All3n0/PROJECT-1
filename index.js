document.addEventListener('DOMContentLoaded', function() {
    const forme = document.querySelector('form');
    const button = document.querySelector('#button');
    const raceInput = document.querySelector('#race');
    const additionalInput = document.querySelector('#additional');

    forme.addEventListener('submit', function(event) {
        event.preventDefault();
        getInfo();
       
        
    });
    

    function getInfo() {
        const season = parseFloat(document.querySelector('#season').value.trim());
        const type = document.querySelector('#type').value.trim();
        const race = raceInput.value.trim();
        const additional = additionalInput.value.trim();
        if (season > 2024) {
            alert('Invalid Year');
            return;
        }
        if (!season) {
            alert('Please enter a season.');
            return;
        }

        let apiUrl = `https://ergast.com/api/f1/${season}`;
        if (type === 'drivers') {
            apiUrl += '/drivers';
            if (additional) {
                apiUrl += `/${additional}`;
            }
        } else if (type === 'race' && race) {
            apiUrl += `/${race}`;
            if (additional) {
                apiUrl += `/${additional}`;
            }
        } else if (type === 'constructors') {
            apiUrl += `/constructors`;
            if (additional) {
                apiUrl += `/${additional}`;
            }
        } else if (type === 'circuits') {
            apiUrl += `/circuits`;
            if (additional) {
                apiUrl += `/${additional}`;
            }
        } else if (type === 'race' && !race) {
            alert('Please enter a race number.');
            return;
        }

        fetch(apiUrl + '.json')
            .then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to retrieve data. Please try again later.');
            });
            
    
    }

    function displayResults(data) {
        const details = document.getElementById('details');
        details.innerHTML = '';

        if (data.MRData.RaceTable && data.MRData.RaceTable.Races) {
            const races = data.MRData.RaceTable.Races;
            if (races.length > 0) {
                let racelist = document.createElement('ol');
                racelist.classList.add('lists');
                races.forEach(race => {
                    const racee = document.createElement('li');
                    const name = document.createElement('div');
                    const nationality = document.createElement('div');
                    const qualifying = document.createElement('div');
                    const raceday = document.createElement('div');
                    const raceURL = document.createElement('span');
                    racee.classList.add('results');

                    name.textContent = `NAME:${race.raceName}`;
                    nationality.textContent = `COUNTRY:${race.Circuit.Location.country}`;
                    qualifying.textContent = race.Qualifying ? `QUALIFYING: ${race.Qualifying.date}` : 'QUALIFYING: N/A';
                    raceday.textContent = `RACE-DAY:${race.date}`;
                    raceURL.innerHTML = `URL: <a href="${race.Circuit.url}" target="_blank">${race.Circuit.url}</a>`;

                    racee.appendChild(name);
                    racee.appendChild(nationality);
                    racee.appendChild(qualifying);
                    racee.appendChild(raceday);
                    racee.appendChild(raceURL);

                    racelist.appendChild(racee);
                    racee.addEventListener('click',()=>{
                        const season = parseFloat(document.querySelector('#season').value.trim());
                        const race = raceInput.value.trim();
                        
                        let apiUrl = `https://ergast.com/api/f1/${season}`;
                        fetch(apiUrl+=`/${race}/results.json`)
                        .then(response=>response.json())
                        .then(data=>{
                            const races = data.MRData.RaceTable.Races;
                            const results = races[0].Results;
                            
                            const resultsList = document.getElementById('details');
                            resultsList.innerHTML = '';
                            results.forEach(result => {
                                const position = document.createElement('div')
                                const driver = document.createElement('div')
                                const constructor=document.createElement('div')
                                const time=document.createElement('div')
                                position.textContent=`Position: ${result.position}`
                                driver.textContent = `DRIVER:${result.Driver.givenName} ${result.Driver.familyName}`;
                                constructor.textContent=`CONSTRUCTOR:${result.Constructor.name}`
                                time.textContent=`TIME:${result.Time.time}`
                                const listItem = document.createElement('li');
                                listItem.appendChild(position)
                                listItem.appendChild(driver)
                                listItem.appendChild(time)
                                listItem.appendChild(constructor)
                        
                                resultsList.appendChild(listItem);
                        });
                    })
                .catch(error => {
                    console.error('Error fetching data:', error);
                     });
                });

                    racee.addEventListener('mouseenter', function() {
                        racee.style.color = 'red';
                    });
                    racee.addEventListener('mouseleave', () => {
                        racee.style.color = '';
                    });
                });
                details.appendChild(racelist);
            }
            ;
        } else if (data.MRData.DriverTable && data.MRData.DriverTable.Drivers) {
            const drivers = data.MRData.DriverTable.Drivers;
            if (drivers.length > 0) {
                let driverslist = document.createElement('ol');
                driverslist.classList.add('lists');
                drivers.forEach(driver => {
                    const driverr = document.createElement('li');
                    const name = document.createElement('div');
                    const nationality = document.createElement('div');
                    const birthdate = document.createElement('div');
                    const urlItem = document.createElement('span');
                    driverr.classList.add('results');

                    name.textContent = `NAME:${driver.givenName} ${driver.familyName}`;
                    nationality.textContent = `NATIONALITY:${driver.nationality}`;
                    urlItem.innerHTML = `URL: <a href="${driver.url}" target="_blank">${driver.url}</a>`;
                    birthdate.innerText = `DATE-OF-BIRTH:${driver.dateOfBirth}`;

                    driverr.appendChild(name);
                    driverr.appendChild(nationality);
                    driverr.appendChild(urlItem);
                    driverr.appendChild(birthdate);

                    driverslist.appendChild(driverr);

                    

                    driverr.addEventListener('mouseenter', function() {
                        driverr.style.color = 'red';
                    });
                    driverr.addEventListener('mouseleave', () => {
                        driverr.style.color = '';
                    })
                });
                details.appendChild(driverslist);
            }
            ;
        } else if (data.MRData.ConstructorTable && data.MRData.ConstructorTable.Constructors) {
            const constructors = data.MRData.ConstructorTable.Constructors;
            if (constructors.length > 0) {
                let constructorsList = document.createElement('ol');
                constructorsList.classList.add('lists');
                constructors.forEach(constructor => {
                    const constructorrr = document.createElement('li');
                    const name = document.createElement('div');
                    const nationalitu = document.createElement('div');
                    const conURL = document.createElement('span');
                    constructorrr.classList.add('results');

                    name.textContent = `TEAM:${constructor.name}`;
                    nationalitu.textContent = `COUNTRY:${constructor.nationality}`;
                    conURL.innerHTML = `URL: <a href="${constructor.url}" target="_blank">${constructor.url}</a>`;

                    constructorrr.appendChild(name);
                    constructorrr.appendChild(nationalitu);
                    constructorrr.appendChild(conURL);
                    constructorsList.appendChild(constructorrr);

                    

                    constructorrr.addEventListener('mouseenter', function() {
                        constructorrr.style.color = 'red';
                    });
                    constructorrr.addEventListener('mouseleave', () => {
                        constructorrr.style.color = '';
                    });
                });
                details.appendChild(constructorsList);
            }
            ;
        } else if (data.MRData.CircuitTable && data.MRData.CircuitTable.Circuits) {
            const circuits = data.MRData.CircuitTable.Circuits;
            if (circuits.length > 0) {
                let circuitsList = document.createElement('ol');
                circuitsList.classList.add('lists');
                circuits.forEach(circuit => {
                    const sakat = document.createElement('li');
                    const id = document.createElement('div');
                    const name = document.createElement('div');
                    const nationalitu = document.createElement('div');
                    const conURL = document.createElement('span');
                    sakat.classList.add('results');

                    id.textContent = `ID:${circuit.circuitId}`;
                    name.textContent = `NAME:${circuit.circuitName}`;
                    nationalitu.textContent = `LOCATION:${circuit.Location.country}`;
                    conURL.innerHTML = `URL: <a href="${circuit.url}" target="_blank">${circuit.url}</a>`;

                    sakat.appendChild(id);
                    sakat.appendChild(name);
                    sakat.appendChild(nationalitu);
                    sakat.appendChild(conURL);

                    circuitsList.appendChild(sakat)

                    sakat.addEventListener('mouseenter', function() {
                        sakat.style.color = 'red';
                    });
                    sakat.addEventListener('mouseleave', () => {
                        sakat.style.color = '';

                    });

                })
                details.appendChild(circuitsList);
           
        } else {
            details.textContent = 'No results found.';
        }
    }


    document.querySelector('#type').addEventListener('change', function(event) {
        if (event.target.value === 'race') {
            raceInput.style.display = 'block';
        } else {
            raceInput.style.display = 'none';
        }
    });
}});
