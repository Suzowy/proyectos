import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
isLoggedIn: any;
  title(_title: any) {
    throw new Error('Method not implemented.');
  }
  router: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  scrollToTopAndNavigate(projectId: string) {
    // Desplaza hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/proyecto', projectId]);
  }

}
