const XLSX = require('xlsx');

const file = XLSX.readFile("./uploads/xlsx/trustedStudents.xlsx");

getXLSXData = () => {

    const sheetLength = file.SheetNames.length;
    var globalContent = [];

    for (i = 0; i < sheetLength; i++) {
        const SheetName = file.SheetNames[i];
        const SheetNameContent = file.Sheets[SheetName];
        const json = XLSX.utils.sheet_to_json(SheetNameContent);
        
        json.forEach (element =>  {
            globalContent.push(element);
        })
    }

    return globalContent;
}



module.exports.getXLSXData = getXLSXData;