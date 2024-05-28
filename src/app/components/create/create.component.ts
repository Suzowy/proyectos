
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project: any;
  public status!: string;
  public filesToUpload: Array<File> = [];
  url: any;

  constructor(
    private _projectService: ProjectService,
    public _uploadService: UploadService
  ) {
    this.title = "crear proyecto";
    this.project = new Project('', '', '', '', new Date().getFullYear(), '', '');
  }

  ngOnInit() {
  }

  onSubmit(form: any) {

    //guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {


          //subir la imagen
          this._uploadService.makeFileRequest(
            `${Global.url}/upload-image/${response.project._id}`,
            [],
            this.filesToUpload,
            'image'
          ).then((result: any) => {
            this.save_project = result.project;
            this.status = "success";
            console.log(result);

            form.reset();
          }).catch(error => {
            console.error("Error al subir la imagen:", error);
            this.status = "failed";
          });


        } else {
          this.status = "failed";
        }

      },
      error => {
        console.log(<any>error);
      }
    )
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}

// import { Component, OnInit } from '@angular/core';
// import { Project } from '../../models/project';
// import { ProjectService } from '../../services/project.service';
// import { UploadService } from '../../services/upload.service';
// import { Global } from '../../services/global';

// @Component({
//   selector: 'app-create',
//   templateUrl: './create.component.html',
//   styleUrls: ['./create.component.css'],
//   providers: [ProjectService, UploadService]
// })
// export class CreateComponent implements OnInit {
//   public title: string;
//   public project: Project;
//   public save_project: any;
//   public status!: string;
//   public filesToUpload: Array<File> = [];
//   public url: string;

//   constructor(
//     private _projectService: ProjectService,
//     public _uploadService: UploadService
//   ) {
//     this.title = 'Crear proyecto';
//     this.project = new Project('', '', '', '', new Date().getFullYear(), '', '');
//     this.url = Global.url;
//   }

//   ngOnInit() {}

//   onSubmit(form: any) {
//     this._projectService.saveProject(this.project).subscribe(
//       response => {
//         if (response.project) {
//           if (this.filesToUpload.length > 0) {
//             this._uploadService.makeFileRequest(this.filesToUpload).then((result: any) => {
//               this.save_project = result;
//               this.status = 'success';
//               console.log(result);
//               form.reset();
//             }).catch(error => {
//               console.error('Error al subir la imagen:', error);
//               this.status = 'failed';
//             });
//           } else {
//             this.save_project = response.project;
//             this.status = 'success';
//             form.reset();
//           }
//         } else {
//           this.status = 'failed';
//         }
//       },
//       error => {
//         console.log(<any>error);
//       }
//     );
//   }

//   fileChangeEvent(fileInput: any) {
//     this.filesToUpload = <Array<File>>fileInput.target.files;
//   }
// }
