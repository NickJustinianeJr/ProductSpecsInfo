import {
  Renderer2,
  Component,
  OnDestroy,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren,
  EventEmitter,
  Output,
  AfterViewChecked
} from '@angular/core';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

import {
  ProductSpecsService,
} from '../../services/productspecs.service';

import {
  ExcelService
} from '../../services/shared.service';

import * as $ from 'jquery';

import '../../../assets/js/prodspecs.js'

import '../../../assets/js/jquery.fancybox.js';

import '../../../assets/js/jszip.js';

import '../../../assets/js/FileSaver.js';

import '../../../assets/js/excel.js';

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

import { Subscription } from 'rxjs';

import {
  ProductSpecs,
  ProductSpecsByCategory,
  ProductSpecsCategory,
  SpecsColumnCombinations,
  ExcelForExport,
  ProductSpecsComment
} from '../../models/productspecs';

import {
  DOCUMENT
} from '@angular/common';

@Component({
  selector: 'app-specsdetails',
  templateUrl: './specsdetails.component.html',
  styleUrls: ['./specsdetails.component.css']
})
export class SpecsdetailsComponent implements AfterViewChecked, OnDestroy  {
  productSpecsByCategory: ProductSpecsByCategory;

  productSpecsCategoryList: ProductSpecsCategory[] = [];
  firstColumn: ProductSpecsCategory[] = [];
  secondColumn: ProductSpecsCategory[] = [];
  productSpecsCategory: ProductSpecsCategory;
  productSpecs: ProductSpecs;
  public firstColumnElement: HTMLElement;
  public childElement: HTMLElement;
  public documentBody: HTMLElement;
  htmlHidden: Object = {
    'visibility': 'hidden'
  };
  totalHtmlHeight: number = 0;
  balanceHeight: number = 0;
  specsColumnCombinations: SpecsColumnCombinations[] = [];
  firstColumnIndexHeight: string[] = [];
  secondColumnIndexHeight: string[] = [];
  sketchHeight: number = 0;  
  
