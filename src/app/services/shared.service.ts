import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';
import { WorkBook, utils } from 'xlsx';

import { EXCEL_BASE64, PICTURE, XLSXBASE64, EXCELWITHIMAGEBASE64 } from '../services/constants';

//const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const XLSX_EXTENSION = '.xlsx';

const XLSM_EXTENSION = '.xlsm';

import {
  ProductSpecs,
  ProductSpecsByCategory,
  ProductSpecsCategory
} from '../models/productspecs';


//import { EXCEL_BASE64 } from '../services/constants';

@Injectable({ providedIn: 'root' })
export class ExcelService {

constructor() { }

public stripHtml(html): string{
  // Create a new div element
  var temporalDivElement = document.createElement("div");
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = html;
  // Retrieve the text property of the element (cross-browser support)
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
}


public exportAsExcelFile(productSpecsCategoryList: ProductSpecsCategory[], excelFileName: string): void {
  
  console.log(productSpecsCategoryList);

  let data = [];
  
  let rowNumber = 1;

  for (var index in productSpecsCategoryList)
  {
    if (rowNumber > 1)
    {
      data.push({ A: "", B: "", C: "", D: "" });
    }
      
    if (productSpecsCategoryList[index].description.includes("REFERENCE SAMPLE"))
    {
      data.push({
        A: productSpecsCategoryList[index].code,
        B: productSpecsCategoryList[index].description,
        C: productSpecsCategoryList[index].ownership,
        D: "=FormatCells(\"" + productSpecsCategoryList[index].productSpecsComments[0].attachment + "\")"
      });

      continue;
    }


    let subject = this.stripHtml(productSpecsCategoryList[index].productSpecsComments[0].subject);

    let text = this.stripHtml(productSpecsCategoryList[index].productSpecsComments[0].text);

    data.push({
      A: productSpecsCategoryList[index].code,
      B: productSpecsCategoryList[index].description,
      C: productSpecsCategoryList[index].ownership,
      D: subject + "\n\r" + text
    });

    
    if (productSpecsCategoryList[index].productSpecsComments[0].attachment)
    {
      var insertRow = {
        A: "",
        B: "",
        C: "",
        D: "=FormatCells(\"" + productSpecsCategoryList[index].productSpecsComments[0].attachment + "\")"
      };

      console.log(insertRow);

      data.push(insertRow);
    }


    let productSpecsComments = productSpecsCategoryList[index].productSpecsComments;

    let counter = 0;

    for (let indexComment in productSpecsComments)
    {
      let subject = this.stripHtml(productSpecsComments[indexComment].subject);

      let text = this.stripHtml(productSpecsComments[indexComment].text);

      if (counter != 0)
      {
        data.push({ A: "", B: "", C: "", D: "" });

         data.push({
          A: "",
          B: "",
          C: "",
          D: subject + "\n\r" + text
          });

        if (productSpecsComments[indexComment].attachment)
        {
          var insertRow = {
            A: "",
            B: "",
            C: "",
            D: "=FormatCells(\"" + productSpecsComments[indexComment].attachment + "\")"
          };
          
            data.push(insertRow);

            console.log(insertRow);
        }
      }
      
      counter++;
      
    }
  }
    
console.log(EXCEL_BASE64);



let workBook = XLSX.read(XLSXBASE64, {
  type: 'base64',
   bookVBA: true,
  // bookFiles: true,
  // WTF: true,
  // bookProps: true,
  // bookSheets: true,
  // cellText: true,
  // cellFormula: true,
   cellStyles: true,
  // raw: true,
  // sheetRows: 1
});

console.log(data);
console.log(workBook);
console.log(workBook.Sheets.ProductSpecsSheet);

workBook.Sheets.ProductSpecsSheet.A1.s.bgColor = { rgb: workBook.Sheets.ProductSpecsSheet.A1.s.fgColor.rgb };
workBook.Sheets.ProductSpecsSheet.B1.s.bgColor = { rgb: workBook.Sheets.ProductSpecsSheet.B1.s.fgColor.rgb };
workBook.Sheets.ProductSpecsSheet.C1.s.bgColor = { rgb: workBook.Sheets.ProductSpecsSheet.C1.s.fgColor.rgb };
workBook.Sheets.ProductSpecsSheet.D1.s.bgColor = { rgb: workBook.Sheets.ProductSpecsSheet.D1.s.fgColor.rgb };

for (let property in workBook.Sheets.ProductSpecsSheet)
{
  if (workBook.Sheets.ProductSpecsSheet.hasOwnProperty(property))
  {
      if (!property.includes("!"))
      {
        workBook.Sheets.ProductSpecsSheet[property].s.wrapText = true;
      }
  }
}


XLSX.utils.sheet_add_json(workBook.Sheets.ProductSpecsSheet, 
  data, 
  { skipHeader: true, origin: "A2" });

  
  Object.defineProperty(workBook.Sheets.ProductSpecsSheet, '!type', {
        value:"macro"
      });

      workBook.Sheets.ProductSpecsSheet['!images'] = [
        {
          name: '2.jpg',
          data: PICTURE,
          opts: { base64: true },
          position: {
            type: 'twoCellAnchor',
            attrs: { editAs: 'oneCell' },
            from: { col: 2, row : 2 },
            to: { col: 6, row: 5 }
          }
        }
      ];

console.log(workBook);

  let excelBuffer:any = XLSX.write(workBook, { 
    bookType: 'xlsx',
    type: 'array'
  });



  console.log(excelBuffer);

  this.saveAsExcelFile(excelBuffer, excelFileName);

  // let excelBlob = this.b64toBlob(EXCELWITHIMAGEBASE64, EXCEL_TYPE, null);

  // FileSaver.saveAs(excelBlob, excelFileName + XLSX_EXTENSION);
}


public exportToExcel(excelFileBase64: string, fileName: string): void {
  
  console.log(excelFileBase64);

  let excelBlob = this.b64toBlob(excelFileBase64, EXCEL_TYPE, null);
  
  FileSaver.saveAs(excelBlob, fileName + XLSX_EXTENSION);

}


public saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE });


   FileSaver.saveAs(data, fileName + XLSX_EXTENSION);
}

private b64toBlob(b64Data, contentType, sliceSize): Blob {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];                                                                              

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

var blob = new Blob(byteArrays, {type: contentType});

return blob;
}

private getExcelFileBlob(): Blob {

  const byteCharacters = atob(EXCEL_BASE64);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], {type: EXCEL_TYPE});
}


}