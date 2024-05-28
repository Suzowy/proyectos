import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService {
  public url: string;

  constructor() {
    this.url = Global.url;
  }
  makeFileRequest(url: string, _params: Array<string>, files: Array<File>, name: string){
    return new Promise( function( resolve, reject){
        var formData:any = new FormData();
        var xhr = new XMLHttpRequest();

        for(var i = 0; i < files.length; i++){
          formData.append(name, files[i],files[i].name);
        }

        xhr.onreadystatechange = function(){
          if( xhr.readyState == 4 ){
            if(xhr.status == 200){
              resolve(JSON.parse(xhr.response));
            }else
              reject(xhr.response);

          }
        }

        xhr.open('POST', url , true);
        xhr.send(formData);
    });

  }
}




// import { Injectable } from '@angular/core';

// @Injectable()
// export class UploadService {
//   private cloudName: string = 'dzytii7jv';
//   private uploadPreset: string = 'ml_default';

//   constructor() {}

//   makeFileRequest(files: Array<File>): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
//       const formData: FormData = new FormData();

//       for (let i = 0; i < files.length; i++) {
//         formData.append('file', files[i], files[i].name);
//       }
//       formData.append('upload_preset', this.uploadPreset);

//       const xhr = new XMLHttpRequest();
//       xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4) {
//           if (xhr.status === 200) {
//             resolve(JSON.parse(xhr.responseText));
//           } else {
//             reject(xhr.responseText);
//           }
//         }
//       };

//       xhr.open('POST', url, true);
//       xhr.send(formData);
//     });
//   }
// }


