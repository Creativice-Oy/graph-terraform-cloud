import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import {
  instanceConfigFields,
  IntegrationConfig,
  validateInvocation,
} from './config';
import { organizationSteps } from './steps/organization';
import { workspaceSteps } from './steps/workspace';
import getStepStartStates from './getStepStartStates';

export const invocationConfig: IntegrationInvocationConfig<IntegrationConfig> =
  {
    instanceConfigFields,
    validateInvocation,
    getStepStartStates,
    integrationSteps: [...organizationSteps, ...workspaceSteps],
  };
