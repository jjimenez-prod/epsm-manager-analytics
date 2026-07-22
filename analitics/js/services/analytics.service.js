import {
  rpcGetDashboardSummary,
  rpcGetDashboardInsights,
  rpcGetOperatorPerformance,
  rpcGetProductionSummary,
  rpcGetProductionDetail
} from './rpc.service.js';

/**
 * Service: Analytics
 * Responsibility: Provides the Analytics domain communication interface.
 * Owns: Delegating Analytics domain requests to the RPC service.
 * Does not own: RPC naming, Supabase communication, data transformation, or business logic.
 */
export async function getDashboardSummary(filters) {
  return rpcGetDashboardSummary(filters);
}

export async function getDashboardInsights(filters) {
  return rpcGetDashboardInsights(filters);
}

export async function getOperatorPerformance(filters) {
  return rpcGetOperatorPerformance(filters);
}

export async function getProductionSummary(filters) {
  return rpcGetProductionSummary(filters);
}

export async function getProductionDetail(filters) {
  return rpcGetProductionDetail(filters);
}
