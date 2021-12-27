import {
  IntegrationExecutionContext,
  StepStartStates,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from './config';
import { IntegrationSteps } from './steps/constants';

export default function getStepStartStates(
  context: IntegrationExecutionContext<IntegrationConfig>,
): StepStartStates {
  const { logger } = context;
  const isOwner = context.instance.config.organizationOwner === 'TRUE';

  const stepStartStates: StepStartStates = {
    [IntegrationSteps.ORGANIZATIONS]: {
      disabled: !isOwner,
    },
    [IntegrationSteps.ORGANIZATION_MEMBERS]: {
      disabled: !isOwner,
    },
    // Viewing a workspace (individually or in a list) requires permission to read runs.[1]
    [IntegrationSteps.ORGANIZATION_WORKSPACES]: {
      disabled: !isOwner,
    },
    // To list resources the user must have permission to read resources for the specified workspace.[2]
    [IntegrationSteps.WORKSPACE_RESOURCES]: {
      disabled: !isOwner,
    },
  };

  logger.info(
    { stepStartStates: JSON.stringify(stepStartStates) },
    'Step start states',
  );
  return stepStartStates;
}

// 1: https://www.terraform.io/cloud-docs/api-docs/workspaces#workspaces-api
// 2: https://www.terraform.io/cloud-docs/api-docs/workspace-resources#permissions
