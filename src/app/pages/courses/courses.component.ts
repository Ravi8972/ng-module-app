import { Component, inject,input } from '@angular/core';
import { CourseService } from '../../services/course.service';  
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']  
})
export class CoursesComponent {
  isAdmin = input<boolean>(false);
  courseService = inject(CourseService);

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course);
  }
}
