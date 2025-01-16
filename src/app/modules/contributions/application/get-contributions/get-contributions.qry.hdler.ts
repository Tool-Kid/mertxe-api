import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetContributionsQry } from './get-contributions.qry';
import { ContributionsRepository } from '../../domain/contributions.repo';
import { Contribution } from '../../domain/contribution';

export interface GetContributionsQryResponse {
  entries: Contribution[];
}

@QueryHandler(GetContributionsQry)
export class GetContributionsQryHdler
  implements IQueryHandler<GetContributionsQry, GetContributionsQryResponse>
{
  constructor(
    private readonly contributionsRepository: ContributionsRepository
  ) {}

  async execute(
    query: GetContributionsQry
  ): Promise<GetContributionsQryResponse> {
    const contributions = await this.contributionsRepository.getContributions();
    return {
      entries: contributions,
    };
  }
}
