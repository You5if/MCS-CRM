import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { StyleDirective } from '@angular/flex-layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { matDrawerAnimations } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';
// import { TouchSequence } from 'selenium-webdriver';
import { AppGlobals } from 'src/app/app.global';
import { BottomSheetSettingsComponent } from 'src/app/bottom-sheet-settings/bottom-sheet-settings.component';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { LoginModule } from 'src/app/components/security/auth/login/login.model';
import { ChangePasswordNewComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-system-navigation',
  templateUrl: './system-navigation.component.html',
  styleUrls: ['./system-navigation.component.scss']
})
export class SystemNavigationComponent implements OnInit {

  showFiller = false;
  showButton: boolean = false;
  key!: number;
  lang: string = "Arabic";
  direction: Direction = "ltr";
  lang_LS: string = "16001";
  break: boolean = true;
  title = 'SystemHR1';
  home!: string;
  shipping!: string
  businessP!: string;
  profile!:string;
  journal!: string;
  expense!: string;
  purchase!: string;
  company!: string;
  costCenter!: string;
  shareHolder!: string;
  tax!: string;
  forex!: string;
  management!:string;
  account!: string;
  paymentFromCompany!: string;
  paymentToCompany!: string;
  proExpense!: string;
  proInv!: string;
  proExpenseList!: string;
  invoice!: string;
  bank!: string;
  bankBranch!: string;
  bankAccount!: string;
  cheque!: string;
  customer!: string;
  accountConfiguration!: string;
  accounting!: string;
  config!: string;
  paymentAndReceipt!: string;
  supplier!: string;
  suppForex!:string
  sales!: string;
  inventory!: string;
  product!: string;
  productCategory!: string;
  productGroup!: string;
  productUnit!: string;
  productPricing!: string;
  CRM!: string;
  productUnitConversion!: string;
  warehouse!: string;
  stockIn!: string;
  stockMovement!: string;
  logout!: string;
  booking!: string
  partTrans!:string
  change!: string;
  transGood!:string
  partner!: string
  containerProducts!: string
  invoicePartners!: string
  transportedGood !: string
  lead !: string
  leadcre !: string
  leadqua !: string
  leaddis !: string
  leadass !: string
  leadfollow !: string
  financialYearManagement! : string
  fiscalYear !: string
  accountOpeningBalance! : string
  stockOpening !: string
  payment !: string
  receipt !: string
  customerOpeningBalance! : string
  supplierOpeningBalance !: string
  reports !: string
  financialReports! : string

  resizeStyle: object = {};

  isOpen_YourVariable = true;


  

  navigation!: string;
  role = localStorage.getItem("role");

  userName!: string;
  userEmail!: string;

  openPanel: boolean = true
  

  model: LoginModule = {
    'username': 'milesh@markoncs.com',
    'password': '123456789',
    'loginType': 1
  }
  changePassword: string;
  campaignManagement: string;
  campaignProfile: string;
  campaignMembers: string;
  campaignBudgeting: string;
  campaignExpenses: string;
  campaignActivities: string;
  leadReports: string;
  campReports: string;
  openPanel1: boolean;
  openPanel2: boolean;
  openPanel3: boolean;
  more: string;

