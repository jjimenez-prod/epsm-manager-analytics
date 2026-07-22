import { executeRpc } from './supabase.service.js';

/**
 * Service: RPC
 * Responsibility: Translates Analytics domain requests into Supabase RPC requests.
 * Owns: The RPC service boundary and delegation to the Supabase service.
 * Does not own: Final RPC names, Supabase client communication, data transformation, or business logic.
 */
export async function rpcGetDashboardSummary(filters) {
  // TODO: Replace this placeholder with the approved dashboard summary RPC name.
  return executeRpc('TODO_RPC_GET_DASHBOARD_SUMMARY', filters);
}

export async function rpcGetDashboardInsights(filters) {
  // TODO: Replace this placeholder with the approved dashboard insights RPC name.
  return executeRpc('TODO_RPC_GET_DASHBOARD_INSIGHTS', filters);
}

export async function rpcGetOperatorPerformance(filters) {
  // TODO: Replace this placeholder with the approved operator performance RPC name.
  return executeRpc('TODO_RPC_GET_OPERATOR_PERFORMANCE', filters);
}

export async function rpcGetProductionSummary(filters) {
  // TODO: Replace this placeholder with the approved production summary RPC name.
  return executeRpc('TODO_RPC_GET_PRODUCTION_SUMMARY', filters);
}

export async function rpcGetProductionDetail(filters) {
  // TODO: Replace this placeholder with the approved production detail RPC name.
  return executeRpc('TODO_RPC_GET_PRODUCTION_DETAIL', filters);
}
