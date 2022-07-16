import {FormGroup} from "@angular/forms";

export function MustMatch(controlName:string, matchingControlName: string) {

  return(fromGroup: FormGroup)=>{
    const control = fromGroup.controls[controlName];
    const matchingControl = fromGroup.controls[matchingControlName];

    if(matchingControl.errors && !matchingControl.errors['mustMatch']){
      return
    }
    if(control.value !== matchingControl.value){
      matchingControl.setErrors({mustMatch:true})
    }
    else{
      matchingControl.setErrors(null);
    }
  }


}
