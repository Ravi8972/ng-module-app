import { Injectable, signal, WritableSignal } from '@angular/core';
import { Strings } from '../enum/strings.enum';
import { Course } from '../interfaces/course.interface';

// Injectable decorator marks this class as available for injection into other components/services
@Injectable({
  providedIn: 'root'
})

export class CourseService {

  // Signal to hold the courses array
  private courses: WritableSignal<Course[]> = signal<Course[]>([]);

  // Getter to expose the signal as a readonly signal
  get coursesSignal() {
    return this.courses.asReadonly;
  }

  // Constructor to initialize the service and load courses from local storage
  constructor() { 
    this.loadCourses();
  }

  // Method to load courses from local storage
  loadCourses() {
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    if(data) {
      const courses = JSON.parse(data);
      this.courses.set(courses);
    }
  }

  // Method to get the current courses array
  getCourses(): Course[] {
    return this.courses();
  }

  // Method to add a new course to the courses array
  addCourse(data: Course) {
    let updatedCourses: Course[] = [];

    this.courses.update(courses => {
      const newCourse = { ...data, id: courses.length + 1 };
      updatedCourses = [...courses, newCourse];
      this.setItem(updatedCourses);
      return updatedCourses;
    });

    return updatedCourses;
  }

  // Method to delete a course from the courses array
  deleteCourse(data: Course) {
    this.courses.update((courses) => {
      const updatedCourses = courses.filter(c => c.id !== data.id);
      this.setItem(updatedCourses);
      return updatedCourses;
    });
  }

  // Method to save the courses array to local storage
  setItem(data: Course[]) {
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  }

}

