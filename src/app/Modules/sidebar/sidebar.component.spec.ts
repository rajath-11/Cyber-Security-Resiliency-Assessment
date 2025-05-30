import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() currentStep: number = 0;
  @Input() completedSteps: boolean[] = [false, false, false, false, false, false, false, false];
  @Output() stepSelected = new EventEmitter<number>();

  steps = [
    {
      title: 'Customer Info',
      description: 'Some basic information we need to get to know you'
    },
    {
      title: 'IDENTIFY (ID)',
      description: 'Your security condition that is important to consider'
    },
    {
      title: 'PROTECT (PR)',
      description: 'How do you feel right now and what inspires you?'
    },
    {
      title: 'DETECT (DE)',
      description: 'Your experience in technology and what you know about cybersecurity'
    },
    {
      title: 'RESPOND (RS)',
      description: 'Find comfort and peace by meeting with a specialist you trust'
    },
    {
      title: 'RECOVER (RC)',
      description: 'Recovery planning and incident response strategies'
    },
    {
      title: 'Scorecard',
      description: 'Assessment results and security maturity evaluation'
    },
    {
      title: 'Pathway to Maturity',
      description: 'Strategic roadmap for improving cybersecurity posture'
    }
  ];

  selectStep(stepIndex: number): void {
    // Only allow navigation to accessible steps
    if (this.isStepAccessible(stepIndex)) {
      this.stepSelected.emit(stepIndex);
    }
  }

  isStepCompleted(stepIndex: number): boolean {
    return this.completedSteps[stepIndex] || false;
  }

  markStepCompleted(stepIndex: number): void {
    this.completedSteps[stepIndex] = true;
  }

  markStepIncomplete(stepIndex: number): void {
    this.completedSteps[stepIndex] = false;
  }

  getCompletionPercentage(): number {
    const completedCount = this.completedSteps.filter(step => step).length;
    return Math.round((completedCount / this.steps.length) * 100);
  }

  getProgressPercentage(): number {
    // Calculate progress based on current step and completed steps
    const maxProgress = Math.max(this.currentStep, this.getCompletedStepsCount() - 1);
    return Math.round((maxProgress / (this.steps.length - 1)) * 100);
  }

  getCompletedStepsCount(): number {
    return this.completedSteps.filter(step => step).length;
  }

  getTotalSteps(): number {
    return this.steps.length;
  }

  isStepAccessible(stepIndex: number): boolean {
    // Allow access to current step and all previous completed steps
    if (stepIndex === 0) return true;
    
    // Allow access to the next step if current step is completed
    if (stepIndex === this.currentStep + 1 && this.isStepCompleted(this.currentStep)) {
      return true;
    }
    
    // Allow access to current step
    if (stepIndex === this.currentStep) return true;
    
    // Allow access to any previously completed step
    return this.completedSteps[stepIndex] || stepIndex < this.currentStep;
  }

  // Helper method to get step status for styling
  getStepStatus(stepIndex: number): 'completed' | 'active' | 'inactive' {
    if (this.isStepCompleted(stepIndex)) {
      return 'completed';
    } else if (stepIndex === this.currentStep) {
      return 'active';
    } else {
      return 'inactive';
    }
  }

  // Method to advance to next step
  goToNextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.selectStep(this.currentStep + 1);
    }
  }

  // Method to go to previous step
  goToPreviousStep(): void {
    if (this.currentStep > 0) {
      this.selectStep(this.currentStep - 1);
    }
  }

  // Method to mark current step as completed and move to next
  completeCurrentStep(): void {
    this.markStepCompleted(this.currentStep);
    if (this.currentStep < this.steps.length - 1) {
      this.goToNextStep();
    }
  }
}