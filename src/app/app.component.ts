import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dateToday = Date.now();
  visible: boolean = true;
  
  openIconMenu(e) {

    console.log(e.type);
    console.log(e);
    console.log("openIconMenu")

    var element = e.target;
    var childElement = element.nextSibling;
    childElement.classList.add("gn-open-part");
    console.log(childElement);

  
  }

  closeIconMenu(e) {
    console.log(e.type);
    console.log(e);
    console.log("closeIconMenu")

    var element = e.target;
    var childElement = element.nextSibling;    
    childElement.classList.remove("gn-open-part");
    console.log(childElement);
  }
  
  openMenu(e) {

    console.log(e.type);
    console.log(e);
    console.log("openMenu")
    console.log(e.target);

    var ownerDocument = e.target.ownerDocument;
    var gnMenu = ownerDocument.querySelector("#gn-menu");
    var trigger = gnMenu.querySelector(".gn-icon-menu");
    console.log(trigger);
    console.log(gnMenu);

    var menu = gnMenu.querySelector(".gn-menu-wrapper");
    console.log(menu);

    var isMenuOpen = menu.classList.contains("gn-open-all");
    if (isMenuOpen)
      return;

    trigger.classList.add("gn-selected");
    
    menu.classList.add("gn-open-all");

    menu.classList.remove("gn-open-part");

    document.addEventListener("click", this.closeMenu); 
    
    console.log("End of openMenu");
    
  }
  
  closeMenu(e) {

    console.log(e.type);
    console.log(e);
    console.log("closeMenu")
    
    console.log(e.target.ownerDocument);

    var ownerDocument = e.target.ownerDocument;
    var gnMenu = ownerDocument.querySelector("#gn-menu");
    var trigger = gnMenu.querySelector(".gn-icon-menu");
    console.log(trigger);
    var menu = gnMenu.querySelector(".gn-menu-wrapper");
    console.log(menu);

    var isMenuOpen = menu.classList.contains("gn-open-all");
    if (!isMenuOpen)
      return;

    trigger.classList.remove("gn-selected");
    
    menu.classList.remove("gn-open-all");

    menu.classList.remove("gn-open-part");
    
    document.removeEventListener(e.type, this.closeMenu); 
    
    console.log("End of closeMenu");
  }

  onMenuClick(e) {
    
    console.log(e.type);
    console.log(e);
    console.log("onMenuClick")

    e.stopPropagation();
  
  }

  onTriggerClick(e) {
    
    console.log(e.type);
    console.log(e);
    console.log("onTriggerClick")

    e.stopPropagation();
    e.preventDefault();

    var ownerDocument = e.target.ownerDocument;
    var gnMenu = ownerDocument.querySelector("#gn-menu");
    var menu = gnMenu.querySelector(".gn-menu-wrapper");
    console.log(menu);
    

    var isMenuOpen = menu.classList.contains("gn-open-all");
    
    if (isMenuOpen) {
      this.closeMenu(e);
      document.removeEventListener("click", this.closeMenu);
    } else {
      this.openMenu(e);
      document.addEventListener("click", this.closeMenu);
    }

  }



  
}
