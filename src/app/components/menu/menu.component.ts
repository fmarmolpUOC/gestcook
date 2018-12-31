import { Component, OnInit, ViewEncapsulation, Inject, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
// import { DatePickerService, DatePickerModule } from '@dannyboyng/datepicker';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  skillForm: FormGroup;
  public dateValue: Date = new Date();
  idTimestamp: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}

addRecipeToMenu(date) {
    const id = date;
    this.idTimestamp = (new Date(id)).getTime();
    console.log(this.idTimestamp);
  }

  ngOnInit() {
  }

}
