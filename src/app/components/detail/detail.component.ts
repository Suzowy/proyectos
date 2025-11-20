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
  public progress: number = 0; // porcentaje del loader


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
  this.progress = 0;

  this._projectService.getProject(id).subscribe(
    response => {
      this.project = response.project;

      // Simular carga de barra hasta 100% mientras se carga la imagen
      this.simulateProgress(() => {
        this.isLoading = false;
      });
    },
    (error: any) => {
      console.log(error);
      this.isLoading = false;
    }
  );
}

simulateProgress(callback: () => void) {
  const interval = setInterval(() => {
    if (this.progress >= 90) {
      clearInterval(interval);
    } else {
      this.progress++;
    }
  }, 20);

  // Se asegura que cuando la imagen termine de cargar, llegue a 100%
  if (this.project && this.project.image) {
    const img = new Image();
    img.src = `https://res.cloudinary.com/${this.cloudinaryCloudName}/image/upload/proyectos/${this.project.image}`;
    img.onload = () => {
      clearInterval(interval);
      this.progress = 100;
      setTimeout(() => callback(), 300); // espera un poco antes de ocultar loader
    };
    img.onerror = () => {
      clearInterval(interval);
      this.progress = 100;
      callback();
    };
  } else {
    // Si no hay imagen, termina de cargar inmediatamente
    this.progress = 100;
    callback();
  }
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