  constructor(private _globals: AppGlobals,
    private _auth: AuthService,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private router: Router,) { }
    


ngOnInit(): void {

  this.openPanel1 = false
  this.openPanel2 = false
  this.openPanel3 = false

  this.userName = this._auth.getUserName();
  this.userEmail = this._auth.getUniqueName();

  this.role = localStorage.getItem("role");
  console.log(this.role);
  this.userName = this._auth.getUserName()
  

  this.resizeStyle = {
    "max-width": `30%`,
  };
  this.home = "Home"
      this.businessP = "Company profile"
      this.journal = "Journals"
      this.changePassword = "Change password"
      this.CRM = "CRM"
      this.expense = "Expenses"
      this.bank = "Bank"
      this.transGood = "Transporting goods"
      this.profile = "Profile"
      this.more = "More"
      this.partTrans = "Partners' management"
      this.invoice = "Invoice"
      this.partner = "Partners"
      this.bankBranch = "Bank branch"
      this.company = "Company"
      this.shareHolder = "Shareholder"
      this.costCenter = "Cost center"
      this.proExpense = "Procurement expenses"
      this.proInv = "Purchase invoice"
      this.proExpenseList = "Procurement expense list"
      this.bankAccount = "Bank account"
      this.paymentFromCompany = "Company payment"
      this.paymentToCompany = "Customer payment"
      this.accountConfiguration = "Account configuration"
      this.suppForex = "Purchase Forex"
      this.management = "Lead Management"
      this.campaignManagement = "Campaign Management"
      this.campaignProfile = "Campaign Profile"
      this.campaignMembers = "Campaign Members"
      this.campaignBudgeting = "Campaign Budgeting"
      this.campaignExpenses = "Campaign Expenses"
      this.campaignActivities = "Campaign Activities"
      this.tax = "Taxes"
      this.forex = "Forex"
      this.leadReports = "Lead Reports"
      this.campReports = "Campaign Reports"
      this.shipping = "Shipping"
      this.customer = "Customer"
      this.lead = "Lead"
      this.leadcre = "Lead Creation"
      this.leadqua = "Lead Qualification"
      this.leaddis = "Lead Distribution"
      this.leadass = "Lead Assignment"
      this.leadfollow = "Lead Follow-up"
      this.account = "Account"
      this.accounting = "Accounting"
      this.config = "Configurtions"
      this.paymentAndReceipt = "Payment and Receipt"
      this.booking = "Booking"
      this.sales = "Sales"
      this.inventory = "Inventory"
      this.product = "Product"
      this.productCategory = "Product category"
      this.productGroup = "Product group"
      this.productUnit = "Product unit"
      this.productPricing = "Product pricing"
      this.CRM = "CRM"
      this.productUnitConversion = "Product unit conversion"
      this.warehouse = "Warehouse"
      this.stockIn = "Stock in"
      this.supplier = "Supplier"
      this.purchase = "Purchase"
      this.containerProducts = "Container loading"
      this.invoicePartners = "Partners' invoice"
      this.transportedGood = "Transported goods"
      this.financialYearManagement= "Financial year management"
      this.fiscalYear = "Fiscal year"
      this.accountOpeningBalance = "Account opening balance"
      this.stockOpening = "Stock opening"
      this.payment = "Payment"
      this.receipt = "Receipt"
      this.customerOpeningBalance = "Customer opening balance"
      this.supplierOpeningBalance = "Supplier opening balance"
      this.reports = "Reports"
      this.financialReports = "Financial reports"
      this.stockMovement = "Stock movement"
      this.cheque = "Cheque"
      this.logout = "Logout"
      this.change = "Language:"

      localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
 

  console.log(this.navigation);
    this.break =
    window.innerWidth <= 740
      ? false
      : true;
  }

  openPanels(id: number) {
    if (id == 1) {
      this.openPanel1 = true
      this.openPanel2 = false
      this.openPanel3 = false
    }else if (id == 2) {
      this.openPanel1 = false
      this.openPanel2 = true
      this.openPanel3 = false
    }else if (id == 3) {
      this.openPanel1 = false
      this.openPanel2 = false
      this.openPanel3 = true
    }
  }

  onSignOut() {
    this._auth.logout();
  }

  onBusiness(name: string) {
    this.navigation = "Home"
    localStorage.getItem(this._globals.baseAppName + '_nav');
    var header = document.getElementById("myDIV");
var btns = header!.getElementsByClassName("side_list_item");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  btns[0].className += " active";
  
  
}

onToggle() {
  this.break = !this.break
}

onChangePassword  () {
    
  const dialogRef = this.dialog.open(ChangePasswordNewComponent, {
    disableClose: true,
    
    data: {}
  });

dialogRef.afterClosed().subscribe(() => {});
};
  
 

