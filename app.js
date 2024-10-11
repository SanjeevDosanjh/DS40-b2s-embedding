console.log("Hello back to school!");

// Variables for Tableau visualization
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// Variables for game functionality
let hitCount = 0;
const targets = document.querySelectorAll('.target');
const gameStatus = document.getElementById('gameStatus');
const dashboardContainer = document.getElementById('dashboard-container');

// Tableau-related functions
function logWorkbookInformation() {
    // Get the actual workbook
    workbook = viz.workbook;
    console.log(`The workbook name is ${workbook.name}`);

    // Get the array of dashboards within the workbook
    let sheets = workbook.publishedSheetsInfo;
    sheets.forEach((element) => {
        let index = element.index;
        console.log(`The sheet with index ${index} is ${element.name}`);
    });

    // Find the currently active sheet
    vizActiveSheet = workbook.activeSheet;
    console.log(`The currently active sheet is ${vizActiveSheet.name}`);

    // Finding all the worksheets within the active sheet
    listSheets = vizActiveSheet.worksheets;
    listSheets.forEach((element) => {
        let index = element.index;
        let worksheetName = element.name;
        console.log(`The worksheet with index ${index} is called ${worksheetName}`);
    });

    // Assign worksheets to variables based on their names
    saleMap = listSheets.find((ws) => ws.name == "SaleMap");
    totalSales = listSheets.find((ws) => ws.name == "Total Sales");
    salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
    salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

function oregonWashFunction() {
    console.log(oregonWashingtonButton.value);
    saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
    totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
    salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
    salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function clearStateFilter() {
    console.log(clearFilterButton.value);
    saleMap.clearFilterAsync("State");
    totalSales.clearFilterAsync("State");
    salesByProduct.clearFilterAsync("State");
    salesBySegment.clearFilterAsync("State");
}

function unDo() {
    console.log(undoButton.value);
    viz.undoAsync();
}

// Game-related functions
function checkGameCompletion() {
    if (hitCount >= 3) {
        gameStatus.innerText = `Success! You unlocked the dashboard!`;
        setTimeout(() => {
            document.querySelector('.game-container').style.display = 'none'; // Hide game container
            dashboardContainer.style.display = 'block'; // Show dashboard
        }, 500);
    }
}

// Add click event listener for each target in the game
targets.forEach(target => {
    target.addEventListener('click', () => {
        target.style.backgroundColor = '#7bc043'; // Change target color when clicked
        hitCount += 1; // Increment hit counter
        gameStatus.innerText = `Hits: ${hitCount}/3`; // Update game status

        checkGameCompletion(); // Check if the user has completed the game
    });
});

// Hooking up Tableau and buttons to the DOM
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// Add event listener to Tableau viz when it's ready
viz.addEventListener("firstinteractive", logWorkbookInformation);

// Hook up filter and undo button listeners
oregonWashingtonButton.addEventListener("click", oregonWashFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDo);
