import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router'; // Import Router

declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit, AfterViewChecked {
  public projects: Project[] = [];
  public url: string;
  public showAllProjects: boolean = false;
  public projectsLoaded: boolean = false;
  public cloudinaryCloudName: string = environment.cloudinary.cloudName;

  constructor(
    private _projectService: ProjectService,
    private router: Router // Inject Router
  ) {
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

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/not-found.png';
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

  scrollToTopAndNavigate(projectId: string): void {
    console.log(`Navigating to project with ID: ${projectId}`); // Log ID
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/proyecto', projectId]);
  }
}
