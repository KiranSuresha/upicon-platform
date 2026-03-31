// ─── Common ─────────────────────────────────────────────────────────────────

export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "approved"
  | "rejected"
  | "in-review"
  | "completed"
  | "at-risk"
  | "critical"
  | "new"
  | "onboarded"
  | "suspended";

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface KPIMetric {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: string;
  color?: "blue" | "green" | "amber" | "red" | "purple" | "cyan";
}

// ─── Banking / BC ────────────────────────────────────────────────────────────

export type BCStatus = "lead" | "screening" | "document" | "interview" | "onboarded" | "active" | "inactive" | "suspended";

export interface BusinessCorrespondent {
  id: string;
  name: string;
  mobile: string;
  district: string;
  block: string;
  bank: string;
  status: BCStatus;
  kycScore: number;
  activatedAt?: string;
  lastTransactionAt?: string;
  monthlyTransactions: number;
  monthlyVolume: number;
  kiosk: {
    gps: boolean;
    biometric: boolean;
    printer: boolean;
    active: boolean;
  };
  fieldExecutive: string;
  createdAt: string;
}

export interface BCDocument {
  id: string;
  bcId: string;
  type: "PAN" | "Aadhaar" | "PCC" | "IIBF" | "ShopPhoto" | "OtherID";
  status: "pending" | "uploaded" | "verified" | "rejected";
  uploadedAt?: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface BCMetrics {
  totalLeads: number;
  pendingScreening: number;
  pendingDocuments: number;
  onboardedThisMonth: number;
  activeBCs: number;
  inactiveBCs: number;
  avgOnboardingDays: number;
  kiosk: {
    total: number;
    active: number;
    downtime: number;
  };
}

// ─── Consultancy ─────────────────────────────────────────────────────────────

export type DPRStatus = "draft" | "in-review" | "revision" | "approved" | "submitted" | "rejected";

export interface DPRProject {
  id: string;
  title: string;
  client: string;
  district: string;
  sector: string;
  value: number;
  status: DPRStatus;
  draftAge: number;
  assignedTo: string;
  reviewLoops: number;
  dueDate: string;
  createdAt: string;
}

export type TEVStatus = "initiated" | "data-collection" | "analysis" | "review" | "finalized";

export interface TEVProject {
  id: string;
  title: string;
  applicant: string;
  loanAmount: number;
  sector: string;
  bank: string;
  district: string;
  status: TEVStatus;
  viabilityScore?: number;
  assignedTo: string;
  dueDate: string;
  createdAt: string;
}

export interface SurveyProject {
  id: string;
  title: string;
  scheme: string;
  district: string;
  fieldAgents: number;
  targetResponses: number;
  completedResponses: number;
  status: "active" | "completed" | "pending";
  startDate: string;
  endDate: string;
}

// ─── Training ────────────────────────────────────────────────────────────────

export type TrainingScheme =
  | "ODOP"
  | "VSSY"
  | "CM YUVA"
  | "Mission Shakti"
  | "RGSA"
  | "PMKVY"
  | "DDU-GKY";

export interface TrainingBatch {
  id: string;
  batchCode: string;
  scheme: TrainingScheme;
  district: string;
  center: string;
  trainer: string;
  totalEnrolled: number;
  present: number;
  assessmentScore?: number;
  startDate: string;
  endDate: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

export interface Beneficiary {
  id: string;
  name: string;
  mobile: string;
  district: string;
  scheme: TrainingScheme;
  batchId: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  certificationStatus: "pending" | "certified" | "failed";
  businessLaunched: boolean;
  schemeLinked: boolean;
  loanAmount?: number;
  turnover?: number;
  employeesCreated?: number;
  marketLinked: boolean;
  riskFlag?: "none" | "low" | "medium" | "high";
  lastContactAt: string;
}

// ─── MD Command Center ───────────────────────────────────────────────────────

export interface CommandCenterMetrics {
  banking: {
    activeBCs: number;
    onboardingTAT: number;
    activeKiosks: number;
    monthlyVolume: number;
  };
  consultancy: {
    liveDPRs: number;
    liveTEVs: number;
    pipelineValue: number;
    avgDraftAge: number;
  };
  training: {
    activeBatches: number;
    totalBeneficiaries: number;
    certificationRate: number;
    businessLaunchRate: number;
  };
  network: {
    pooledProcurementSavings: number;
    whiteLabelProducts: number;
    enterpriseCohorts: number;
    linkageConversions: number;
  };
}

export interface TopBeneficiary {
  rank: number;
  id: string;
  name: string;
  district: string;
  scheme: TrainingScheme;
  turnover: number;
  repaymentHealth: "good" | "at-risk" | "npa";
  employeesCreated: number;
  marketLinked: boolean;
  growthScore: number;
}

// ─── Workflow ─────────────────────────────────────────────────────────────────

export type WorkflowType =
  | "bc-onboard"
  | "dpr-review"
  | "tev-approval"
  | "training-evidence"
  | "scheme-linkage"
  | "compliance-check";

export interface WorkflowTask {
  id: string;
  type: WorkflowType;
  title: string;
  description: string;
  assignedTo: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-progress" | "approved" | "rejected" | "escalated";
  dueDate: string;
  slaHours: number;
  hoursElapsed: number;
  createdAt: string;
  linkedEntityId?: string;
  linkedEntityType?: string;
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: "SOP" | "Policy" | "Template" | "FAQ" | "Scheme" | "Training" | "Compliance";
  tags: string[];
  division: "banking" | "consultancy" | "training" | "common";
  createdAt: string;
  updatedAt: string;
  views: number;
  author: string;
}

// ─── AI Assistants ────────────────────────────────────────────────────────────

export type AssistantType =
  | "bc-assist"
  | "dpr-copilot"
  | "tev-copilot"
  | "trainer-os"
  | "beneficiary-clone"
  | "franchise-advisor"
  | "consulting-clone"
  | "credit-prep"
  | "market-link";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface AIAssistant {
  id: AssistantType;
  name: string;
  description: string;
  division: "banking" | "consultancy" | "training" | "common";
  icon: string;
  color: string;
  capabilities: string[];
  languages: string[];
}

// ─── User / Auth ──────────────────────────────────────────────────────────────

export type UserRole =
  | "md"
  | "division-head"
  | "district-manager"
  | "field-executive"
  | "trainer"
  | "consultant"
  | "finance"
  | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  division?: "banking" | "consultancy" | "training" | "md-office";
  district?: string;
  avatar?: string;
}
