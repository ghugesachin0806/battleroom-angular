import { Component, inject } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.scss'],
})
export class PostQuestionComponent {
  tags: { name: string }[] = [];
  isSubmitting!: boolean;
  addOnBlur = true;
  validateForm!: FormGroup;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);

  constructor(
    private service: QuestionService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: [[], Validators.required],
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our tags
    if (value) {
      this.tags.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce('Removed ${tag}');
    }
  }

  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }

  postQuestion() {
    console.log(this.validateForm.value);
    this.service.postQuestion(this.validateForm.value).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackbar.open('Question Posted Successfully', 'Close', {
          duration: 5000,
        });
      } else {
        this.snackbar.open('Something Went Wrong !', 'Close', {
          duration: 5000,
        });
      }
    });
  }
}
