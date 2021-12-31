import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const ACCOUNT_ENTITY_KEY = 'ACCOUNT_ENTITY';
export const ACCOUNT_DATA_KEY = 'ACCOUNT_DATA';
export const MAC_OS_CONFIGURATION_DETAILS_BY_ID_KEY =
  'MAC_OS_CONFIGURATION_DETAILS_BY_ID';

export enum IntegrationSteps {
  ORGANIZATIONS = 'fetch-organizations',
  ORGANIZATION_ENTITLEMENT_SET = 'fetch-organization-entitlement-set',
  ORGANIZATION_MEMBERS = 'fetch-organization-members',
  ORGANIZATION_OAUTH_TOKENS = 'fetch-organization-oauth-tokens',
  ORGANIZATION_WORKSPACES = 'fetch-organization-workspaces',
  ORGANIZATION_TEAMS = 'fetch-organization-teams',
  WORKSPACE_RESOURCES = 'fetch-workspace-resources',
}

export const Entities: Record<
  | 'ENTITLEMENT_SET'
  | 'ORGANIZATION'
  | 'TEAM'
  | 'USER'
  | 'WORKSPACE'
  | 'WORKSPACE_RESOURCE',
  StepEntityMetadata
> = {
  ENTITLEMENT_SET: {
    _type: 'tfe_entitlement_set',
    _class: ['Entity'],
    resourceName: 'Entitlement Set',
  },
  ORGANIZATION: {
    _type: 'tfe_organization',
    _class: ['Account', 'Organization'],
    resourceName: 'Organization',
  },
  TEAM: {
    _type: 'tfe_team',
    _class: ['Team'],
    resourceName: 'Team',
  },
  USER: {
    _type: 'tfe_user',
    _class: ['User'],
    resourceName: 'User',
  },
  WORKSPACE: {
    _type: 'tfe_workspace',
    _class: ['Project'],
    resourceName: 'Workspace',
  },
  WORKSPACE_RESOURCE: {
    _type: 'tfe_workspace_resource',
    _class: ['Resource'],
    resourceName: 'Resource',
  },
};

export const Relationships: Record<
  | 'ORGANIZATION_HAS_ENTITLEMENT_SET'
  | 'ORGANIZATION_HAS_TEAM'
  | 'ORGANIZATION_HAS_USER'
  | 'ORGANIZATION_HAS_WORKSPACE'
  | 'WORKSPACE_HAS_RESOURCE',
  StepRelationshipMetadata
> = {
  ORGANIZATION_HAS_ENTITLEMENT_SET: {
    _type: 'tfe_organization_has_entitlement_set',
    _class: RelationshipClass.HAS,
    sourceType: Entities.ORGANIZATION._type,
    targetType: Entities.ENTITLEMENT_SET._type,
  },
  ORGANIZATION_HAS_TEAM: {
    _type: 'tfe_organization_has_team',
    _class: RelationshipClass.HAS,
    sourceType: Entities.ORGANIZATION._type,
    targetType: Entities.TEAM._type,
  },
  ORGANIZATION_HAS_USER: {
    _type: 'tfe_organization_has_user',
    _class: RelationshipClass.HAS,
    sourceType: Entities.ORGANIZATION._type,
    targetType: Entities.USER._type,
  },
  ORGANIZATION_HAS_WORKSPACE: {
    _type: 'tfe_organization_has_workspace',
    _class: RelationshipClass.HAS,
    sourceType: Entities.ORGANIZATION._type,
    targetType: Entities.WORKSPACE._type,
  },
  WORKSPACE_HAS_RESOURCE: {
    _type: 'tfe_workspace_has_resource',
    _class: RelationshipClass.HAS,
    sourceType: Entities.WORKSPACE._type,
    targetType: Entities.WORKSPACE_RESOURCE._type,
  },
};
