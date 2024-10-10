console.log("Hello back to school!")

const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// Function to log workbok information

function logWorkbookInformation() {
    //get the actual workbook
    workbook = viz.workbook;
    console.log(`The workbook name is ${workbook.name}`);

    // get the array of dashboards within the workbook
    let sheets = workbook.publishedSheetsInfo;
    sheets.forEach((element) => {
        index = element.index;
        console.log(`The sheet with index ${index} is ${element.name}`);
    });

    // find the currently active sheet
    vizActiveSheet = workbook.activeSheet;
    console.log(`The currently active sheet is ${vizActiveSheet.name}`);

    // finding all the worksheets within the active sheet
    listSheets = vizActiveSheet.worksheets;
    listSheets.forEach((element) => {
        index = element.index;
        worksheetName = element.name;
        console.log(`The worksheet with index ${index} is called ${worksheetName}`);
    });

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

const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

viz.addEventListener("firstinteractive", logWorkbookInformation);

oregonWashingtonButton.addEventListener("click", oregonWashFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDo);