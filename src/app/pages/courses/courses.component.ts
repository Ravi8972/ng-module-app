import { Component, inject,input,signal,computed } from '@angular/core';
import { CourseService } from '../../services/course.service';  
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']  // Corrected to 'styleUrls'
})
export class CoursesComponent {
  isAdmin = input<boolean>(false);
  courseService = inject(CourseService);

  // // Without signals
  // a = 1;
  // b = 2;
  // c = this.a + this.b;

  // // With signals
  // a1 = signal(1);
  // b1 = signal(2);
  // c1 = computed(() => this.a1() + this.b1());

  // constructor() {}

  // ngOnInit() {
  //   this.understandSignalUsageWithExample();
  // }

  // understandSignalUsageWithExample() {
  //   // Without signals
  //   console.log('c before value change: ', this.c);
  //   this.a = 4;
  //   console.log('c after value change: ', this.c);

  //   // With signals
  //   console.log('c1 before value change: ', this.c1());
  //   this.a1.set(4);
  //   console.log('c1 after value change: ', this.c1());
  // }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course);
  }
}
