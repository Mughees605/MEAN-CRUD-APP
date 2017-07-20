import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NinjaService } from '../service/ninja.service';
import { Subscription } from 'rxjs/subscription'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription
  title = 'app';
  @ViewChild('f') ninjaForm: NgForm;
  editMode: Boolean = false;
  ninjas: any;
  index: number;
  editedNinja: any;

  constructor(private ninjaService: NinjaService) { }

  ngOnInit() {
    this.ninjaService.getNinjas();
    this.subscription = this.ninjaService.ninjaChanged.subscribe((ninjas)=>{
      this.ninjas = ninjas;
    })
  }

  onAddItem(form: NgForm) {
    const { name, rank } = form.value;
    const ninja = {
      name: name,
      rank: rank,
      available: true
    }
    if (this.editMode) {
      this.ninjaService.updateNinja(this.index, ninja)
    }
    else {
      this.ninjaService.addNinja(ninja)

    }
    this.editMode = false;
    form.reset();
  }

  onEditItem(index: number) {
    this.index = index;
    this.editMode = true;
    this.editedNinja = this.ninjaService.getNinja(index);
    this.ninjaForm.setValue({
      name: this.editedNinja.name,
      rank: this.editedNinja.rank
    })
  }

  onDelete() {
    this.ninjaService.deleteNinja(this.index);
    this.ninjaForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.ninjaForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
     this.subscription.unsubscribe();
  }


}
