export function autocomplete(inp, arr) {

  console.log("this is a autocomplete script");
  // console.log(inp);
  // console.log(arr);

  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {

    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);

    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {

      if (val.length > 2) {

        var submitButton = document.getElementById("searchBtn");
        // console.log(submitButton);

        // submitButton.setAttribute("disabled", "false");


        /*check if the item starts with the same letters as the text field value:*/
        // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

        if (arr[i].toUpperCase().includes(val.toUpperCase())) {

          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");

          /*make the matching letters bold:*/
          //b.innerHTML = "<strong>" + val.toUpperCase() + "</strong>";

          var searchText = "<strong>" + val.toUpperCase() + "</strong>";

          b.innerHTML += arr[i].replace(val.toUpperCase(), searchText);
          // console.log(b.innerHTML);

          // console.log(searchText);
          

          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i].replace(searchText, val.toUpperCase()) + "'>";
          // console.log(b.innerHTML);
          /*execute a function when someone clicks on the item value (DIV element):*/

          b.addEventListener("click", function (e) {

            /*insert the value for the autocomplete text field:*/
            // alert(this.getElementsByTagName("input")[0].value);
            inp.value = this.getElementsByTagName("input")[0].value;

            // document.getElementById("myInput").value = this.getElementsByTagName("input")[0].value;
            // alert("inp.value: " + inp.value);
            /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
            closeAllLists();
          });

          a.appendChild(b);

        }

        console.log("search");

      } else {

        console.log("set disabled true");
        // submitButton.setAttribute("disabled", "true");

      } // End of Condition

    }
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");

    if (x) x = x.getElementsByTagName("div");

    if (e.keyCode == 40) {

      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;

      /*and and make the current item more visible:*/
      addActive(x);

    } else if (e.keyCode == 38) { //up

      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;

      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {

      // console.log("enter");
      // console.log(currentFocus);

      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();

      var submitButton = document.getElementById("searchBtn");

      if (currentFocus > -1) {

        // console.log(x[currentFocus]);
        // console.log(x);

        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();

        var myInput = document.getElementById("myInput");

        // console.log(myInput);

        submitButton.click();

      } else {

        // console.log(submitButton);

        submitButton.click();

      }

    }

  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {

    console.log("EventListener Click");
    console.log(e.target);

    closeAllLists(e.target);

  });


}
