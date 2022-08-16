const XLSX = require('xlsx');

getXLSXData = (path) => {

    const file = XLSX.readFile(path);

    const sheetLength = file.SheetNames.length;
    var globalContent = [];

    for (i = 0; i < sheetLength; i++) {
        const SheetName = file.SheetNames[i];
        const SheetNameContent = file.Sheets[SheetName];
        const json = XLSX.utils.sheet_to_json(SheetNameContent);

        json.map((entry) => {
            entry.Classe = SheetName;
        });
        
        json.forEach (element =>  {
            globalContent.push(element);
        })
    }

    return globalContent;
}


module.exports.getXLSXData = getXLSXData;