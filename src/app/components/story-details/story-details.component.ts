import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from 'src/app/models/story.model';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {
  
  @Input() viewMode = false;
  @Input() currentStory: Story = {
    title: '',
    description: ''
  };

  message = '';
  
  constructor( private storyService: StoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getStory(this.route.snapshot.params["id]"]);
    }
  }

  getStory(id: string): void {
    this.storyService.get(id)
      .subscribe({
        next: (data) => {
          this.currentStory = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateStory(): void {
    this.message = '';
    this.storyService.update(this.currentStory.id, this.currentStory)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  deleteStory(): void {
    this.storyService.delete(this.currentStory.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.error(e)
      });
  }
}

