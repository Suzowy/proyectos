
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
    private _uploadService: UploadService
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
            Global.url + "/upload-image/" + response.project._id,
            [],
            this.filesToUpload,
            'image'
          ).then((result: any) => {
            this.save_project = result.project;
            this.status = "success";
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
