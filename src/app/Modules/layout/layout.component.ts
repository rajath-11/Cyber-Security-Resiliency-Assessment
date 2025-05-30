import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { IdentifyComponent } from '../identify/identify.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CustomerDetailsComponent, IdentifyComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  title = 'Cyber';
  currentStep: number = 0;
  completedSteps: boolean[] = [false, false, false, false, false, false, false, false];

  onStepSelected(stepIndex: number): void {
    // Only allow navigation to accessible steps
    if (this.isStepAccessible(stepIndex)) {
      this.currentStep = stepIndex;
      console.log('Step selected:', stepIndex);
    } else {
      console.log('Step not accessible:', stepIndex);
    }
  }

  onStepCompleted(stepIndex: number, formData?: any): void {
    // Mark the step as completed
    this.completedSteps[stepIndex] = true;
    
    // Store form data (you might want to use a service for this)
    if (formData) {
      this.storeStepData(stepIndex, formData);
    }
    
    // Move to next step automatically
    this.moveToNextStep();
    
    console.log(`Step ${stepIndex} completed with data:`, formData);
  }

  markStepCompleted(stepIndex: number): void {
    this.completedSteps[stepIndex] = true;
  }

  moveToNextStep(): void {
    if (this.currentStep < 7) {
      this.currentStep++;
      console.log('Moved to step:', this.currentStep);
    }
  }

  moveToPreviousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      console.log('Moved back to step:', this.currentStep);
    }
  }

  private isStepAccessible(stepIndex: number): boolean {
    // Allow access to current step and all previous completed steps
    if (stepIndex === 0) return true;
    return this.completedSteps[stepIndex - 1] || stepIndex <= this.currentStep;
  }

  private storeStepData(stepIndex: number, data: any): void {
    // Store data in localStorage
    console.log(`Storing step ${stepIndex} data:`, data);
    
    const stepDataKey = `step_${stepIndex}_data`;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(stepDataKey, JSON.stringify(data));
    }
  }

  // Method to get stored step data
  getStepData(stepIndex: number): any {
    const stepDataKey = `step_${stepIndex}_data`;
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(stepDataKey);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  // Method to clear all stored data
  clearAllData(): void {
    if (typeof localStorage !== 'undefined') {
      for (let i = 0; i < this.completedSteps.length; i++) {
        localStorage.removeItem(`step_${i}_data`);
      }
    }
    this.completedSteps = [false, false, false, false, false, false, false, false];
    this.currentStep = 0;
  }
}