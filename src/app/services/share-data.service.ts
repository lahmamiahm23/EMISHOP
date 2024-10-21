import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private selectedCategorySource = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategorySource.asObservable();
  private searchKeywordSource = new BehaviorSubject<string | null>(null);
  searchKeyword$=this.searchKeywordSource.asObservable();
  setSelectedCategory(category: string) {
    this.selectedCategorySource.next(category);
  }

  setSearchKeyword(keyword: string) {
    this.searchKeywordSource.next(keyword);
  }
}
