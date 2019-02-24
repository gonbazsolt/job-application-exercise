import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {
  @Output() selectedCategoryName: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedYear: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchTextInAuthorAndTitle: EventEmitter<string> = new EventEmitter<string>();
  
  categories: string[] = ['Novella', 'Regény', 'Dráma', 'Verseskötet', 'Életrajz', 'Képregény'];
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      category: ['Válasszon'],
      year: null,
      authorAndTitle: ['']
    })
  }

  ngOnInit() {
  }

  applyCategoryFilter(): void {
    this.selectedCategoryName.emit(this.filterForm.get('category').value);
  }

  applyYearFilter(): void {
    this.selectedYear.emit(this.filterForm.get('year').value);
  }

  getSearchFieldValue(): void {
    this.searchTextInAuthorAndTitle.emit(this.filterForm.get('authorAndTitle').value.toLowerCase());
  }

  setYearInpuFieldValueToNull(): void {
    this.filterForm.patchValue({
      year: null
    })
  }
}
