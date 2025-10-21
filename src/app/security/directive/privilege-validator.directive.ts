import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[appPrivilegeValidator]',
})
export class PrivilegeValidatorDirective {

  @Input('appPrivilegeValidator') allowedRoles!: string | string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private view: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userPrivileges = this.authService.getUsersPrivileges() ?? '';
    const userRoles = userPrivileges
      .split(',')
      .map(r => r.trim())
      .filter(Boolean);

      console.log("userPrivileges", userPrivileges);
      console.log("allowedRoles", this.allowedRoles);
      

    // Normalize allowedRoles to an array (support "A,B" string or string[] input)
    const allowed = Array.isArray(this.allowedRoles)
      ? this.allowedRoles
      : String(this.allowedRoles).split(',').map(r => r.trim()).filter(Boolean);

    //const roleAvailable = allowed.some(r => userRoles.includes(r));

    const roleAvailable = allowed.some(r => userRoles.includes(r)) || userRoles.includes('ROLE_AP_ADMIN');


    if (!roleAvailable) {
      this.view.clear();
    } else {
      this.view.createEmbeddedView(this.templateRef);
    }
  }}
