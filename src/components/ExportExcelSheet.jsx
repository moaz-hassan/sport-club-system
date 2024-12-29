/* eslint-disable react/prop-types */
import ExcelJS from "exceljs";

function ExportExcelSheet({ FileName, RowsObject, HeaderRowObject }) {
  // Handle Excel export
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(FileName);

    // Add header row
    worksheet.columns = HeaderRowObject.map((header) => ({
      header: header.header,
      key: header.key,
      width: header.width || 15,
    }));

    // Add rows for each team
    RowsObject.forEach((row) => {
      const rowData = HeaderRowObject.map((header) => row[header.key]);
      worksheet.addRow(rowData);
    });

    // Export the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const file = new Blob([buffer], { type: "application/octet-stream" });
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `${FileName}.xlsx`;
    link.click();
  };

  return (
    <button className="export-exel-sheet-btn" onClick={exportToExcel}>
      Export Sheet
    </button>
  );
}

export default ExportExcelSheet;
