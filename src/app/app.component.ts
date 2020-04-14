import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-test';
  myForm: FormGroup;
  genderNames = ['Male', 'Female', 'Not prefer to tell'];
  hobbyArray: string[] = null;
  fruits: Array<any> = [
    {name: 'Banana', value: 'banana'},
    {name: 'Apple', value: 'apple'},
    {name: 'Kiwi', value: 'kiwi'},
    {name: 'Papaya', value: 'papaya'},
    {name: 'Lemon', value: 'lemon'},
    {name: 'Grapes', value: 'grapes'},
    {name: 'Orange', value: 'orange'},
  ];
  fruitAr: FormArray;

  constructor() { }

  ngOnInit() {
    this.myForm = new FormGroup({
      userData: new FormGroup({
        userName: new FormControl(null, Validators.required),
        bioData: new FormControl(null, [Validators.required, Validators.minLength(5)])
      }),
      gender: new FormControl('Male'),
      hobbies: new FormArray([]),
      checkBox: new FormArray([], Validators.required)

    });
  }

  onSubmit() {
    console.log(this.myForm.get('userData.userName').value);
    console.log(this.myForm.get('userData.bioData').value);
    console.log(this.myForm.get('gender').value);
    this.hobbyArray = this.myForm.get('hobbies').value;
    this.hobbyArray.forEach(a=> {
      console.log(a);
    });
    console.log(this.myForm.value);
  }

  onAddHobbies() {
    const hobbyCntr = new FormControl(null, Validators.required);
    (<FormArray>this.myForm.get('hobbies')).push(hobbyCntr);
  }

  onCheckedFruits(e) {
    // const fruitCheckboxAr: FormArray = this.myForm.get('checkBox') as FormArray;
    
    console.log(e.target.value);
    if(e.target.checked) {
      this.fruitCheckboxAr.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.fruitCheckboxAr.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.fruitCheckboxAr.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  get fruitCheckboxAr (){
    return this.myForm.get('checkBox') as FormArray
  }

}
