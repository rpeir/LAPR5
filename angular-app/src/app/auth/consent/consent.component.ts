import {Component, Inject} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent {

  constructor(public dialogRef: MatDialogRef<ConsentComponent>) {
    dialogRef.disableClose = true;
  }

  isNameConsent : boolean = false;
  isEmailConsent : boolean = false;
  isPhoneConsent : boolean = false;
  isImageConsent : boolean = false;
  isNifConsent : boolean = false;
  isRoleConsent : boolean = false;

  nameConsent(event : MatCheckboxChange) {
    this.isNameConsent = event.checked;
  }

  emailConsent(event : MatCheckboxChange) {
    this.isEmailConsent = event.checked;
  }

  phoneConsent(event : MatCheckboxChange) {
    this.isPhoneConsent = event.checked;
  }

  imageConsent(event : MatCheckboxChange) {
    this.isImageConsent = event.checked;
  }

  nifConsent(event : MatCheckboxChange) {
    this.isNifConsent = event.checked;
  }

  roleConsent(event : MatCheckboxChange) {
    this.isRoleConsent = event.checked;
  }

  handleConsent() {
    // Check if all checkboxes are checked before proceeding
    if (this.isNameConsent && this.isEmailConsent && this.isPhoneConsent && this.isImageConsent && this.isNifConsent && this.isRoleConsent) {
      this.dialogRef.close(true);
    } else {
      window.alert("Please check all checkboxes to proceed.");
    }
  }

  denyConsent() {
    window.alert("Please accept to use the application.")
  }

  goToPrivacyPolicy() {
    this.dialogRef.close(false);
  }
}
