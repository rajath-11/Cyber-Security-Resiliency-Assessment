import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface IdentifyQuestion {
  id: string;
  category: string;
  text: string;
  response: 'Yes' | 'No' | 'In Process' | 'N/A' | null;
}

export interface IdentifyFormData {
  responses: { [key: string]: string };
  completedAt: Date;
}

@Component({
  selector: 'app-identify',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './identify.component.html',
  styleUrl: './identify.component.css'
})
export class IdentifyComponent {
  @Output() stepCompleted = new EventEmitter<{ stepIndex: number; data: IdentifyFormData }>();
  @Output() backRequested = new EventEmitter<void>();
  @Output() clearRequested = new EventEmitter<void>();

  questions: IdentifyQuestion[] = [
    // Asset Management (ID.AM)
    {
      id: 'ID.AM-1',
      category: 'Asset Management (ID.AM)',
      text: 'Physical devices and systems within the organization are inventoried',
      response: null
    },
    {
      id: 'ID.AM-2',
      category: 'Asset Management (ID.AM)',
      text: 'Software platforms and applications within the organization are inventoried',
      response: null
    },
    {
      id: 'ID.AM-3',
      category: 'Asset Management (ID.AM)',
      text: 'Organizational communication and data flows are mapped',
      response: null
    },
    {
      id: 'ID.AM-4',
      category: 'Asset Management (ID.AM)',
      text: 'External information systems are catalogued',
      response: null
    },
    {
      id: 'ID.AM-5',
      category: 'Asset Management (ID.AM)',
      text: 'Resources (e.g., hardware, devices, data, time, personnel, and software) are prioritized based on their classification, criticality, and business value',
      response: null
    },
    {
      id: 'ID.AM-6',
      category: 'Asset Management (ID.AM)',
      text: 'Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders (e.g., suppliers, customers, partners) are established',
      response: null
    },
    // Business Environment (ID.BE)
    {
      id: 'ID.BE-1',
      category: 'Business Environment (ID.BE)',
      text: 'The organization\'s role in the supply chain is identified and communicated',
      response: null
    },
    {
      id: 'ID.BE-2',
      category: 'Business Environment (ID.BE)',
      text: 'The organization\'s place in critical infrastructure and its industry sector is identified and communicated',
      response: null
    },
    {
      id: 'ID.BE-3',
      category: 'Business Environment (ID.BE)',
      text: 'Priorities for organizational mission, objectives, and activities are established and communicated',
      response: null
    },
    {
      id: 'ID.BE-4',
      category: 'Business Environment (ID.BE)',
      text: 'Dependencies and critical functions for delivery of critical services are established',
      response: null
    },
    {
      id: 'ID.BE-5',
      category: 'Business Environment (ID.BE)',
      text: 'Resilience requirements to support delivery of critical services are established for all operating states (e.g. under duress/attack, during recovery, normal operations)',
      response: null
    },
    // Governance (ID.GV)
    {
      id: 'ID.GV-1',
      category: 'Governance (ID.GV)',
      text: 'Organizational cybersecurity policy is established and communicated',
      response: null
    },
    {
      id: 'ID.GV-2',
      category: 'Governance (ID.GV)',
      text: 'Cybersecurity roles and responsibilities are coordinated and aligned with internal roles and external partners',
      response: null
    },
    {
      id: 'ID.GV-3',
      category: 'Governance (ID.GV)',
      text: 'Legal and regulatory requirements regarding cybersecurity, including privacy and civil liberties obligations, are understood and managed',
      response: null
    },
    {
      id: 'ID.GV-4',
      category: 'Governance (ID.GV)',
      text: 'Governance and risk management processes address cybersecurity risks',
      response: null
    },
    // Risk Assessment (ID.RA)
    {
      id: 'ID.RA-1',
      category: 'Risk Assessment (ID.RA)',
      text: 'Asset vulnerabilities are identified and documented',
      response: null
    },
    {
      id: 'ID.RA-2',
      category: 'Risk Assessment (ID.RA)',
      text: 'Cyber threat intelligence is received from information sharing forums and sources',
      response: null
    },
    {
      id: 'ID.RA-3',
      category: 'Risk Assessment (ID.RA)',
      text: 'Threats, both internal and external, are identified and documented',
      response: null
    },
    {
      id: 'ID.RA-4',
      category: 'Risk Assessment (ID.RA)',
      text: 'Potential business impacts and likelihoods are identified',
      response: null
    },
    {
      id: 'ID.RA-5',
      category: 'Risk Assessment (ID.RA)',
      text: 'Threats, vulnerabilities, likelihoods, and impacts are used to determine risk',
      response: null
    },
    {
      id: 'ID.RA-6',
      category: 'Risk Assessment (ID.RA)',
      text: 'Risk responses are identified and prioritized',
      response: null
    },
    // Risk Management Strategy (ID.RM)
    {
      id: 'ID.RM-1',
      category: 'Risk Management Strategy (ID.RM)',
      text: 'Risk management processes are established, managed, and agreed to by organizational stakeholders',
      response: null
    },
    {
      id: 'ID.RM-2',
      category: 'Risk Management Strategy (ID.RM)',
      text: 'Organizational risk tolerance is determined and clearly expressed',
      response: null
    },
    {
      id: 'ID.RM-3',
      category: 'Risk Management Strategy (ID.RM)',
      text: 'The organization\'s determination of risk tolerance is informed by its role in critical infrastructure and sector specific risk analysis',
      response: null
    },
    // Supply Chain Risk Management (ID.SC)
    {
      id: 'ID.SC-1',
      category: 'Supply Chain Risk Management (ID.SC)',
      text: 'Cyber supply chain risk management processes are identified, established, assessed, managed, and agreed to by organizational stakeholders',
      response: null
    },
    {
      id: 'ID.SC-2',
      category: 'Supply Chain Risk Management (ID.SC)',
      text: 'Suppliers and third party partners of information systems, components, and services are identified, prioritized, and assessed using a cyber supply chain risk assessment process',
      response: null
    },
    {
      id: 'ID.SC-3',
      category: 'Supply Chain Risk Management (ID.SC)',
      text: 'Contracts with suppliers and third-party partners are used to implement appropriate measures designed to meet the objectives of an organization\'s cybersecurity program and Cyber Supply Chain Risk Management Plan',
      response: null
    },
    {
      id: 'ID.SC-4',
      category: 'Supply Chain Risk Management (ID.SC)',
      text: 'Suppliers and third-party partners are routinely assessed using audits, test results, or other forms of evaluations to confirm they are meeting their contractual obligations',
      response: null
    },
    {
      id: 'ID.SC-5',
      category: 'Supply Chain Risk Management (ID.SC)',
      text: 'Response and recovery planning and testing are conducted with suppliers and third-party providers',
      response: null
    }
  ];

