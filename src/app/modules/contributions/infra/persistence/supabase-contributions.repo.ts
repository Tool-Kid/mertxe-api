import { ContributionsRepository } from '../../domain/contributions.repo';
import { Contribution } from '../../domain/contribution';
import { ISupabaseRepository, SupabaseRepository } from '@common/supabase';

@SupabaseRepository({
  table: 'Contributions',
  entity: Contribution,
})
export class SupabaseContributionsRepository
  extends ISupabaseRepository<Contribution>
  implements ContributionsRepository
{
  async getContributions(): Promise<Contribution[]> {
    return await this.findAll();
  }

  async addContribution(
    contribution: Partial<Contribution>
  ): Promise<Partial<Contribution>> {
    const added = await this.create(contribution);
    return added;
  }
}
