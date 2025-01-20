import { ContributionsRepository } from '../../domain/contributions.repo';
import { Contribution } from '../../domain/contribution';
import {
  ISupabaseRepository,
  Repository,
} from '@common/persistence/infra/supabase';

@Repository({
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

  async getContributionById(id: number): Promise<Contribution> {
    const contribution = await this.findOne({ filters: [['id', 'is', id]] });
    return contribution;
  }

  async addContribution(
    contribution: Partial<Contribution>
  ): Promise<Partial<Contribution>> {
    const added = await this.create(contribution);
    return added;
  }

  async update(contribution: Contribution): Promise<Contribution> {
    const updated = await this.update(contribution);
    return updated;
  }
}
