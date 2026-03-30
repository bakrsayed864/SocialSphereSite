import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-manin-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './manin-layout.component.html',
  styleUrl: './manin-layout.component.css',
})
export class ManinLayoutComponent {

}
