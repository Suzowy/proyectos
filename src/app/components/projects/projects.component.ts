import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit, AfterViewChecked {
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/not-found.png';
  }
  public projects: Project[] = [];
  public url: string;
  public showAllProjects: boolean = false;
  public projectsLoaded: boolean = false;
  router: any;

  constructor(private _projectService: ProjectService) {
    this.url = Global.url;
  }

  ngOnInit() {
    this.getProjects();
  }

  ngAfterViewChecked() {
    if (!this.projectsLoaded) {
      $('.galeria').bxSlider({
        adaptiveHeight: true,
        auto: true,
        autoControls: true,
        stopAutoOnClick: true,
        pager: true,
        slideWidth: 600,
        responsive: true,
        pause: 5000,
        speed: 1000,
        easing: "ease-in-out"
      });
      this.projectsLoaded = true;
    }
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      response => {
        if (response.projects) {
          this.projects = response.projects;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // toggleProjects() {
  //   this.showAllProjects = !this.showAllProjects;
  // }

  scrollToTopAndNavigate(projectId: string): void {
    // Desplaza hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Navega al detalle del proyecto
    this.router.navigate(['/proyecto', projectId]);
  }
}
