import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  createMappedRelationship,
  RelationshipDirection,
} from '@jupiterone/integration-sdk-core';
import { TerraformCloudClient } from '../../tfe/client';
import { IntegrationConfig } from '../../config';
import { Entities, IntegrationSteps, Relationships } from '../constants';
import { createWorkspaceResourceEntity } from './converters';
import { cloudResourceMapping } from '../../util/cloudResourceMapping';

export async function fetchWorkspaceResources({
  instance: { config },
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const { apiKey } = config;
  const client = new TerraformCloudClient({ apiKey });

  await jobState.iterateEntities(
    { _type: Entities.WORKSPACE._type },
    async (workspaceEntity) => {
      await client.workspaces.iterateWorkspaceResources(
        workspaceEntity._key as string,
        async ({ item }) => {
          const resourceEntity = createWorkspaceResourceEntity(
            item.id,
            item.attributes,
          );
          await jobState.addEntity(resourceEntity);

          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              fromKey: workspaceEntity._key,
              toKey: resourceEntity._key,
              fromType: Entities.WORKSPACE._type,
              toType: Entities.WORKSPACE_RESOURCE._type,
            }),
          );

          const { providerType, name, _key } = resourceEntity;
          if (cloudResourceMapping.includes(providerType)) {
            await jobState.addRelationship(
              createMappedRelationship({
                _class: RelationshipClass.IS,
                _type: `tfe_workspace_resource_is_${providerType}`,
                _mapping: {
                  sourceEntityKey: _key,
                  targetFilterKeys: ['_type', 'name'],
                  relationshipDirection: RelationshipDirection.FORWARD,
                  targetEntity: {
                    _type: providerType,
                    name: name,
                  },
                },
              }),
            );
          }
        },
      );
    },
  );
}

export const workspaceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.WORKSPACE_RESOURCES,
    name: 'Fetch Workspace Resources',
    entities: [Entities.WORKSPACE_RESOURCE],
    relationships: [Relationships.WORKSPACE_HAS_RESOURCE],
    dependsOn: [IntegrationSteps.ORGANIZATION_WORKSPACES],
    executionHandler: fetchWorkspaceResources,
  },
];
