import { Component } from '@angular/core';


declare const Zone: any;
declare const loadRemoteModule: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: `
    <div>
      <h2>Dashboard in Shell App</h2>
      <ng-container *ngIf="headerModule; else loadingHeader">
        <ng-container *ngComponentOutlet="headerModule.default"></ng-container>
      </ng-container>
      <ng-template #loadingHeader>Loading Header Module...</ng-template>

      <ng-container *ngIf="sidebarModule; else loadingSidebar">
        <ng-container *ngComponentOutlet="sidebarModule.default"></ng-container>
      </ng-container>
      <ng-template #loadingSidebar>Loading Sidebar Module...</ng-template>

      <ng-container *ngIf="contentModule; else loadingContent">
        <ng-container *ngComponentOutlet="contentModule.default"></ng-container>
      </ng-container>
      <ng-template #loadingContent>Loading Content Module...</ng-template>

      <ng-container *ngIf="footerModule; else loadingFooter">
        <ng-container *ngComponentOutlet="footerModule.default"></ng-container>
      </ng-container>
      <ng-template #loadingFooter>Loading Footer Module...</ng-template>
    </div>
  `,
  styleUrls: [
    `
    div {
      border: 1px solid #ddd;
      padding: 20px;
    }
  `
  ]
})
export class DashboardComponent {
  headerModule: any;
  sidebarModule: any;
  contentModule: any;
  footerModule: any;
  ngOnInit(): void {
    Zone.current.fork({
      name: 'federated'
    }).run(() => {
      Promise.all([
        loadRemoteModule('header', 'http://localhost:4201/remoteEntry.js', 'HeaderModule'),
        loadRemoteModule('sidebar', 'http://localhost:4202/remoteEntry.js', 'SidebarModule'),
        loadRemoteModule('content', 'http://localhost:4203/remoteEntry.js', 'ContentModule'),
        loadRemoteModule('footer', 'http://localhost:4204/remoteEntry.js', 'FooterModule')
      ]).then(([header, sidebar, content, footer]) => {
        this.headerModule = header;
        this.sidebarModule = sidebar;
        this.contentModule = content;
        this.footerModule = footer;
        // Assign module variables for other modules (sidebar, content, footer) in a similar way
      }).catch(err => console.error('Error loading remote modules', err));
    });
  }
}
