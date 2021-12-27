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
  ORGANIZATION_MEMBERS = 'fetch-organization-members',
  ORGANIZATION_OAUTH_TOKENS = 'fetch-organization-oauth-tokens',
  ORGANIZATION_WORKSPACES = 'fetch-organization-workspaces',
  WORKSPACE_RESOURCES = 'fetch-workspace-resources',
}

export const Entities: Record<
  'ORGANIZATION' | 'USER' | 'WORKSPACE' | 'WORKSPACE_RESOURCE',
  StepEntityMetadata
> = {
  ORGANIZATION: {
    _type: 'tfe_organization',
    _class: ['Account', 'Organization'],
    resourceName: 'Organization',
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
  | 'ORGANIZATION_HAS_USER'
  | 'ORGANIZATION_HAS_WORKSPACE'
  | 'WORKSPACE_HAS_RESOURCE',
  StepRelationshipMetadata
> = {
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
