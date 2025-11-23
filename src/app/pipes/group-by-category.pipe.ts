// src/app/pipes/group-by-category.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'groupByCategory'
})
export class GroupByCategoryPipe implements PipeTransform {
  transform(projects: Project[]): { category: string, items: Project[] }[] {
    if (!projects) return [];

    const groups: { [key: string]: Project[] } = {};

    projects.forEach(project => {
      const cat = project.category ?? 'Sin categoría';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(project);
    });

    return Object.keys(groups).map(category => ({
      category,
      items: groups[category]
    }));
  }
}
