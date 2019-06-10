import {
  Renderer2,
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren,
  EventEmitter,
  OnChanges,
  AfterViewChecked,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
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

import {
  autocomplete
} from '../../../assets/js/autocomplete.js';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { Observable, of } from 'rxjs';

import {
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';

import {
  Validators
} from '@angular/forms';

import {
  ProductSpecs,
  ProductSpecsByCategory,
  ProductSpecsCategory,
  SpecsColumnCombinations,
  ExcelForExport,
  ProductSpecsComment
} from '../../models/productspecs';

@Component({
  selector: 'app-searchstyle',
  templateUrl: './searchstyle.component.html',
  styleUrls: ['./searchstyle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchstyleComponent implements AfterViewChecked, OnDestroy, OnInit, OnChanges {
  productSpecsByCategory: ProductSpecsByCategory;

  productSpecsCategoryList: ProductSpecsCategory[] = [];
  firstColumn: ProductSpecsCategory[] = [];
  secondColumn: ProductSpecsCategory[] = [];
  productSpecsCategory: ProductSpecsCategory;
  productSpecs: ProductSpecs;
  productSpecsSeasons: string[] = [];
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
  searchText: FormControl;
  seasonId: FormControl;
  searchStyleForm: FormGroup;
  sketchOnly: boolean = false;
  approver: string;
  cftInCharge: string;
  fromSearchInput: boolean = false;  
  @Input() productSpecsObservable: Observable<any>;
  @Input() productSessonsObservables: Observable<any>;



  constructor(
    private excelService: ExcelService,
    private productSpecsService: ProductSpecsService,
    private renderer: Renderer2,
    fb: FormBuilder) {

    this.searchText = new FormControl('', Validators.required);
    this.seasonId = new FormControl('', Validators.required);

    this.searchStyleForm = fb.group({
      'searchText': this.searchText,
      'seasonId': this.seasonId
    });


    this.getProductSpecsSeasons();

    // When the component is initialized, we want to immediately detach the
        // change detector so that the component's view will not be updated.
    //  changeDetectorRef.detach();
    // changeDetectorRef: ChangeDetectorRef

  }

  getProductSpecs(seasonId: string): void {

    this.productSpecsService.getProductSpecs(seasonId)
      .toPromise()
      .then(productSpecs => {

        console.log("Initialize Autocomplete");
        autocomplete(document.getElementById("myInput"), productSpecs);

      });

  }

  getProductSpecsSeasons(): void {

    this.productSessonsObservables = this.productSpecsService.getProductSpecsSeasons();

    this.productSessonsObservables.subscribe(seasons => {

        console.log("Initialize Seasons");

        console.log(seasons);

        this.productSpecsSeasons = seasons;

      });

      setInterval(function(){ console.log("set interval: 500"); }, 500);
  }

  ngOnChanges() {

    console.log("ngOnChanges");

  }

  ngOnDestroy() {
    console.log("ngOnDestroy");

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
    this.fromSearchInput = false;

    $("#hidden-content").css("visibility", "hidden");
    if ($("#hidden-content").css("display") == "block")
    {
      $("#hidden-content").css("display", "none");
    }


      document.removeEventListener("click", null);
      document.removeEventListener("click", null);
      document.removeEventListener("click", null);

      document.removeEventListener("click", null, true);
      document.removeEventListener("click", null, false);

      this.documentBody.removeEventListener("click", null);
      this.documentBody.removeEventListener("click", null);
      this.documentBody.removeEventListener("click", null, true);
      this.documentBody.removeEventListener("click", null, false);
  }


  ngOnInit() {
    console.log("ngOnInit");


    if (event)
      if (event.type == "click")
        return;


    console.log("Event: " + event.type);
    console.log("Event Bubbles: " + event.bubbles);
    console.log("Cancel Bubbles: " + event.cancelBubble);
    console.log("Cancel Cancelable: " + event.cancelable);
    console.log("Cancel ComposedPath: " + event.composedPath());
    console.log("Current Target: " + event.currentTarget);
    console.log("Event Phase: " + event.eventPhase);
    console.log("Is Trusted: " + event.isTrusted);
    console.log("Target: " + event.target);




    document.removeEventListener("click", null);
    document.removeEventListener("click", null);

    document.removeEventListener("click", null, true);
    document.removeEventListener("click", null, false);

    this.documentBody.removeEventListener("click", null);
    this.documentBody.removeEventListener("click", null);
    this.documentBody.removeEventListener("click", null, true);
    this.documentBody.removeEventListener("click", null, false);


    $("#firstColumn").removeEventListener("click", null);
    $("#secondColumn").removeEventListener("click", null);
    $("#thirdColumn").removeEventListener("click", null);

    $("#thirdColumn").removeEventListener("click", null);

  }


  ngAfterViewChecked() {

    console.log("ngAfterViewChecked");

    if (this.productSpecsByCategory && this.productSpecs) {
      var prodId = "";

      // var sketchProd = $("#sketchProd").val();
      // console.log(sketchProd);

      // if (!sketchProd) {
      //   var second = $('[id^=Second]').val();

      //   if (second)
      //     sketchProd = second.replace("Second", "");

      //   console.log("Second Sketch: " + sketchProd);
      // }

      // if (sketchProd)
      //   if (sketchProd == this.productSpecs.recId)
      //     return;

      // if (this.fromSearchInput == false)
      //   return;

      console.log("PRODUCTSPECSBYCATEGORY REQUEST NOT RETURNED");

      $("#firstColumn").empty();
      $("#secondColumn").empty();
      $("#thirdColumn").empty();


      if ($("#firstColumn").is(":empty") && $("#secondColumn").is(":empty") && $("#thirdColumn").is(":empty")) {

        let productSpecsList = this.productSpecsCategoryList;
        console.log(productSpecsList);

        var totalHtmlHeight = 0;

        for (var productSpecsIndex in productSpecsList) {
          let height = 0;

          let idSelector = "#Specs" + (productSpecsList[productSpecsIndex].recId).toLowerCase();
          var specs = $(idSelector);
          console.log(idSelector);

          height = height + specs.innerHeight();

          for (var comment of productSpecsList[productSpecsIndex].productSpecsComments) {
            if (comment.attachment) {
              console.log("attachment height: " + comment.attachmentHeight);
              height = height + comment.attachmentHeight;
            }
          }

          console.log("Actual Category Height: " + height);

          productSpecsList[productSpecsIndex].htmlHeight = height;

          totalHtmlHeight = totalHtmlHeight + height;


        }


        var sketchHtmlHeight = $("#sketch").innerHeight();
        var productSpecs = this.productSpecsByCategory.productSpecs;
        var sketchHeight = sketchHtmlHeight + productSpecs.attachmentHeight;

        console.log(sketchHtmlHeight);
        console.log(productSpecs.attachmentHeight);
        console.log("Sketch Height: " + sketchHeight);
        console.log("Total Html Height Witout Sketch Height: " + totalHtmlHeight);

        totalHtmlHeight = totalHtmlHeight + sketchHeight;
        console.log("Total Html Height: " + totalHtmlHeight);

        console.log(sketchHeight);

        if (!Number.isNaN(sketchHeight) && sketchHeight > 0)
          this.sketchHeight = sketchHeight;

        if (!Number.isNaN(totalHtmlHeight) && totalHtmlHeight > 0)
          this.totalHtmlHeight = totalHtmlHeight;


        $("#exportToPDFSearch").css("display", "block");


        setInterval(function(){ this.renderColumns(); }, 300);

      }
    }
  }

  exportToPDF(e) {

    var button = $("#exportToPDFSearch");
    button.css("display", "none");

    var searchBox = $("#searchBox");
    searchBox.css("display", "none");

    var scroll = $("#scroll");
    scroll.css("display", "none");

    var title = $(".float-center");
    title.css("position", "relative");

    var screenHeight = screen.height - 200;
    console.log("Screen Height: " + screenHeight);

    var renderFooter = true;

    if (screenHeight > this.balanceHeight)
      renderFooter = false;

    console.log($("#firstColumn").innerHeight);
    console.log($("#secondColumn").innerHeight);
    console.log($("#thirdColumn").innerHeight);

    var footer = $("#footer");
    var showFixed = $(".show-fixed");

    if (renderFooter) {
      footer.css("position", "relative");
      footer.css("margin-top", "0");

      showFixed.parent().css("position", "relative");
      showFixed.parent().css("margin-top", "0");
    }

    var data = document.getElementById("content");

    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      console.log("Canvas Height: " + canvas.height);
      console.log("Canvas Width: " + canvas.width);

      var imgWidth = 208;
      var pageHeight = 350;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(this.productSpecs.styleId + ".pdf"); // Generated PDF  

      button.css("display", "block");
      searchBox.css("display", "block");
      scroll.css("display", "block");
      title.css("position", "absolute");

      if (renderFooter) {
        footer.css("position", "fixed");
        footer.css("margin-top", "-50px");

        showFixed.parent().css("position", "fixed");
        showFixed.parent().css("margin-top", "-50px");
      }

    });

  }

  exportToExcel(e) {

    console.log("exportToExcel");

    this.productSpecsService.getExcelFileDisplayById(this.productSpecs.recId)
      .toPromise()
      .then(excel => {

        console.log(excel);

        this.excelService.exportToExcel(excel, this.productSpecs.styleId);

        console.log("done exporting");
      });


  }

  renderColumns(): void {

    let totalHtmlHeight = this.totalHtmlHeight;
    let balanceHeight = totalHtmlHeight / 2;
    this.balanceHeight = balanceHeight;

    console.log("Balance Height: " + balanceHeight);

    this.getClosestBalanceHeight(this.productSpecsCategoryList);

    let closestBalanceCombination = this.findClosestToBalanceHeight(this.firstColumnIndexHeight);
    console.log("closestBalanceCombination: " + closestBalanceCombination);

    if (closestBalanceCombination.length) {
      let closestIndex = closestBalanceCombination.split("|");
      let closestPossibleCombination = this.specsColumnCombinations.find(function (prod) {
        return prod.index == closestIndex[0];
      });

      console.log(closestPossibleCombination);


      this.firstColumn = closestPossibleCombination.firstColumn;
      this.secondColumn = closestPossibleCombination.secondColumn;

      console.log("display none");
      console.log("#hidden-content display none");
      $("#hidden-content").css("display", "none");

      let firstColumnHtml = this.getFirstColumnHtml(this.firstColumn);
      // console.log(firstColumnHtml);

      let secondColumnHtml = this.getSecondColumnHtml(this.secondColumn);
      // console.log(secondColumnHtml);

      if ($("#firstColumn").is(":empty") && $("#secondColumn").is(":empty") && $("#thirdColumn").is(":empty"))
      {

        setInterval(function(){ 

          $("#firstColumn").html(firstColumnHtml);
          $("#secondColumn").html(secondColumnHtml);

        }, 500);     
     

      $().fancybox({
        selector: "[data-fancybox='images']"
      });

      }

      console.log("fancybox initialized");
      

    } else if (this.sketchOnly) {

      console.log("Sketch Only: " + this.sketchOnly);
      
      if ($("#firstColumn").is(":empty") && $("#secondColumn").is(":empty") && $("#thirdColumn").is(":empty"))
      {
        let secondColumnHtml = this.getSecondColumnHtml(this.secondColumn);
        $("#thirdColumn").html(secondColumnHtml);
      }
    }

  }

  getFirstColumnHtml(firstColumn: ProductSpecsCategory[]): any {

    let firstColumnHtml = "<div class='col-md-6'>";

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


    firstColumnHtml += "</div>";

    return firstColumnHtml;
  }

  getSecondColumnHtml(secondColumn: ProductSpecsCategory[]): any {

    let secondColumnHtml = "<div class='col-md-6'>";

    if (this.sketchOnly)
      secondColumnHtml = "<div class='col-md-3'></div><div class='col-md-6'>";

    console.log("sketchOnly: " + this.sketchOnly)


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

    console.log(sketchHtml);

    secondColumnHtml += sketchHtml;


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

      if (!this.sketchOnly)
        secondColumnHtml += childElement;

    }


    if (!this.sketchOnly)
      secondColumnHtml += "</div>";
    else
      secondColumnHtml += "</div><div class='col-md-3'></div>";

    console.log(secondColumnHtml);
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

    // if (listHeight.length > 0)
    //   alert(listHeight.length);

    if (listHeight.length) {

      listHeight.sort(function (a, b) {
        let aSplit = a.split("|");
        let bSplit = b.split("|");

        let aParse = parseFloat(aSplit[1]);
        let bParse = parseFloat(bSplit[1]);

        return aParse - bParse;
      });

      console.log(listHeight);

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
    console.log("getCombinations");

    // alert(productSpecsCategoryList.length);

    var recIds = [];

    console.log(productSpecsCategoryList);
    for (let index in productSpecsCategoryList) {
      console.log(productSpecsCategoryList[index]);
      recIds.push(productSpecsCategoryList[index].recId);
    }

    console.log(recIds);

    let arrayCombinations = this.getArrayCombinations(recIds, 1);
    console.log(arrayCombinations);

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

      console.log(firstColumn);
      console.log("First Column Total Height: " + firstColumnTotalHtmlHeight);

      var secondColumnCombinations = recIds.filter(function (item) {
        return arrayCombinations[firstIndex].indexOf(item) === -1;
      });

      console.log(secondColumnCombinations);


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

      console.log(secondColumnTotalHtmlHeight);
      console.log(secondColumn);

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

    console.log(this.specsColumnCombinations);
  }

  searchProductSpecs(searchText: string, season: string): void {

    console.log("Search Text: " + searchText);

    
    this.productSpecsObservable = this.productSpecsService.searchProductSpecs(searchText, season);

    this.productSpecsObservable.subscribe((productSpecsByCategory: ProductSpecsByCategory) => {

        console.log(productSpecsByCategory);

        this.productSpecsByCategory = productSpecsByCategory;

        this.productSpecs = productSpecsByCategory.productSpecs;

        console.log(this.productSpecs);

        this.cftInCharge = this.productSpecs.cftInCharge;
        console.log("CFT IN CHARGE: " + this.cftInCharge);

        var dictionary = productSpecsByCategory.productSpecsByCategoryCollection as ProductSpecsCategory[];

        for (var prodByCategory in dictionary) {

          this.productSpecsCategoryList.push(dictionary[prodByCategory]);

          if (!this.approver || this.approver == "") {

            let productComments = dictionary[prodByCategory].productSpecsComments;
            for (let index in productComments) {
              if (productComments[index].approvedBy) {
                this.approver = productComments[index].approvedBy;
              }
            }

          }

        }

        console.log(this.productSpecsCategoryList.length);


        if (!this.productSpecsCategoryList.length) {
          this.sketchOnly = true;
          this.approver = null;
        }

      });


    setInterval(function(){ console.log("productSpecsObservable set interval: 700"); }, 700);


    console.log("approver: " + this.approver);
    console.log("CTF In Charge: " + this.cftInCharge);
    console.log("searchProductSpecs Done");
  }

  onSearchStyle() {

    console.log("onSearchStyle");

    console.log(this.searchStyleForm.valid);
    console.log(this.searchStyleForm);

    $("#hidden-content").css("visibility", "hidden");
    $("#hidden-content").css("display", "block");
    console.log("hidden-content display block");

    this.productSpecsByCategory = null;
    this.productSpecs = null;
    this.firstColumn = [];
    this.secondColumn = [];
    this.productSpecsCategoryList = [];
    this.sketchOnly = false;
    this.balanceHeight = 0;
    this.totalHtmlHeight = 0;
    this.sketchHeight = 0;
    this.specsColumnCombinations = [];
    this.firstColumnIndexHeight = [];
    this.secondColumnIndexHeight = [];
    this.approver = "";
    this.cftInCharge = "";
    this.fromSearchInput = false;


    if (this.searchStyleForm.valid) {

      let searchText = $("#myInput").val();
      console.log(searchText);

      let seasonSelect = $("#seasonSelect").val();
      console.log(seasonSelect);

      if (searchText == "" || seasonSelect == "")
        return;

      if (searchText && seasonSelect) {
        this.fromSearchInput = true;
        this.searchProductSpecs(searchText, seasonSelect);
      }


      $("#myInput").val("");

    }


  }

  onInput(e) {

    var seasonVal = $("#seasonSelect").val();
    console.log("season value: " + seasonVal);

    if (!seasonVal) {
      if ($("#searchValidation").css("display") == "none")
        $("#searchValidation").css("display", "block");

      e.preventDefault();
    } else {

      if ($("#searchValidation").css("display") == "block")
        $("#searchValidation").css("display", "none");

    }

  }

  onSeasonSelect(e) {

    console.log("onSeasonSelect");

    console.log(e.target.value);

    let seasonVal = e.target.value;
    console.log(seasonVal);

    if (seasonVal)
      this.getProductSpecs(seasonVal);
    else
      console.log("Select is empty");

  }


}
