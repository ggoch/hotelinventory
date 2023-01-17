import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[hinvUnless]'
})
export class UnlessDirective {
  private hasView:boolean = false

  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainer:ViewContainerRef
  ) { }

  @Input() set hinvUnless(condition:boolean){
    if(!condition && !this.hasView){
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }

    if(condition && this.hasView){
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
 
}
