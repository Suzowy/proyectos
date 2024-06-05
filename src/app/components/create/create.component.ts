import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
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
    public _uploadService: UploadService,
    private _authService: AuthService,
    private router: Router
  ) {
    this.title = "crear proyecto";
    this.project = new Project('', '', '', '', new Date().getFullYear(), '', '');
  }

  ngOnInit() {
  }

  onSubmit(form: any) {
    if (this._authService.isLoggedIn()) {
      this._projectService.saveProject(this.project).subscribe(
        response => {
          if (response.project) {
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
      );
    } else {
      // El usuario no está autenticado, redirigir al formulario de login
      this.router.navigate(['/login']);
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