  responseOptions = ['Yes', 'No', 'In Process', 'N/A'];
  currentQuestionIndex = 0;

  constructor() {}

  get currentQuestion(): IdentifyQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  get currentCategory(): string {
    return this.currentQuestion.category;
  }

  get questionNumber(): string {
    return `${this.currentQuestionIndex + 1}`.padStart(2, '0');
  }

  get totalQuestions(): number {
    return this.questions.length;
  }

  get canGoNext(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  get canGoPrevious(): boolean {
    return this.currentQuestionIndex > 0;
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  get progressPercentage(): number {
    return Math.round(((this.currentQuestionIndex + 1) / this.questions.length) * 100);
  }

  get completedResponses(): number {
    return this.questions.filter(q => q.response !== null).length;
  }

  get allQuestionsAnswered(): boolean {
    return this.questions.every(q => q.response !== null);
  }

  selectResponse(response: 'Yes' | 'No' | 'In Process' | 'N/A'): void {
    this.questions[this.currentQuestionIndex].response = response;
  }

  nextQuestion(): void {
    if (this.canGoNext) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.canGoPrevious) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.currentQuestionIndex = index;
    }
  }

  getResponseIcon(option: string): string {
    switch(option) {
      case 'Yes': return '✓';
      case 'No': return '✗';
      case 'In Process': return '⏳';
      case 'N/A': return '—';
      default: return '';
    }
  }

  getResponseColor(option: string): string {
    switch(option) {
      case 'Yes': return '#10b981';
      case 'No': return '#ef4444';
      case 'In Process': return '#f59e0b';
      case 'N/A': return '#6b7280';
      default: return '#e5e7eb';
    }
  }

  isResponseSelected(option: string): boolean {
    return this.currentQuestion.response === option;
  }

  onSaveAndContinue(): void {
    if (!this.allQuestionsAnswered) {
      alert('Please answer all questions before continuing.');
      return;
    }

    const responses: { [key: string]: string } = {};
    this.questions.forEach(q => {
      responses[q.id] = q.response || '';
    });

    const formData: IdentifyFormData = {
      responses,
      completedAt: new Date()
    };

    this.stepCompleted.emit({ 
      stepIndex: 1, // IDENTIFY step is index 1
      data: formData 
    });
  }

  onBack(): void {
    // Emit back event to parent
    this.backRequested.emit();
  }

  getReadinessScore(): number {
    const yesCount = this.questions.filter(q => q.response === 'Yes').length;
    const totalAnswered = this.questions.filter(q => q.response !== null && q.response !== 'N/A').length;
    return totalAnswered > 0 ? Math.round((yesCount / totalAnswered) * 100) : 0;
  }

  getCategoryQuestions(category: string): IdentifyQuestion[] {
    return this.questions.filter(q => q.category === category);
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.questions.map(q => q.category))];
  }
}