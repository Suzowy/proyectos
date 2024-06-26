// detail.component.ts

import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

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
  public cloudinaryCloudName: string = environment.cloudinary.cloudName;
  public isLoggedIn: boolean = false;
  public isLoading: boolean = true;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProject(id);
    });

    this._authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  getProject(id: any) {
    this.isLoading = true;
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
        this.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/not-found.png';
  }

  setConfirm(confirm: boolean) {
    this.confirm = confirm;
  }

  deleteProject(id: string): void {
    if (this.project) {
      this._projectService.deleteProject(id).subscribe(
        response => {
          if (response.project) {
            this._router.navigate(['/proyectos']);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
