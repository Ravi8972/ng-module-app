import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Strings } from '../enum/strings.enum';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // BehaviorSubject to hold the courses array (initially empty)
  private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  
  // Expose the observable for components to subscribe to
  courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  constructor() { 
    this.loadCourses();
  }

  // Load courses from local storage
  private loadCourses() {
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    if (data) {
      const courses = JSON.parse(data);
      this.coursesSubject.next(courses);  // Push initial data into the subject
    }
  }

  // Getter method to fetch the current value (useful for synchronous access)
  getCourses(): Course[] {
    return this.coursesSubject.value;
  }

  // Add a new course
  addCourse(data: Course) {
    const currentCourses = this.getCourses();
    const newCourse = { ...data, id: currentCourses.length + 1 };
    const updatedCourses = [...currentCourses, newCourse];
    this.updateCourses(updatedCourses);
    return updatedCourses;
  }

  // Delete a course
  deleteCourse(data: Course) {
    const updatedCourses = this.getCourses().filter(c => c.id !== data.id);
    this.updateCourses(updatedCourses);
  }

  // Updating both local storage and the BehaviorSubject
  private updateCourses(courses: Course[]) {
    this.coursesSubject.next(courses);
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(courses));
  }
}