  onClickHome() {
    this.router.navigate(['/System/Home']);
  }

  onChangeLanguage() {
    this.navigation = "Home"
    this.router.navigate(['/System/Home']);
    var header = document.getElementById("myDIV");
    var btns = header!.getElementsByClassName("side_list_item");
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      btns[0].className += " active";
    if (localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.lang = "Arabic"
      this.direction = "ltr"
      this.home = "Home"
      this.businessP = "Company profile"
      this.journal = "Journals"
      this.changePassword = "Change password"
      this.expense = "Expenses"
      this.partner = "Partners"
      this.paymentFromCompany = "Company payment"
      this.paymentToCompany = "Customer payment"
      this.tax = "Taxes"
      this.invoice = "Invoice"
      this.bank = "Bank"
      this.purchase = "Purchase"
      this.bankBranch = "Bank branch"
      this.bankAccount = "Bank account"
      this.forex = "Forex"
      this.leadReports = "Lead Reports"
      this.campReports = "Campaign Reports"
      this.partTrans = "Partners' management"
      this.customer = "Customer"
      this.lead = "Lead"
      
      this.leadReports = "Lead Reports"
      this.campReports = "Campaign Reports"
      this.leadcre = "Lead Creation"
      this.leadqua = "Lead Qualification"
      this.leaddis = "Lead Distribution"
      this.leadass = "Lead Assignment"
      this.leadfollow = "Lead Follow-up"
      this.proExpense = "Procurement expenses"
      this.proInv = "Purchase invoice"
      this.proExpenseList = "Procurement expense list"
      this.accountConfiguration = "Account configuration"
      this.account = "Account"
      this.accounting = "Accounting"
      this.config = "Configurtions"
      this.paymentAndReceipt = "Payment and Receipt"
      this.sales = "Sales"
      this.inventory = "Inventory"
      this.product = "Product"
      this.profile = "Profile"
      this.more = "More"
      this.shipping = "Shipping"
      this.supplier = "Supplier"
      this.suppForex = "Purchase forex"
      this.productCategory = "Product category"
      this.productGroup = "Product group"
      this.productUnit = "Product unit"
      this.productPricing = "Product pricing"
      this.transGood = "Transporting goods"
      this.company = "Company"
      this.shareHolder = "Shareholder"
      this.costCenter = "Cost center"
      this.booking = "Booking"
      this.CRM = "CRM"
      this.productUnitConversion = "Product unit conversion"
      this.warehouse = "Warehouse"
      this.stockIn = "Stock in"
      this.stockMovement = "Stock movement"
      this.containerProducts = "Container loading"
      this.invoicePartners = "Partners' invoice"
      this.transportedGood = "Transported goods"
      this.financialYearManagement= "Financial year management"
      this.fiscalYear = "Fiscal year"
      this.management = "Lead Management"
      this.campaignManagement = "Campaign Management"
      this.campaignProfile = "Campaign Profile"
      this.campaignMembers = "Campaign Members"
      this.campaignBudgeting = "Campaign Budgeting"
      this.campaignExpenses = "Campaign Expenses"
      this.campaignActivities = "Campaign Activities"
      this.accountOpeningBalance = "Account opening balance"
      this.stockOpening = "Stock opening"
      this.payment = "Payment"
      this.receipt = "Receipt"
      this.customerOpeningBalance = "Customer opening balance"
      this.supplierOpeningBalance = "Supplier opening balance"
      this.reports = "Reports"
      this.financialReports = "Financial Reports"
      this.cheque = "Cheque"
      this.logout = "Logout"
      this.change = "Language:"
      
      
      this.lang_LS = "16001"
    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.lang = "????????????????????"
      this.lang_LS = "16002"
      this.direction = "rtl"
      this.home = " ???????????????? "
      this.businessP = "???????? ????????????"
      this.journal = "??????????????"
      this.changePassword = "?????????? ???????? ????????"
      this.invoice = "????????????????"
      this.partTrans = "?????????? ??????????????"
      this.bank = "??????????"
      this.company = "????????????"
      this.shareHolder = "?????????? ????????????"
      this.costCenter = "???????? ??????????????"
      this.paymentFromCompany = "?????????? ???? ????????????"
      this.suppForex = "?????????? ????????????"
      this.paymentToCompany = "?????????? ?????? ????????????"
      this.bankBranch = "?????? ??????????"
      this.bankAccount = "???????? ??????????"
      this.accountConfiguration = "?????????????? ????????????????"
      this.expense = "??????????????????"
      this.tax = "??????????????"
      this.customer = "????????????"
      this.lead = "??????????"
      this.leadcre = "?????????? ??????????"
      this.leadqua = "???????????? ??????????"
      this.leaddis = "?????????? ??????????"
      this.leadass = "?????????? ??????????"
      this.leadfollow = "???????????? ??????????"
      this.forex = "??????????"
      this.leadReports = "???????????? ??????????"
      this.campReports = "???????????? ??????????????"
      this.account = "????????????????"
      this.partner = "??????????????"
      this.purchase = "???????????? ????????????"
      this.management = "?????????? ??????????"
      this.campaignManagement = "?????????? ??????????????"
      this.campaignProfile = "?????? ????????????"
      this.campaignMembers = "?????????? ????????????"
      this.campaignBudgeting = "?????????????? ????????????"
      this.campaignExpenses = "?????????????? ????????????"
      this.campaignActivities = "???????????? ????????????"
      this.accounting = "????????????????"
      this.CRM = "?????????? ???????????? ??????????????"
      this.proExpense = "???????? ??????????????????"
      this.transGood = "?????? ??????????"
      this.proInv = "???????????? ????????????"
      this.shipping = "??????????"
      this.proExpenseList = "?????????? ???????? ??????????????????"
      this.config = "??????????????????"
      this.paymentAndReceipt = "?????????? ??????????????????"
      this.sales = "????????????????"
      this.inventory = "??????????????"
      this.profile = "?????? ????????????????"
      this.more = "????????????"
      this.supplier = "????????????"
      this.product = "????????????????"
      this.productCategory = "?????????? ????????????????"
      this.productGroup = "?????????????? ????????????????"
      this.productUnit = "?????????? ????????????????"
      this.productPricing = "???????????? ????????????????"
      
      this.booking = "????????????????"
      this.productUnitConversion = "?????????? ???????? ????????????????"
      this.warehouse = "??????????????"
      this.containerProducts = "???????????? ????????????????"
      this.invoicePartners = "???????????? ??????????????"
      this.transportedGood = "?????????????? ????????????????"
      this.financialYearManagement= "?????????? ?????????? ??????????????"
      
      this.fiscalYear = "?????????? ??????????????"
      this.accountOpeningBalance = "???????????? ?????????????????? ????????????"
      this.stockOpening = "???????????? ??????????????"
      this.payment = "??????????"
      this.receipt = "????????????????"
      this.customerOpeningBalance = "???????????? ?????????????????? ????????????"
      this.supplierOpeningBalance = "???????????? ?????????????????? ????????????"
      this.reports = "????????????????"
      this.financialReports = "???????????????? ??????????????"
      this.stockIn = "?????????????? ????????????"
      this.stockMovement = "?????????????? ????????????"
      this.cheque = "??????????????"
      this.logout = " ?????????? ????????????"
      this.change = "??????????:"
    }else if (localStorage.getItem(this._globals.baseAppName + '_language') == "") {
      this.lang = "Arabic"
      this.direction = "ltr"
      this.home = "Home"
      this.businessP = "Business Profile"
      this.journal = "journals"
      this.changePassword = "Change password"
      this.invoice = "Invoice"
      this.paymentFromCompany = "Company payment"
      this.paymentToCompany = "Customer payment"
      this.expense = "Expenses"
      this.customer = "Customer"
      this.partner = "Partners"
      this.lead = "Lead"
      this.leadcre = "Lead Creation"
      this.leadqua = "Lead Qualification"
      this.leaddis = "Lead Distribution"
      this.leadass = "Lead Assignment"
      this.leadfollow = "Lead Follow-up"
      this.company = "Company"
      this.shareHolder = "Shareholder"
      this.costCenter = "Cost center"
      this.partTrans = "Partners' management"
      this.accountConfiguration = "Account Configuration"
      this.tax = "Taxes"
      this.proExpense = "Procurement expenses"
      this.proInv = "Purchase invoice"
      this.proExpenseList = "Procurement expense list"
      this.suppForex = "Purchase forex"
      this.forex = "Forex"
      this.leadReports = "Lead Reports"
      this.campReports = "Campaign Reports"
      this.shipping = "Shipping"
      this.transGood = "Transporting goods"
      this.account = "Account"
      this.accounting = "Accounting"
      this.config = "Configurtions"
      this.paymentAndReceipt = "Payment and Receipt"
      this.sales = "Sales"
      this.profile = "Profile"
      this.more = "More"
      this.inventory = "Inventory"
      this.supplier = "Supplier"
      this.product = "Product"
      this.purchase = "Purchase"
      this.productCategory = "Product category"
      this.productGroup = "Product group"
      this.productUnit = "Product unit"
      this.productPricing = "Product pricing"
     
      this.productUnitConversion = "Product unit conversion"
      this.warehouse = "Warehouse"
      this.stockIn = "Stock in"
      this.stockMovement = "Stock movement"
      this.cheque = "Cheque"
      this.logout = "Logout"
      this.management = "Lead Management"
      this.campaignManagement = "Campaign Management"
      this.campaignProfile = "Campaign Profile"
      this.campaignMembers = "Campaign Members"
      this.campaignBudgeting = "Campaign Budgeting"
      this.campaignExpenses = "Campaign Expenses"
      this.campaignActivities = "Campaign Activities"
      this.CRM = "CRM"
      this.change = "Change to:"
      this.booking = "Booking"
      this.containerProducts = "Container loading"
      this.invoicePartners = "Partners' invoice"
      this.transportedGood = "Transported goods"
      this.financialYearManagement= "Financial year management"
      this.fiscalYear = "Fiscal year"
      this.accountOpeningBalance = "Account opening balance"
      this.stockOpening = "Stock opening"
      this.payment = "Payment"
      this.receipt = "Receipt"
      this.customerOpeningBalance = "Customer opening balance"
      this.supplierOpeningBalance = "Supplier opening balance"
      
      this.lang_LS = "16001"
    }
    localStorage.setItem(this._globals.baseAppName + '_language', this.lang_LS);
    console.log("lang: ",localStorage.getItem(this._globals.baseAppName + '_language'))
    
  }

  checkEng(){
    return (localStorage.getItem(this._globals.baseAppName + '_language') == '16002')
      
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetSettingsComponent);
  }

  resizeEdges(){
    if(localStorage.getItem(this._globals.baseAppName + '_language') == '16001'){
      return {right: true}
    } else {return{left: true}}
  }

  onResize(event: any){
    this.break =
    window.innerWidth <= 740
      ? false
      : true;
  }
  resizeValidate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }
 
                    /**
                     * Finilizes resize positions
                     * (used for drawer/sidenav width)
                     * @param event 
                     */
  onResizeEnd(event: ResizeEvent): void {
    console.log(event);
    
    this.resizeStyle = {
                     // enable/disable these per your needs
      // position: 'fixed',
      // left: `${event.rectangle.left}px`,
      // top: `${event.rectangle.top}px`,
      // height: `${event.rectangle.height}px`,
      width: `${event.rectangle.width}px`,
    };
  }

}
