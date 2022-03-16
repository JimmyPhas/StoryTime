import { Component, OnInit } from '@angular/core';
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

  // storyID?: Story[];
  storyID: Story = {
    title: '',
    description: '',
    publish: false
  };

  eventID: Event = {
    event_id: 0,
    event_text: '',
    intro: false
  };

  added = false;

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
  }

  saveStory(): void{
    const storyData = {
      title: this.story.title,
      description: this.story.description
    };
    this.storyService.createStory(storyData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.added = true;
        },
        error: (e) => console.error(e)
      });

    // this.searchStory();
    console.log(this.story.title);
    this.storyService.findByTitle(this.story.title)
      .subscribe({
        next: (data) => {
          this.stories = data;
          console.log(this.story.title);
          // this.storyID.story_id = data.story_id;
          // this.storyID.title = data.title;
          // this.storyID.description = data.description;
          // this.storyID.publish = data.publish;
          console.log("this is the data");
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    console.log("this is the storyID");
    console.log(this.stories);
    console.log("after");
    // this.searchEvent();
  }

  // saveEvent(): void{
  //   const eventData = {
  //     event_text: this.story.description,
  //     intro: true,
  //     for_story: this.storyID.story_id
  //   };
  //   this.storyService.createEvent(eventData)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  saveActions(): void{
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

  // searchStory(): void{
  //   this.storyService.getStoryID(this.story.title)
  //     .subscribe({
  //       next: (data) => {
  //         this.storyID = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  searchEvent(): void{
    this.storyService.getEventID(this.story.description)
      .subscribe({
        next: (data) => {
          this.eventID = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


}


