import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType =
  | "active" | "inactive" | "pending" | "approved" | "rejected"
  | "in-review" | "completed" | "at-risk" | "critical" | "new"
  | "onboarded" | "suspended" | "lead" | "screening" | "document"
  | "interview" | "draft" | "revision" | "submitted" | "finalized"
  | "data-collection" | "analysis" | "initiated" | "ongoing"
  | "upcoming" | "cancelled" | "good" | "npa" | "in-progress"
  | "escalated" | "certified" | "failed" | "review";

const statusConfig: Record<StatusType, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" | "purple" | "secondary" }> = {
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "danger" },
  pending: { label: "Pending", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
  "in-review": { label: "In Review", variant: "info" },
  completed: { label: "Completed", variant: "success" },
  "at-risk": { label: "At Risk", variant: "warning" },
  critical: { label: "Critical", variant: "danger" },
  new: { label: "New", variant: "info" },
  onboarded: { label: "Onboarded", variant: "success" },
  suspended: { label: "Suspended", variant: "danger" },
  lead: { label: "Lead", variant: "secondary" },
  screening: { label: "Screening", variant: "info" },
  document: { label: "Docs Pending", variant: "warning" },
  interview: { label: "Interview", variant: "info" },
  draft: { label: "Draft", variant: "secondary" },
  revision: { label: "Revision", variant: "warning" },
  submitted: { label: "Submitted", variant: "info" },
  finalized: { label: "Finalized", variant: "success" },
  "data-collection": { label: "Data Collection", variant: "info" },
  analysis: { label: "Analysis", variant: "purple" },
  initiated: { label: "Initiated", variant: "secondary" },
  ongoing: { label: "Ongoing", variant: "info" },
  upcoming: { label: "Upcoming", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "danger" },
  good: { label: "Good", variant: "success" },
  npa: { label: "NPA", variant: "danger" },
  "in-progress": { label: "In Progress", variant: "info" },
  escalated: { label: "Escalated", variant: "danger" },
  certified: { label: "Certified", variant: "success" },
  failed: { label: "Failed", variant: "danger" },
  review: { label: "Review", variant: "info" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, variant: "default" as const };
  return (
    <Badge variant={config.variant as any} className={cn("capitalize", className)}>
      {config.label}
    </Badge>
  );
}
