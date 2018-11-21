import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  idRecipe: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.idRecipe = this.route.snapshot.params['id'];
  }

}
