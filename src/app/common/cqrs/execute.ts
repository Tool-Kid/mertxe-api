import { typedAsync } from '@common/utils';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

interface ExecuteParams {
  bus: CommandBus | QueryBus;
  payload: any;
}

export async function execute<ExecutionResult>(
  params: ExecuteParams
): Promise<ExecutionResult> {
  const bus = params.bus as QueryBus;
  const result = await typedAsync<ExecutionResult>(bus.execute(params.payload));
  return result;
}
