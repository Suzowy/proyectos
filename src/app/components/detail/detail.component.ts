import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl:'./detail.component.css',
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project!: Project;
  public confirm: boolean;

  constructor(
  	private _projectService: ProjectService,
  	private _router: Router,
  	private _route: ActivatedRoute,
    public authService: AuthService
  ){
  	this.url = Global.url;
    this.confirm = false;
  }


  getProject(id: any) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project

      },
      (error:any) => {
        console.log(error);

      }
    );
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/img/not-found.png';
  }


   ngOnInit(): void{
  	this._route.params.subscribe(params => {
  		let id = params['id'];

  		this.getProject(id);
  	});
  }

  setConfirm(confirm: boolean){
    this.confirm = confirm;
  }


  deleteProject(id: string){
  	this._projectService.deleteProject(id).subscribe(
  		response => {
  			if(response.project){
  				this._router.navigate(['/proyectos']);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

}
