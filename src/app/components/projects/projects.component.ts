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
  public projects: Project[] = [];
  public url: string;
  public showAllProjects: boolean = false;
  public projectsLoaded: boolean = false;

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
        slideWidth: 600
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

  toggleProjects() {
    this.showAllProjects = !this.showAllProjects;
  }
}
