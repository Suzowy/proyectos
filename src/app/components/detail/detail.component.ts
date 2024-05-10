import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

  public url: string;
  public project!: Project;
  public confirm: boolean;
  public isLocalMode: boolean = true; // Nueva variable para el modo local

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
    this.isLocalMode = true; // Establece según sea necesario
  }

  setConfirm(confirm: boolean) {
    this.confirm = confirm;
  }

  deleteProject(id: string) {
    this._projectService.deleteProject(id).subscribe(
      response => {
        if (response.project) {
          this._router.navigate(['/proyectos']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/not-found.png';
  }



  getProject(id: any) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProject(id);
    });
  }
}
