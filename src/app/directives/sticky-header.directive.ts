import {
  Directive,
  Renderer2,
  HostListener,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { topMenuHeight } from '../constants/cssConstants';

@Directive({
  selector: '[appStickyHeader]'
})
export class StickyHeaderDirective implements AfterViewInit {


  @HostListener('window:scroll', ['$event'])
  public windowScrolled($event) {
    this.windowScrollEvent();
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngAfterViewInit() {
    this.windowScrollEvent();
  }

  windowScrollEvent() {
    const topPositionOfElement = this.el.nativeElement.getBoundingClientRect().top;
    const siblingTopPosition = this.el.nativeElement.nextElementSibling.getBoundingClientRect().top;
    const elementHeight = this.el.nativeElement.getBoundingClientRect().height;
    let elem = this.el.nativeElement;
    let siblingHeight = 0;
    while (elem = elem.nextSibling) {
      siblingHeight += elem.getBoundingClientRect().height;
    }


    if (topPositionOfElement <= topMenuHeight && siblingTopPosition <= (topMenuHeight + elementHeight) &&
      (siblingTopPosition + siblingHeight) >= (topMenuHeight + elementHeight)) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
      this.renderer.setStyle(this.el.nativeElement, 'top', topMenuHeight + 'vh');
      // this.renderer.setStyle(this.el.nativeElement, 'width', this.el.nativeElement.parentElement.offsetWidth + 'rem');
      this.renderer.setStyle(this.el.nativeElement, 'width', '100vw');
      this.renderer.setStyle(this.el.nativeElement, 'z-index', 5);
      this.renderer.setStyle(this.el.nativeElement.nextElementSibling, 'margin-top', '0');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
      // this.renderer.removeStyle(this.el.nativeElement, 'top');
      this.renderer.setStyle(this.el.nativeElement.nextElementSibling, 'margin-top', 'initial');
    }
  }


}
