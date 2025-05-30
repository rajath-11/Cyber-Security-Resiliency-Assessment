import { Component, EventEmitter, Output, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent implements OnInit {
  @Output() stepCompleted = new EventEmitter<{stepIndex: number, data: any}>();
  @Output() nextStep = new EventEmitter<void>();

  customerForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.customerForm = this.fb.group({
      companyLegalName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      pocName: ['', [Validators.required, Validators.minLength(2)]],
      pocEmail: ['', [Validators.required, Validators.email]],
      pocPhone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      businessNature: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      noOfLocations: ['', [Validators.required, Validators.min(1)]],
      noOfEmployees: ['', [Validators.required, Validators.min(1)]],
      noOfSuppliers: ['', [Validators.required, Validators.min(0)]],
      noOfExternalPartners: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Load existing data if available
    this.loadExistingData();
  }

  // Getter methods for easy access to form controls
  get companyLegalName() { return this.customerForm.get('companyLegalName'); }
  get address() { return this.customerForm.get('address'); }
  get phone() { return this.customerForm.get('phone'); }
  get email() { return this.customerForm.get('email'); }
  get pocName() { return this.customerForm.get('pocName'); }
  get pocEmail() { return this.customerForm.get('pocEmail'); }
  get pocPhone() { return this.customerForm.get('pocPhone'); }
  get businessNature() { return this.customerForm.get('businessNature'); }
  get industry() { return this.customerForm.get('industry'); }
  get noOfLocations() { return this.customerForm.get('noOfLocations'); }
  get noOfEmployees() { return this.customerForm.get('noOfEmployees'); }
  get noOfSuppliers() { return this.customerForm.get('noOfSuppliers'); }
  get noOfExternalPartners() { return this.customerForm.get('noOfExternalPartners'); }

  onSaveAndContinue(): void {
    this.isSubmitted = true;
    
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      
      // Save data locally
      this.saveData(formData);
      
      // Emit the completed step data with step index
      this.stepCompleted.emit({
        stepIndex: 0, // Customer Details is step 0
        data: formData
      });
      
      console.log('Customer Details saved:', formData);
      
      // The parent component will handle navigation
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.customerForm);
      
      // Scroll to first error
      this.scrollToFirstError();
    }
  }

  onClearAll(): void {
    this.customerForm.reset();
    this.isSubmitted = false;
    
    // Reset all form controls to pristine and untouched state
    Object.keys(this.customerForm.controls).forEach(key => {
      this.customerForm.get(key)?.setErrors(null);
    });

    // Clear saved data
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('step_0_data');
    }
  }

  private loadExistingData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedData = localStorage.getItem('step_0_data');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          this.customerForm.patchValue(parsedData);
        } catch (error) {
          console.error('Error loading saved data:', error);
        }
      }
    }
  }

  private saveData(data: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('step_0_data', JSON.stringify(data));
    }
  }

  private scrollToFirstError(): void {
    const firstErrorElement = document.querySelector('.form-input.error');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper method to check if a field has errors and should show error message
  hasError(controlName: string): boolean {
    const control = this.customerForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched || this.isSubmitted));
  }

  // Helper method to get error message for a specific field
  getErrorMessage(controlName: string): string {
    const control = this.customerForm.get(controlName);
    
    if (control?.errors) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(controlName)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return `${this.getFieldDisplayName(controlName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return 'Please enter a valid phone number';
      }
      if (control.errors['min']) {
        return `${this.getFieldDisplayName(controlName)} must be at least ${control.errors['min'].min}`;
      }
    }
    
    return '';
  }

  private getFieldDisplayName(controlName: string): string {
    const fieldNames: { [key: string]: string } = {
      'companyLegalName': 'Company Legal Name',
      'address': 'Address',
      'phone': 'Phone',
      'email': 'Email',
      'pocName': 'Point of Contact Name',
      'pocEmail': 'Point of Contact Email',
      'pocPhone': 'Point of Contact Phone',
      'businessNature': 'Business Nature',
      'industry': 'Industry',
      'noOfLocations': 'Number of Locations',
      'noOfEmployees': 'Number of Employees',
      'noOfSuppliers': 'Number of Suppliers',
      'noOfExternalPartners': 'Number of External Partners'
    };
    
    return fieldNames[controlName] || controlName;
  }
}