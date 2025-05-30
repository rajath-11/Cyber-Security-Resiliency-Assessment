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
      description: 'Some basic information we need to get to know you',
      index: 0
    },
    {
      title: 'IDENTIFY (ID)',
      description: 'Your security condition that is important to consider',
      index: 1
    },
    {
      title: 'PROTECT (PR)',
      description: 'How do you feel right now and what inspires you?',
      index: 2
    },
    {
      title: 'DETECT (DE)',
      description: 'Your experience in technology and what you know about cybersecurity',
      index: 3
    },
    {
      title: 'RESPOND (RS)',
      description: 'Find comfort and peace by meeting with a specialist you trust',
      index: 4
    },
    {
      title: 'RECOVER (RC)',
      description: 'Recovery planning and incident response strategies',
      index: 5
    },
    {
      title: 'Scorecard',
      description: 'Assessment results and security maturity evaluation',
      index: 6
    },
    {
      title: 'Pathway to Maturity',
      description: 'Strategic roadmap for improving cybersecurity posture',
      index: 7
    }
  ];

  selectStep(stepIndex: number): void {
    // Check if step is accessible before emitting
    if (this.isStepAccessible(stepIndex)) {
      this.stepSelected.emit(stepIndex);
    }
  }

  isStepCompleted(stepIndex: number): boolean {
    return this.completedSteps[stepIndex] || false;
  }

  isStepAccessible(stepIndex: number): boolean {
    // Allow access to current step and all previous completed steps
    if (stepIndex === 0) return true;
    return this.completedSteps[stepIndex - 1] || stepIndex <= this.currentStep;
  }

  isStepClickable(stepIndex: number): boolean {
    return this.isStepAccessible(stepIndex);
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
}