import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { EditStoryComponent } from './components/edit-story/edit-story.component';
import { CreateStoryComponent } from './components/create-story/create-story.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    EditStoryComponent,
    CreateStoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
