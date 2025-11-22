import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, OnDestroy } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {

  public projects: Project[] = [];
  public url: string;
  public cloudinaryCloudName: string = environment.cloudinary.cloudName;

  @ViewChildren('nombre', { read: ElementRef }) nombreEls!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;

  constructor(private _projectService: ProjectService, private router: Router) {
    this.url = Global.url;
  }

  ngOnInit() {
    this.getProjects();
  }

  ngAfterViewInit() {
    this.nombreEls.changes.subscribe(() => {
      this.setupObserver();
    });
    this.setupObserver();
  }

  

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

 private setupObserver() {
  if (this.observer) {
    this.observer.disconnect();
    this.observer = null;
  }

  const elements = this.nombreEls.toArray().map(el => el.nativeElement);
  if (!elements || elements.length === 0) return;

  this.observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        target.classList.add('visible');
      } else {
        target.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 }); // umbral un poco mayor para detectar bien


  elements.forEach(el => this.observer?.observe(el));
}


  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/not-found.png';
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      response => { if (response.projects) this.projects = response.projects; },
      error => console.log(error)
    );
  }

  scrollToTopAndNavigate(projectId: string) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/proyecto/', projectId]);
  }
}
