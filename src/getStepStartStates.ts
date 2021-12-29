import {
  IntegrationExecutionContext,
  StepStartStates,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from './config';
import { IntegrationSteps } from './steps/constants';
import { TerraformCloudClient } from './tfe/client';

export default async function getStepStartStates(
  context: IntegrationExecutionContext<IntegrationConfig>,
): Promise<StepStartStates> {
  const { logger, instance } = context;
  const client = new TerraformCloudClient({ apiKey: instance.config.apiKey });

  const entitlementSet =
    await client.organizations.iterateOrganizationEntitlementSet(
      instance.config.organizationName,
    );

  // If team management is not enabled, all users are owners
  const enableAll = !entitlementSet.teams;

  const stepStartStates: StepStartStates = {
    [IntegrationSteps.ORGANIZATIONS]: {
      disabled: false,
    },
    [IntegrationSteps.ORGANIZATION_MEMBERS]: {
      disabled: false,
    },
    [IntegrationSteps.ORGANIZATION_WORKSPACES]: {
      disabled: !enableAll,
    },
    [IntegrationSteps.WORKSPACE_RESOURCES]: {
      disabled: !enableAll,
    },
  };

  logger.info(
    { stepStartStates: JSON.stringify(stepStartStates) },
    'Step start states',
  );
  return stepStartStates;
}
