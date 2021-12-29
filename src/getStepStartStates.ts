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

  const stepStartStates: StepStartStates = {
    [IntegrationSteps.ORGANIZATIONS]: {
      disabled: false,
    },
    [IntegrationSteps.ORGANIZATION_MEMBERS]: {
      disabled: false,
    },
    [IntegrationSteps.ORGANIZATION_WORKSPACES]: {
      disabled: false,
    },
    [IntegrationSteps.WORKSPACE_RESOURCES]: {
      disabled: false,
    },
  };

  logger.info(
    { stepStartStates: JSON.stringify(stepStartStates) },
    'Step start states',
  );
  return stepStartStates;
}
