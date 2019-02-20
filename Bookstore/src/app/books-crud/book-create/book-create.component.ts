import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  createBookForm: FormGroup;
  categories: string[] = ['Novella', 'Regény', 'Dráma', 'Verseskötet', 'Életrajz', 'Képregény'];
  formStatus: string;
  isSubmitPushed: boolean = false;

  constructor() { }

  ngOnInit() {
    this.createBookForm = new FormGroup({
      'author': new FormControl(null, Validators.required),
      'title': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required),
      'published': new FormControl(null, Validators.required),
      'description': new FormControl()
    });

    this.createBookForm.setValue({
      'author': null,
      'title': null,
      'category': null,
      'published': null,
      'description': null
    });

    this.createBookForm.statusChanges.subscribe(
      (status) => this.formStatus = status);
  }

  onSubmit() {
    this.isSubmitPushed = true;

    if (this.formStatus === "VALID") {
      this.createBookForm.reset();
      this.isSubmitPushed = false;
    }
  }
}
