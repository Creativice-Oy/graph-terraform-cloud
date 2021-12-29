import {
  IntegrationExecutionContext,
  IntegrationInstanceConfig,
  IntegrationInstanceConfigFieldMap,
  IntegrationProviderAuthenticationError,
  IntegrationValidationError,
} from '@jupiterone/integration-sdk-core';
import { TerraformCloudClient } from './tfe/client';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  apiKey: {
    type: 'string',
  },
  organizationOwner: {
    type: 'string',
  },
};

export interface IntegrationConfig extends IntegrationInstanceConfig {
  apiKey: string;
  organizationOwner: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { instance } = context;
  const { config } = instance;

  if (!config.apiKey) {
    throw new IntegrationValidationError('Config requires all of {apiKey}');
  }

  if (!config.organizationOwner) {
    throw new IntegrationValidationError(
      "Please indicate if you're an organization owner.",
    );
  }

  const client = new TerraformCloudClient({ apiKey: config.apiKey });

  try {
    await client.organizations.list();
  } catch (err) {
    throw new IntegrationProviderAuthenticationError(err.message);
  }
}
