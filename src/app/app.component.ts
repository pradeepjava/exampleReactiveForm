import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { promise } from 'protractor';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  userForm: FormGroup;
  invalidUsers = ['amar', 'mohan']

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.validateInvalidUser.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email],this.asyncEmailValidator.bind(this))
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })

    this.userForm.setValue({
      'userData':{
        'username':'pradeep',
        'email':'pk123@123.com'
      },
      'gender':'male',
      'hobbies':[]
    })
    this.userForm.patchValue({
      'userData':{
        'username':'ratan'}
    })
    this.userForm.reset();

    // this.userForm.valueChanges.subscribe(data=>{
    //   console.log(data);
    // })
    // this.userForm.statusChanges.subscribe(data=>{
    //   console.log(data);
    // })
    // this.userForm.controls['userData'].valueChanges.subscribe(data=>{
    //   console.log(data);
    // })

    
  }
  addHobies() {
    const formControl = new FormControl(null, Validators.required);
    (<FormArray>(this.userForm.get('hobbies'))).push(formControl);
  }

  getControls() {
    return (<FormArray>(this.userForm.get('hobbies'))).controls;
  }

  onSubmit() {
    console.log(this.userForm);
  }

  validateInvalidUser(control: FormControl): { [s: string]: boolean } {
    if (this.invalidUsers.indexOf(control.value) != -1) {
      return { 'invalid': true }
    }
  }

  asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'pk@g.com') {
          resolve({ 'invalidEmail': true });
        }
        else {
          resolve(null);
        }
      }, 1000)
    })
    return promise;
  }

}
