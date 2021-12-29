import { FetchError } from 'node-fetch';

interface OnRequestRetryParams {
  url: string;
  err: FetchError;
  attemptNum: number;
  attemptsRemaining: number;
  code?: string;
}

export type OnRequestRetryFunction = (params: OnRequestRetryParams) => void;

export interface CreateTerraformCloudClientParams {
  apiKey: string;
  requestTimeout?: number;
  onRequestRetry?: OnRequestRetryFunction;
}

export type AuthPolicy = 'password' | 'two_factor_mandatory';

export interface Organization {
  externalId: string;
  createdAt: string;
  email: string;
  sessionTimeout?: number;
  sessionRemember?: number;
  collaboratorAuthPolicy: AuthPolicy;
  planExpired: boolean;
  planExpiresAt?: string;
  planIsTrial: boolean;
  planIsEnterprise: boolean;
  costEstimationEnabled: boolean;
  name: string;
  permissions: Permissions;
  fairRunQueuingEnabled: boolean;
  samlEnabled: boolean;
  ownersTeamSamlRoleId?: null;
  twoFactorConformant: boolean;
}

export interface OrganizationWorkspace {
  actions?: {
    isDestroyable: boolean;
  };
  allowDestroyPlan: boolean;
  applyDurationAverage: number;
  autoApply: boolean;
  autoDestroyAt?: string;
  createdAt: string;
  executionMode: string;
  description: string;
  environment: string;
  fileTriggersEnabled: boolean;
  globalRemoteState: boolean;
  latestChangeAt: string;
  locked: boolean;
  name: string;
  operations: boolean;
  permissions: Permissions;
  planDurationAverage: number;
  policyCheckFailures: number;
  queueAllRuns: boolean;
  resourceCount: number;
  runFailures: number;
  source: string;
  sourceName: string;
  sourceUrl: string;
  speculativeEnabled: boolean;
  structuredRunOutputEnabled: boolean;
  terraformVersion: string;
  triggerPrefixes: string[];
  updatedAt: string;
  vcsRepo?: {
    branch: string;
    displayIdentifier: string;
    identifier: string;
    ingressSubmodules: boolean;
    oauthTokenId: string;
    repositoryHttpUrl: string;
    serviceProvider: string;
    webhookUrl: string;
  };
  vcsRepoIdentifier: string;
  workingDirectory: string;
  workspaceKpisRunsCount: number;
}

export interface Permissions {
  canUpdate: boolean;
  canDestroy: boolean;
  canAccessViaTeams: boolean;
  canCreateModule: boolean;
  canCreateTeam: boolean;
  canCreateWorkspace: boolean;
  canManageUsers: boolean;
  canManageSubscription: boolean;
  canManageSso: boolean;
  canUpdateOauth: boolean;
  canUpdateSentinel: boolean;
  canUpdateSshKeys: boolean;
  canUpdateApiToken: boolean;
  canTraverse: boolean;
  canStartTrial: boolean;
  canUpdateAgentPools: boolean;
  canManageTags: boolean;
  canManagePublicModules: boolean;
  canManagePublicProviders: boolean;
  canCreateProvider: boolean;
}

export type OrganizationMembershipStatus = 'active' | 'invited';

export interface OrganizationMembership {
  status: OrganizationMembershipStatus;
  email: string;
  createdAt: string;
}

/**
 * https://www.terraform.io/docs/cloud/api/organizations.html#request-body
 */
export interface CreateOrganizationRequestBodyAttributes {
  name: string;
  email: string;
  sessionTimeout?: number;
  sessionRemember?: number;
  collaboratorAuthPolicy: AuthPolicy;
  costEstimationEnabled?: boolean;
  ownersTeamSamlRoleId?: string;
}

export interface User {
  username: string;
  isServiceAccount: boolean;
  avatarUrl: string;
  twoFactor: {
    enabled: boolean;
    verified: boolean;
  };
  email?: string;
  permissions: Permissions;
}

export interface WorkspaceResource {
  address: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  module: string;
  provider: string;
  providerType: string;
  modifiedByStateVersionId: string;
}
