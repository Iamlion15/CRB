// worker.js (Your worker file)
const readXlsxFile = require('read-excel-file');
self.onmessage = function (e) {
    const selectedFile = e.data;
  
    // Use CommonJS syntax to require the 'read-excel-file' library
  
  
    // Use the 'read-excel-file' library to read the Excel file
    readXlsxFile(selectedFile)
      .then((rows) => {
        // Process the data and send it back to the main thread
        self.postMessage(rows);
      })
      .catch((error) => {
        console.error('Error reading Excel file:', error);
        // Send an error message back to the main thread if needed
        self.postMessage({ error: 'Failed to read the file' });
      });
  };
  