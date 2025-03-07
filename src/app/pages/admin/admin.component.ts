import { Component, inject, signal } from '@angular/core';
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
  model = signal<any>({});
  cover = signal<string | null>(null);
  cover_file = signal<any>(null);
  showError = signal<boolean>(false);
  isSaved = signal<boolean>(false);

  private courseService = inject(CourseService);

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cover_file.set(file);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result!.toString();
        this.cover.set(dataUrl);
      };
      reader.readAsDataURL(file);
      this.showError.set(false);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.cover) {
      form.control.markAllAsTouched();
      if (!this.cover) {
        this.showError.set(true);
      }
      return;
    }

    this.saveCourse(form);
  }

  clearForm(form: NgForm) {
    form.reset();
    this.cover.set(null);
    this.cover_file.set(null);
  }

  async saveCourse(form: NgForm) {
    try {
      const formValue = form.value;

      const data: Course = {
        ...formValue,
        image: this.cover(),
      };

      await this.courseService.addCourse(data);

      this.isSaved.set(true);
      setTimeout(() => {
        this.isSaved.set(false);
      }, 2000);
      this.clearForm(form);
    } catch (e) {
      console.log(e);
    }
  }
}
