import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story/story.model';
import { Event } from 'src/app/models/event/event.model';
import { Action } from 'src/app/models/action/action.model';
import { StoryService } from 'src/app/services/story.service';

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
  added = false;

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
  }

  async saveStory(): Promise<void>{
    // this.storyTitle = this.story.title as string;
    const storyData = {
      title: this.story.title,
      description: this.story.description
    };
    this.storyService.createStory(storyData)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });

    console.log("1");
    await new Promise(f => setTimeout(f, 300));
    this.storyService.findByTitle(this.story.title)
      .subscribe({
        next: (data) => {
          this.storyID = data[0].story_id as number;
          console.log(this.storyID);
          console.log("2");
        },
        error: (e) => console.error(e)
      });
    
    console.log("3");
    await new Promise(f => setTimeout(f, 300));
    const eventData = {
      event_text: this.story.description,
      intro: true,
      for_story: this.storyID
    };
    this.storyService.createEvent(eventData)
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log("4");
        },
        error: (e) => console.error(e)
      });

    console.log("5");
    await new Promise(f => setTimeout(f, 300));
    this.storyService.getEventID(this.story.description)
      .subscribe({
        next: (data) => {
          this.eventID = data[0];
          console.log(data);
          console.log(this.eventID.event_text);
          console.log("6");
        },
        error: (e) => console.error(e)
      });

    console.log("7");
    await new Promise(f => setTimeout(f, 300));
    const actionData = {
      action_text: "Start",
      result_text: null,
      action_of: this.eventID.event_id
    }
    this.storyService.createAction(actionData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.added = true;
          console.log("8");
        },
        error: (e) => console.error(e)
      });

    console.log("FIN");
    await new Promise(f => setTimeout(f, 300));
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