  private httpSubscription: Subscription;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private productSpecsService: ProductSpecsService,
    private excelService: ExcelService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) _document ? : any) {

    this.getProductSpecsByStyleId();

    this.documentBody = _document.body;

  }

  ngOnDestroy() {
    console.log("ngOnDestroy");

    this.httpSubscription.unsubscribe();

    this.productSpecsByCategory = null;
    this.productSpecs = null;
    this.firstColumn = [];
    this.secondColumn = [];
    this.productSpecsCategoryList = [];
    this.balanceHeight = 0;
    this.totalHtmlHeight = 0;
    this.sketchHeight = 0;
    this.specsColumnCombinations = [];
    this.firstColumnIndexHeight = [];
    this.secondColumnIndexHeight = [];
  }

  ngAfterViewChecked() {
    
    if ($("#menu-container"))
      $("#menu-container").remove();
      
      
      
    if (event)
    {
    if (event.type == "blur")
    {
      console.log("return blur");
      return;
    }
  }
  
      if (event)
      {
      if (event.type == "click")
      {
        console.log("return click");
        return;
      }
    }
    
  
    if (this.productSpecsByCategory && this.productSpecs)
    {
      var sketchProd = $("#sketchProd").val();
      console.log(sketchProd);
  
      if (sketchProd == this.productSpecs.recId)
          return;

      console.log("PRODUCTSPECSBYCATEGORY REQUEST NOT RETURNED");

      $("#firstColumn").empty();
      $("#secondColumn").empty();

      if ($("#firstColumn").is(":empty") && $("#secondColumn").is(":empty")) {

        let productSpecsList = this.productSpecsCategoryList;
        // console.log(productSpecsList);

        var totalHtmlHeight = 0;

        for (var productSpecsIndex in productSpecsList) {
          let height = 0;

          let idSelector = "#Specs" + (productSpecsList[productSpecsIndex].recId).toLowerCase();
          var specs = $(idSelector);
          // console.log(idSelector);

          height = height + specs.innerHeight();

          for (var comment of productSpecsList[productSpecsIndex].productSpecsComments) {
            if (comment.attachment) {
              //console.log("attachment height: " + comment.attachmentHeight);
              height = height + comment.attachmentHeight;
            }
          }

         // console.log("Actual Category Height: " + height);

          productSpecsList[productSpecsIndex].htmlHeight = height;

          totalHtmlHeight = totalHtmlHeight + height;
        }


        var sketchHtmlHeight = $("#sketch").innerHeight();
        var productSpecs = this.productSpecsByCategory.productSpecs;
        var sketchHeight = sketchHtmlHeight + productSpecs.attachmentHeight;

        // console.log(sketchHtmlHeight);
        // console.log(productSpecs.attachmentHeight);
        // console.log("Sketch Height: " + sketchHeight);
        // console.log("Total Html Height Witout Sketch Height: " + totalHtmlHeight);

        totalHtmlHeight = totalHtmlHeight + sketchHeight;

        // console.log("Total Html Height: " + totalHtmlHeight);

        this.sketchHeight = sketchHeight;
        this.totalHtmlHeight = totalHtmlHeight;

        this.renderColumns();

      }
    }



  }

  bin2String(array) {

    var result = "";
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(parseInt(array[i], 2));
    }

    return result;
  }

  exportToExcel(e) {

    this.productSpecsService.getExcelFileDraftById(this.productSpecs.recId)
      .toPromise()
      .then(excel => {

        console.log(excel);

        this.excelService.exportToExcel(excel, this.productSpecs.styleId);

        console.log("done exporting");
      });

  }

  exportToPDF(e) {

    console.log("exportToPDF");

    var button = $("#exportToPDF");
    button.css("display", "none");

    var scroll = $("#scroll");
    scroll.css("display", "none");

    var title = $(".float-center");
    title.css("position", "relative");

    var screenHeight = screen.height - 200;
    console.log("Screen Height: " + screenHeight);

    var renderFooter = true;

    if (screenHeight > this.balanceHeight)
      renderFooter = false;

    var footer = $("#footer");

    if (renderFooter) {
      footer.css("position", "relative");
      footer.css("margin-top", "0");
    }

    var data = document.getElementById('content');
    //console.log(data);


    html2canvas(data).then(canvas => {
      // Few necessary setting options  
     // console.log("Canvas Height: " + canvas.height);
    //  console.log("Canvas Width: " + canvas.width);

      var imgWidth = 208;
      var pageHeight = 350;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      // console.log(imgWidth);
      // console.log(pageHeight);
      // console.log(heightLeft);

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(this.productSpecs.styleId + ".pdf"); // Generated PDF   

      button.css("display", "block");
      scroll.css("display", "block");
      title.css("position", "absolute");

      if (renderFooter) {
        footer.css("position", "fixed");
        footer.css("margin-top", "-50px");
      }


    });
  }

  renderColumns(): void {

    let totalHtmlHeight = this.totalHtmlHeight;
    let balanceHeight = totalHtmlHeight / 2;
    this.balanceHeight = balanceHeight;

    // console.log("Balance Height: " + balanceHeight);

    this.getClosestBalanceHeight(this.productSpecsCategoryList);

    let closestBalanceCombination = this.findClosestToBalanceHeight(this.firstColumnIndexHeight);
    // console.log("closestBalanceCombination: " + closestBalanceCombination);

    if (closestBalanceCombination.length) {
      let closestIndex = closestBalanceCombination.split("|");
      let closestPossibleCombination = this.specsColumnCombinations.find(function (prod) {
        return prod.index == closestIndex[0];
      });

      // console.log(closestPossibleCombination);

      this.firstColumn = closestPossibleCombination.firstColumn;
      this.secondColumn = closestPossibleCombination.secondColumn;


      // console.log("#hidden-content removed");
      $("#hidden-content").remove();

      let firstColumnHtml = this.getFirstColumnHtml(this.firstColumn);
      //  console.log(firstColumnHtml);

      let secondColumnHtml = this.getSecondColumnHtml(this.secondColumn);
      // console.log(secondColumnHtml);

      $("#firstColumn").html(firstColumnHtml);
      $("#secondColumn").html(secondColumnHtml);

      $().fancybox({
        selector: "[data-fancybox='images']"
      });

      console.log("fancybox initialized");

    }
  }

  getFirstColumnHtml(firstColumn: ProductSpecsCategory[]): any {

    let firstColumnHtml = "<div class='col-md-6'>";

    if (firstColumn.length) {

      for (var prodSpecs in firstColumn) {
        let childElement =
          "<div class='panel panel-primary heading'><div class='panel-heading' style='height: 30px;'><div class='center'>" +
          "<div style='font-weight: bold; font-size: 16px; padding: 0px; line-height: 30px;'>" +
          firstColumn[prodSpecs].description + "| <span class='text-xs'>" + firstColumn[prodSpecs].ownership + "</span></div>" +
          "</div></div><div class='panel-body'><table class='specs-table'>";

        for (var comment of firstColumn[prodSpecs].productSpecsComments) {

          childElement += "<tr><td style='padding: 8px 0px 8px 0px;'>";
          if (comment.subject) {
            childElement += "<h4 class='text-primary text-overflow text-subject'>" +
              comment.subject + "</h4>";
          }

          childElement += comment.text + "</div>";

          if (comment.attachment) {

            childElement +=
              "<div class='pad-top'><div class='center'>" +
              "<a data-fancybox='images' data-height='1365' href='assets/images/" + comment.attachment + "'>" +
              "<img src='assets/images/" + comment.attachment + "' alt='112-sketch.jpg' class='assets-img' /></a>" +
              "</div></div>";
          }

          childElement += "</td></tr>";
        }

        childElement += "</table></div></div>";

        firstColumnHtml += childElement;

      }

    }

    firstColumnHtml += "</div>";

    return firstColumnHtml;
  }

  getSecondColumnHtml(secondColumn: ProductSpecsCategory[]): any {

    let secondColumnHtml = "<div class='col-md-6'>";


    let attachment = "";

    if (this.productSpecs.attachment)
      attachment = this.productSpecs.attachment;

    let sketchHtml = "<div class='panel panel-primary heading'><div class='panel-heading' style='height: 30px;'>" +
      "<div class='center'><div style='font-weight: bold; font-size: 16px; padding: 0px;line-height: 30px;'>" +
      "SKETCH/ REFERENCE SAMPLE | <span class='text-xs'>CFT</span></div></div></div>" +
      "<div class='panel-body'><div class='center'><a href='assets/images/" + attachment +
      "' data-fancybox='images' data-height='1365'><img src='assets/images/" + attachment +
      "'alt='" + attachment + "' />" +
      "<input type='hidden' id='sketchProd' value='" + this.productSpecs.recId.toLowerCase() + "' />" +
      "</a></div></div></div>"

    secondColumnHtml += sketchHtml;

    if (secondColumn.length) {

      for (var prodSpecs in secondColumn) {
        let childElement =
          "<div class='panel panel-primary heading'><div class='panel-heading' style='height: 30px;'><div class='center'>" +
          "<div style='font-weight: bold; font-size: 16px; padding: 0px; line-height: 30px;'>" +
          secondColumn[prodSpecs].description + "| <span class='text-xs'>" + secondColumn[prodSpecs].ownership + "</span></div>" +
          "</div></div><div class='panel-body'><table class='specs-table'>";

        for (var comment of secondColumn[prodSpecs].productSpecsComments) {
          childElement += "<tr><td style='padding: 8px 0px 8px 0px;'>";
          if (comment.subject) {
            childElement += "<h4 class='text-primary text-overflow text-subject'>" +
              comment.subject + "</h4>";
          }

          childElement += comment.text + "</div>";

          if (comment.attachment) {
            childElement +=
              "<div class='pad-top'><div class='center'><a href='assets/images/" + comment.attachment +
              "' data-fancybox='images' data-height='1365'><img src='assets/images/" +
              comment.attachment + "' alt='" + comment.attachment + "' class='assets-img' /></a></div></div>"
          }

          childElement += "</td></tr>";
        }

        childElement += "</table></div></div>";

        secondColumnHtml += childElement;

      }

    }

    secondColumnHtml += "</div>";

    return secondColumnHtml;

  }

  getArrayCombinations(list, min): any {

    var fn = function (n, src, got, all) {
      if (n == 0) {
        if (got.length > 0) {
          all[all.length] = got;
        }
        return;
      }
      for (var j = 0; j < src.length; j++) {
        fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
      }
      return;
    }

    var all = [];
    for (var i = min; i < list.length; i++) {
      fn(i, list, [], all);
    }

    all.push(list);

    return all;

  }

  findClosestToBalanceHeight(listHeight: any): any {

    let goal = this.balanceHeight;
    console.log("Goal: " + goal);
    
    // console.log(listHeight);

    if (listHeight.length) {

      listHeight.sort(function (a, b) {
        let aSplit = a.split("|");
        let bSplit = b.split("|");

        let aParse = parseFloat(aSplit[1]);
        let bParse = parseFloat(bSplit[1]);

        return aParse - bParse;
      });

      // console.log(listHeight);

      let closest = parseFloat(listHeight[0].split("|")[1]);
      let secondHeight = parseFloat(listHeight[0].split("|")[2]);

      let smallestDiff = Math.abs(goal - closest);
      closest = 0; //index of the current closest number

      for (var i = 1; i < listHeight.length; i++) {

        let value = parseFloat(listHeight[i].split("|")[1]);
        let secondHeight = parseFloat(listHeight[i].split("|")[2]);

        let currentDiff = Math.abs(goal - value);
        if (currentDiff < smallestDiff) {

          smallestDiff = currentDiff;
          closest = i;

        }
      }

      return listHeight[closest];

    } else {
      return [];
    }
  }

  getClosestBalanceHeight(productSpecsCategoryList: ProductSpecsCategory[]): void {
    //console.log("getCombinations");

    var recIds = [];

    // console.log(productSpecsCategoryList);
    for (let index in productSpecsCategoryList) {
      // console.log(productSpecsCategoryList[index]);
      recIds.push(productSpecsCategoryList[index].recId);
    }

  //  console.log(recIds);

    let arrayCombinations = this.getArrayCombinations(recIds, 1);
    //console.log(arrayCombinations);

    let index = 0;

    for (let firstIndex in arrayCombinations) {
      let firstColumn: ProductSpecsCategory[] = [];
      let secondColumn: ProductSpecsCategory[] = [];
      let firstColumnTotalHtmlHeight = 0;
      let secondColumnTotalHtmlHeight = 0;

      let combinations = arrayCombinations[firstIndex];

      for (let secondIndex in combinations) {

        let prodSpecs = this.productSpecsCategoryList.find(function (prod) {
          return prod.recId == combinations[secondIndex];
        });

        firstColumnTotalHtmlHeight = firstColumnTotalHtmlHeight + prodSpecs.htmlHeight;

        firstColumn.push(prodSpecs)
      }

     // console.log(firstColumn);
     // console.log("First Column Total Height: " + firstColumnTotalHtmlHeight);

      var secondColumnCombinations = recIds.filter(function (item) {
        return arrayCombinations[firstIndex].indexOf(item) === -1;
      });

    //  console.log(secondColumnCombinations);


      for (let secondIndex in secondColumnCombinations) {

        let prodSpecs = this.productSpecsCategoryList.find(function (prod) {
          return prod.recId == secondColumnCombinations[secondIndex];
        });

        if (prodSpecs) {
          secondColumnTotalHtmlHeight = secondColumnTotalHtmlHeight + prodSpecs.htmlHeight;
          secondColumn.push(prodSpecs);
        }
      }

      secondColumnTotalHtmlHeight = secondColumnTotalHtmlHeight + this.sketchHeight;

    //  console.log(secondColumnTotalHtmlHeight);
     // console.log(secondColumn);

      if (firstColumn.length) {
        let specsColumnCombinations = new SpecsColumnCombinations();
        specsColumnCombinations.index = index;
        specsColumnCombinations.firstColumn = firstColumn;
        specsColumnCombinations.secondColumn = secondColumn;
        specsColumnCombinations.firstColumnTotalHtmlHeight = firstColumnTotalHtmlHeight;
        specsColumnCombinations.secondColumnTotalHtmlHeight = secondColumnTotalHtmlHeight;

        this.specsColumnCombinations.push(specsColumnCombinations);

        this.firstColumnIndexHeight.push(index + "|" + firstColumnTotalHtmlHeight +
          "|" + secondColumnTotalHtmlHeight);
        this.secondColumnIndexHeight.push(index + "|" + secondColumnTotalHtmlHeight);

        index++;
      }

    }

  //  console.log(this.specsColumnCombinations);
  }


  getProductSpecsByStyleId(): void {
    let seasonId = this.route.snapshot.params.seasonId;
    let styleId = this.route.snapshot.params.styleId;
    let sampleStage = this.route.snapshot.params.sampleStage;
    // console.log("Season ID: " + seasonId);
    // console.log("Style ID: " + styleId);
    // console.log("Sample Stage: " + sampleStage);

    this.httpSubscription = this.productSpecsService.getProductSpecsByStyleId(seasonId, styleId, sampleStage)
      .subscribe((productSpecsByCategory: ProductSpecsByCategory) => {

        // console.log("Hey");

        // console.log(productSpecsByCategory);

        this.productSpecsByCategory = productSpecsByCategory;

        this.productSpecs = productSpecsByCategory.productSpecs;

        // console.log(this.productSpecs);

        var dictionary = productSpecsByCategory.productSpecsByCategoryCollection as ProductSpecsCategory[];

        for (var prodByCategory in dictionary) {
          this.productSpecsCategoryList.push(dictionary[prodByCategory]);
        }

      });

    console.log("getProductSpecsByStyleId Done");
  }


}
