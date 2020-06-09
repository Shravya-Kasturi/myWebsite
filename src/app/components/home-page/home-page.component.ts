import { Component, OnInit, Inject, AfterViewInit, ApplicationRef, NgZone, 
  HostListener, Pipe, PipeTransform, Directive, ViewChild, ElementRef } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  title = 'myWebsite';
  baking = ['cake.jpg','idly.jpg','pizza.png','sandwich.jpg','halwa.png']
  binge = ['b99.jpg','bb.jpg','friends.jpg','got.jpg','young.jpg']
  constructor(private pageScrollService: PageScrollService,
     @Inject(DOCUMENT) private document: any){

  }
  ngOnInit(){

  }

  scrollToElement($element): void {
    console.log($element);
    // this.pageScrollService.scroll({
    //   document:this.document,
    //   scrollTarget:
    // })
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  onTabClick(element) {
    console.log(element)
    let scrollTop = $(element).offset().top;
    $('html').animate({ scrollTop: scrollTop }, 500, 'swing');
  }
   scrollToMainPage() {
    console.log("scroll to main page")
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }
  
  getImagePath(folder,word){
    return 'assets/'+folder+'/'+word
  }
}



var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
}

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};