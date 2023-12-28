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
  allComplete : boolean = false;


  handleConsent() {
    // Check if all checkboxes are checked before proceeding
    if (this.allComplete) {
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

  updateAllComplete() {
    this.allComplete =
      this.isNameConsent &&
      this.isImageConsent &&
      this.isEmailConsent &&
      this.isPhoneConsent &&
      this.isRoleConsent &&
      this.isNifConsent;
  }

  someComplete(): boolean {
    return (this.isNameConsent ||
      this.isImageConsent ||
      this.isEmailConsent ||
      this.isPhoneConsent ||
      this.isRoleConsent ||
      this.isNifConsent ) && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    this.isNameConsent = completed;
    this.isEmailConsent = completed;
    this.isNifConsent = completed;
    this.isPhoneConsent = completed;
    this.isRoleConsent = completed;
    this.isImageConsent = completed;
  }
}
