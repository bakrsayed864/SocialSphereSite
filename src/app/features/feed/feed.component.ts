import { Component, inject, Inject, OnInit } from '@angular/core';
import { LeftSideComponent } from "./components/left-side/left-side.component";
import { RightSideComponent } from "./components/right-side/right-side.component";
import { FeedContentComponent } from './components/feed-content/feed-content.component';

@Component({
  selector: 'app-feed',
  imports: [LeftSideComponent, FeedContentComponent, RightSideComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent{
 
}
