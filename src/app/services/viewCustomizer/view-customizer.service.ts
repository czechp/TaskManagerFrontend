import {ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewCustomizerService {
  private renderer: Renderer2;
  private readonly RED = 'red';
  private readonly YELLOW = 'yellow';
  private readonly BLACK = 'black';
  private readonly WHITE = 'white';


  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public resetColors(element: ElementRef): void {
    this.renderer.removeStyle(element.nativeElement, 'border-color');
    this.renderer.removeStyle(element.nativeElement, 'background-color');
    this.renderer.removeStyle(element.nativeElement, 'color');
  }

  public setDangerColors(element: ElementRef): void {
    this.renderer.setStyle(element.nativeElement, 'border-color', this.RED);
    this.renderer.setStyle(element.nativeElement, 'background-color', this.RED);
    this.renderer.setStyle(element.nativeElement, 'color', this.WHITE);
  }
}
