// script.js

// View Toggle: Switch between Grid and List View
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const datasetContainer = document.getElementById('dataset-container');

gridViewBtn.addEventListener('click', () => {
    datasetContainer.classList.add('grid-view');
    datasetContainer.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
    datasetContainer.classList.add('list-view');
    datasetContainer.classList.remove('grid-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
});

// Apply Filters
document.querySelector('.apply-filters').addEventListener('click', () => {
    const datasetType = document.getElementById('dataset-type').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const region = document.getElementById('region').value;

    filterDatasets(datasetType, startDate, endDate, region);
});

function filterDatasets(type, start, end, region) {
    // Example logic to filter datasets based on type, date, and region
    // This will need to be connected to real data, but for now, it's just a mockup
    const datasets = document.querySelectorAll('.dataset-card');
    datasets.forEach((dataset) => {
        // Sample filtering logic (modify as per real dataset structure)
        if ((type === 'all' || dataset.innerHTML.includes(type)) &&
            (region === 'all' || dataset.innerHTML.includes(region))) {
            dataset.style.display = 'block';
        } else {
            dataset.style.display = 'none';
        }
    });
}
