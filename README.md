# Angular8-Crud

![angular](angular8s.png)
"# Angular9-pagination-search" 
"# Angular-9--search-pagination" 
## Angular 2 / Angular 4 / Angular 5 Search Filter Pipe
### Install
npm i ng2-search-filter --save
yarn add ng2-search-filter 
### Usage
In case you're using systemjs - see configuration here.

Import Ng2SearchPipeModule to your module
```
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app';
 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
 
@NgModule({
  imports: [BrowserModule, Ng2SearchPipeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
And use pipe in your component
```
import { Component } from '@angular/core';
 
@Component({
  selector: 'example-app',
  template: `
    <div>
        <input type="text" [(ngModel)]="term">
        <div *ngFor = "let item of items |filter:term" >
          <p>
            {{item.name}}
          </p>
        </div>
 
    </div>  
  `
})
 
export class AppComponent {
  items: string[] = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
}
```
Support ng2-search-filter
