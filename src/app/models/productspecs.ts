


export class ProductSpecs {

    recId: string;
    to: string;
    seasonId: string;
    sampleStage: string;
    styleId: string;
    createdBy: string;
    ceatedDate: string;
    updatedBy: string;
    updatedDate: string;
    attachment: string;
    attachmentHeight: number;
    cftInCharge: string;
    BRDate: string;
    BUTeam: string;
    
}

export class ProductSpecsComment {
    recId: string;
    seasonId: string;
    styleId: string;
    category: string;
    seq: number;
    text: string;
    CFT: string;
    technologist: string;
    technicalHead: string;
    to: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
    sampleStage: string;
    approvedDate: string;
    approvedBy: string;
    ownership: string;
    subject: string;
    attachment: string;
    attachmentHeight: number;
}


export class ProductSpecsSearchResult {

    recId: string;
    styleId: string;
    sampleStage: string;
    seasonId: string;
}


export class ProductSpecsCategory
{
   recId: string;
   code: string;
   description: string;
   ownership: string;  
   productSpecsComments: ProductSpecsComment[];
   htmlElementString: string;
   htmlHeight: number;
}

 export class ProductSpecsByCategory
 {
  productSpecs: ProductSpecs = new ProductSpecs();
   productSpecsByCategoryCollection: ProductSpecsCategory[];
 }

 
 export class SpecsColumnCombinations
 {
	 index: number;
     firstColumn: ProductSpecsCategory[];
	 secondColumn: ProductSpecsCategory[];
     firstColumnTotalHtmlHeight: number;
	 secondColumnTotalHtmlHeight: number;
	 
 }

 export class ExcelForExport
 {
    Code: string;
    Description: string;
    Ownership: string;
    Comments: string;
 }
