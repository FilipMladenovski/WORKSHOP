const url = 'https://swapi.dev/api/';
let peopleUrl = `${url}people/?page=1`;
let shipsUrl = `${url}starships/?page=1`;

const resultDiv = document.getElementById('result');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPage = 1;

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayPeople(data) {
    let tableHTML = `
        <div class="row yellow padding">
            <div class="col">Name</div>
            <div class="col">Height</div>
            <div class="col">Mass</div>
            <div class="col">Gender</div>
            <div class="col">Birth Year</div>
            <div class="col">Appearances</div>
        </div>
    `;
    data.results.forEach(person => {
        tableHTML += `
            <div class="row white padding">
                <div class="col">${person.name}</div>
                <div class="col">${person.height}</div>
                <div class="col">${person.mass}</div>
                <div class="col">${person.gender || 'N/A'}</div>
                <div class="col">${person.birth_year}</div>
                <div class="col">${person.films.length}</div>
            </div>
        `;
    });
    resultDiv.innerHTML = tableHTML;
}

function displayShips(data) {
    let tableHTML = `
        <div class="row yellow padding">
            <div class="col">Name</div>
            <div class="col">Model</div>
            <div class="col">Manufacturer</div>
            <div class="col">Cost</div>
            <div class="col">People Capacity</div>
            <div class="col">Class</div>
        </div>
    `;
    data.results.forEach(ship => {
        tableHTML += `
            <div class="row white padding">
                <div class="col">${ship.name}</div>
                <div class="col">${ship.model}</div>
                <div class="col">${ship.manufacturer}</div>
                <div class="col">${ship.cost_in_credits}</div>
                <div class="col">${ship.passengers}</div>
                <div class="col">${ship.starship_class}</div>
            </div>
        `;
    });
    resultDiv.innerHTML = tableHTML;
}

function handlePagination() {
    prevBtn.style.display = currentPage === 1 ? 'none' : 'block';
    nextBtn.style.display = 'block';
}

document.getElementById('peopleBtn').addEventListener('click', async () => {
    const peopleData = await fetchData(peopleUrl);
    displayPeople(peopleData);
    currentPage = 1;
    handlePagination();
});

document.getElementById('shipsBtn').addEventListener('click', async () => {
    const shipsData = await fetchData(shipsUrl);
    displayShips(shipsData);
    currentPage = 1;
    handlePagination();
});

nextBtn.addEventListener('click', async () => {
    currentPage++;
    if (resultDiv.innerHTML.includes('Name')) {
        peopleUrl = `${url}people/?page=${currentPage}`;
        const peopleData = await fetchData(peopleUrl);
        displayPeople(peopleData);
    } else {
        shipsUrl = `${url}starships/?page=${currentPage}`;
        const shipsData = await fetchData(shipsUrl);
        displayShips(shipsData);
    }
    handlePagination();
});

prevBtn.addEventListener('click', async () => {
    currentPage--;
    if (resultDiv.innerHTML.includes('Name')) {
        peopleUrl = `${url}people/?page=${currentPage}`;
        const peopleData = await fetchData(peopleUrl);
        displayPeople(peopleData);
    } else {
        shipsUrl = `${url}starships/?page=${currentPage}`;
        const shipsData = await fetchData(shipsUrl);
        displayShips(shipsData);
    }
    handlePagination();
});


