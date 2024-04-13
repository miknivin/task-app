import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-task-layout',
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.css'],
})
export class TaskLayoutComponent implements OnInit {
  selectedTabIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const activeTab = params['active-tab'];
      if (activeTab) {
        this.selectedTabIndex = this.getTabIndexFromActiveTab(activeTab);
      }
    });
  }

  handleTabChange(event: any): void {
    const activeTab = this.getActiveTabFromTabIndex(event.index);
    this.router.navigate([], {
      queryParams: { 'active-tab': activeTab },
      queryParamsHandling: 'merge',
    });
  }

  private getTabIndexFromActiveTab(activeTab: string): number {
    switch (activeTab) {
      case 'active':
        return 0;
      case 'pending':
        return 1;
      case 'completed':
        return 2;
      case 'all':
        return 3;
      default:
        return 0;
    }
  }

  private getActiveTabFromTabIndex(tabIndex: number): string {
    switch (tabIndex) {
      case 0:
        return 'active';
      case 1:
        return 'pending';
      case 2:
        return 'completed';
      case 3:
        return 'all';
      default:
        return 'active';
    }
  }
}
