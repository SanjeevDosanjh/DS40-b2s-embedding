console.log("Hello Hello")

const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// Function to log workbook information

function logWorkBookInformation() {
    // get the act
    workbook = viz.workbook;
    console.log(`The workbook name is ${workbook.name}` )

// get the array of dashboards within the workbook
let sheets = workbook.publishedSheetsInfo;
sheets.forEach(element => {
    index = element.index;
    console.log(`The sheet with index ${index} is ${element.name}`);
    
});

// find the currently active sheet
vizActiveSheet = workbook.activeSheet;
console.log(`The currently active sheet is Overview ${vizActiveSheet.name}`)

// finding all the worksheets within the active array
listSheets = vizActiveSheet.worksheets;
listSheets.forEach((element) => {
    index =element.index;
    worksheetName = element.name;
    console.log(`The worksheet with index ${index} is called ${worksheetName}`);
    });

}

viz.addEventListener("firstinteractive", logWorkBookInformation)