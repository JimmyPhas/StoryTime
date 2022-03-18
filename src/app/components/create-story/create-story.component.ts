import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story/story.model';
import { Event } from 'src/app/models/event/event.model';
import { Action } from 'src/app/models/action/action.model';
import { StoryService } from 'src/app/services/story.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  stories?: Story[];
  
  story: Story = {
    title: '',
    description: '',
    publish: false
  };

  eventID: Event = {
    event_id: 0,
    event_text: '',
    intro: false
  };

  storyID = -1;
  storySent = false;
  storyIDRecieved = false;
  eventIDRecieved = false;
  eventSent = false;
  added = false;

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
  }

  saveStory(): void{
    // this.storyTitle = this.story.title as string;
    const storyData = {
      title: this.story.title,
      description: this.story.description
    };
    this.storyService.createStory(storyData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.added = true;
          this.storySent = true;
        },
        error: (e) => console.error(e)
      });
  }
  
  lmao(): void {
    console.log("LMAO");
  }
  FOOKyou(): void {
    this.storySent = true;
    console.log("42 shall save us all");
  }
  FUCKme(): void {
    this.storySent = false;
    console.log("LMAO Im never gonna see this!@!@!@!@!@!@");
  }
  searchStory(): void{
    this.storySent = false;
    this.storyService.findByTitle(this.story.title)
      .subscribe({
        next: (data) => {
          this.storyID = data[0].story_id as number;
          this.storyIDRecieved = true;
        },
        error: (e) => console.error(e)
      });
  }

  saveEvent(): void{
    this.storyIDRecieved = false;
    const eventData = {
      event_text: this.story.description,
      intro: true,
      for_story: this.storyID
    };
    this.storyService.createEvent(eventData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.eventSent = true;
        },
        error: (e) => console.error(e)
      });
  }
  searchEvent(): void{
    this.eventSent = false;
    console.log("1")
    this.storyService.getEventID(this.story.description)
      .subscribe({
        next: (data) => {
          console.log("2")
          this.eventID = data[0];
          console.log(data);
          console.log("3");
          console.log(this.eventID.event_text);
          this.eventIDRecieved = true;
        },
        error: (e) => console.error(e)
      });
  }

  saveActions(): void{
    this.eventIDRecieved = false;
    const actionData = {
      action_text: "Start",
      result_text: null,
      action_of: this.eventID.event_id
    }
    this.storyService.createAction(actionData)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

  newStory(): void {
    this.added = false;
    this.story = {
      title: '',
      description: '',
      publish: false
    };
  }


}


