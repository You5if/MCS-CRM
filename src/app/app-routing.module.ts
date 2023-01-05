import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "./components/security/user/change-password/change-password.component";
import { DashboardComponent } from "./components/dynamic/dashboard/dashboard.component";
import { LoginComponent } from "./components/security/auth/login/login.component";
import { WelcomeComponent } from "./components/dynamic/welcome/welcome.component";
import { AuthGuard } from "./components/security/auth/auth-guard";
// import { CountryComponent } from "./components/security/admin/regional/country/country.component";
import { CityComponent } from "./components/security/admin/regional/city/city.component";
import { ReportPageComponent } from "./components/PR/report-page/report-page.component";
import { NotActivatedComponent } from "./components/dynamic/notactivated/notactivated.component";
import { SignUpComponent } from "./components/security/signup/signup.component";
import { AccountActivatedComponent } from "./components/dynamic/accountactivated/accountactivated.component";
// import { RegistrationExpiredComponent } from "./components/dynamic/registrationexpired/registrationexpired.component";
import { ChangePasswordAnonComponent } from "./components/dynamic/change-passwordanon/change-passwordanon.component";
import { SDBatchVehicleEntryComponent } from "./components/AlaadinShipping/sdbatchvehicleentry/sdbatchvehicleentry.component";
import { SDVehicleDetailComponent } from "./components/AlaadinShipping/sdvehicledetail/sdvehicledetail.component";
import { SDShippingLineCompaniesComponent } from "./components/AlaadinShipping/sdshippinglinecompanies/sdshippinglinecompanies.component";
import { SDDispatchPlanComponent } from "./components/AlaadinShipping/sddispatchplan/sddispatchplan.component";
import { SDDispatchPlanExpenseComponent } from "./components/AlaadinShipping/sddispatchplanexpense/sddispatchplanexpense.component";
import { SignUpContComponent } from "./components/security/signupcont/signup.component";
// // import { LoginAppComponent } from "./components/security/auth/loginapp/login.component";
// // import { LoginGoogleComponent } from "./components/security/auth/logingoogle/login.component";
import { SDCarMakeComponent } from "./components/AlaadinShipping/sdcarmake/sdcarmake.component";
import { SDCarModelComponent } from "./components/AlaadinShipping/sdcarmodel/sdcarmodel.component";
// import { SDUserComponent } from "./components/AlaadinShipping/sduser/sduser.component";
import { SDDispatchPlanPaymentComponent } from "./components/AlaadinShipping/sddispatchplanpayment/sddispatchplanpayment.component";
import { SDCompanyComponent } from "./components/AlaadinShipping/sdcompany/sdcompany.component";
import { AdminGuard } from "./components/security/Guard/admin.guard";
import { StaffGuard } from "./components/security/Guard/staff.guard";
import { ReportPageEmailComponent } from "./components/PR/report-pageemail/report-pageemail.component";

import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { SystemNavigationComponent } from "./system/system-navigation/system-navigation.component";
import { SystemHomeComponent } from "./system/system-home/system-home.component";
import { CustProfComponent } from "./system/custprof/custprof.component";
import { LeadComponent } from "./system/lead/lead.component";
import { CProfileComponent } from "./system/camp-profile/lead.component";
import { CMemebersComponent } from "./system/camp-mambers/lead.component";
import { CBudgetComponent } from "./system/camp-budget/lead.component";
import { CExpenseComponent } from "./system/camp-expense/lead.component";
import { CActivitesComponent } from "./system/camp-activites/lead.component";


const routes: Routes = [
  { path: "", component: LoginComponent, data: { title: "CRM - Login"}, },
  
  
  {
    path: "welcome",
    component: WelcomeComponent,
    data: { title: "Welcome - Greenfield" },
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "CRM - Login"},
  },
  
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      // { path: "dashboard", component: DashboardComponent },
      { path: "dynamic", component: DynamicFormComponent },
      { path: "System", component: SystemNavigationComponent ,children: [
        { path: '', redirectTo: 'Home', pathMatch: 'full' },
        { path: "Home", component: SystemHomeComponent},
        { path: "customer", component: CustProfComponent},
        { path: "lead", component: LeadComponent},
        { path: "campaign-profile", component: CProfileComponent},
        { path: "campaign-members", component: CMemebersComponent},
        { path: "campaign-budgeting", component: CBudgetComponent},
        { path: "campaign-expenses", component: CExpenseComponent},
        { path: "campaign-activites", component: CActivitesComponent},
      ]},
      
  //     //  { path: 'dohinv', component: InventoriesComponent },
      {
        path: "signup",
        component: SignUpComponent,
        data: { title: "Create an account for the best services" },
        canActivate: [AdminGuard],
      },
      {
        path: "report",
        component: ReportPageComponent,
      },
      { path: 'sdvhclebatch', component: SDBatchVehicleEntryComponent, data: { title: 'Get your vehicle deliveried' } },
      
      
    ],
  },
  // { path: "**", redirectTo: "welcome", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
