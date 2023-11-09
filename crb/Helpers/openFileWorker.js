import * as xlsx from 'xlsx';

self.onmessage = function(e) {

  const file = e.data;

  const reader = new FileReader();

  reader.onload = (e) => {

    const data = e.target.result;

    const workbook = xlsx.read(data, {type:'binary'});

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const rows = xlsx.utils.sheet_to_json(worksheet, {header: 1});

    self.postMessage(rows);

  };

  reader.readAsBinaryString(file);

};