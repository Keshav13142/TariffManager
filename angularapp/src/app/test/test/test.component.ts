import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  receipt: File;
  constructor() {}

  ngOnInit(): void {}

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.myfilename = '';
      Array.from(fileInput.target.files).forEach((file: File) => {
        console.log(file);
        this.myfilename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          // Return Base64 Data URL
          const imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = '';
    } else {
      this.myfilename = 'Select File';
    }
  }
}
