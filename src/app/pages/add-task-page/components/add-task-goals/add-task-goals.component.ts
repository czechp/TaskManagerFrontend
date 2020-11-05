import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Goal } from 'src/app/models/Goal';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-add-task-goals',
  templateUrl: './add-task-goals.component.html',
  styleUrls: ['./add-task-goals.component.css'],
  animations: [fade]
})
export class AddTaskGoalsComponent implements OnInit {
  public goalForm: FormGroup;
  public alreadyAdded = false;

  @Output()
  public addGoalEmitter = new EventEmitter();

  @HostListener('keyup.enter', ['$event'])
  public addGoalEventListener(event: any) {
    this.addGoal();
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.goalForm = this.formBuilder.group(
      {
        content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]]
      }

    )
  }


  ngOnInit(): void {
  }

  public addGoal(){
    if(this.goalForm.valid){
      const goal: Goal = {content: this.goalForm.value.content};
      this.addGoalEmitter.emit(goal);
      this.clearGoalFormField();
      this.alreadyAdded= true;
    }
  }

  private clearGoalFormField(){
    this.goalForm.reset();
  }
}
