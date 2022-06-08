const XLSX = require('xlsx');

const file = XLSX.readFile("./uploads/xlsx/trustedStudents.xlsx");

getXLSXData = () => {

    // For the first sheet of the xlsx file
    const SheetName = file.SheetNames[0];
    const SheetNameContent = file.Sheets[SheetName];
    const json = XLSX.utils.sheet_to_json(SheetNameContent);

    console.log(json);
    console.log(json.length)

    return json;
}


module.exports.getXLSXData = getXLSXData;