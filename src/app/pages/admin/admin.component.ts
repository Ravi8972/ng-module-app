import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  model: Partial<Course> = {};  // Simple object for form binding
  cover: string | null = null;
  coverFile: File | null = null;
  showError = false;
  isSaved = false;

  private courseService = inject(CourseService);

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.cover = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.showError = false;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.cover) {
      form.control.markAllAsTouched();
      if (!this.cover) {
        this.showError = true;
      }
      return;
    }

    this.saveCourse(form);
  }

  clearForm(form: NgForm) {
    form.resetForm();
    this.cover = null;
    this.coverFile = null;
    this.model = {};
  }

  async saveCourse(form: NgForm) {
    try {
      const data: Course = {
        ...form.value,
        image: this.cover!,  // Safe because we check in onSubmit
      };

      this.courseService.addCourse(data);

      this.isSaved = true;
      setTimeout(() => {
        this.isSaved = false;
      }, 2000);

      this.clearForm(form);
    } catch (e) {
      console.error(e);
    }
  }
}
