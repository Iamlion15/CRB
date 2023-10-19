import exportFromJSON from 'export-from-json'


const ErrorReportedExcel = (data, type) => {
    const exportType = exportFromJSON.types.csv
    const fileName = `${type}-ErrorsData`
    exportFromJSON({ data, fileName, exportType })
};

export default ErrorReportedExcel;
