import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../component/model/FileHandle';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

@Output() files :EventEmitter<FileHandle>=new EventEmitter();

@HostBinding("style.background") private background ="#eee";
  constructor(private sanitizer :DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(evt :DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#456";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt :DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";
}

@HostListener("drop", ["$event"])
public onDrop (evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";

    if (evt.dataTransfer) {
      let filehandle: FileHandle;
      const file = evt.dataTransfer.files[0];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));

      filehandle = { file, url };
      this.files.emit(filehandle);
  }

}




}
