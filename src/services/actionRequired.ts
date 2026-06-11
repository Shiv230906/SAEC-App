import {
  type ApprovalCard,
  type OperationalQueue,
  type WorkflowLog,
  approvalCards,
  operationalQueues,
  workflowLogs,
} from "@/src/data/adminMockData";

export type ActionRequiredWorkspaceData = {
  approvalCards: ApprovalCard[];
  workflowLogs: WorkflowLog[];
  operationalQueues: OperationalQueue[];
};

export async function fetchActionRequiredData(): Promise<ActionRequiredWorkspaceData> {
  return {
    approvalCards: [...approvalCards],
    workflowLogs: [...workflowLogs],
    operationalQueues: [...operationalQueues],
  };
}
