import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class StyleLoaderService {
  private renderer: Renderer2;

  constructor(
    private http: HttpClient,
    private rendererFactory: RendererFactory2,
    private router: Router,
    // private el: ElementRef
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  
  getRouter(){
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          console.log('Current URL:', event.url);
          console.log('Current URL:Test');
          // 在這裡可以對網址進行處理
          if(event.url == "/login"){
            this.loadStyle("../assets/test.css")
          }else{
            this.deleteStyle();
          }
        //   this.loadStyle("../assets/test.css")
        }
    });
  }
  

  loadStyle(styleUrl: string): void {
    this.http.get(styleUrl, { responseType: 'text' }).subscribe(
      css => {
        const head = document.getElementsByTagName('head')[0];
        const style = this.renderer.createElement('style');
        style.innerHTML = css;
        this.renderer.addClass(style,"render-css")
        this.renderer.appendChild(head, style);
      },
      error => console.error('Error loading style file: ', error)
    );
  }

  deleteStyle(){
    const style = document.getElementsByClassName("render-css");
    for(let i=0;i<style.length;i++){
      style[i].remove();
    }
  }
}
