import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private element:ElementRef) { }
  private highlight(color1:string)
  {
    this.element.nativeElement.style.backgroundColor=color1;
  }
  @HostListener('mouseenter')onMouseEnter()
  {
    this.highlight('yellow');
  }
  @HostListener('mouseleave')onMouseLeave()
  {
    this.highlight('');
  }
  @HostListener('click')onMouseClick()
  {
    this.highlight('red');
  }
}
