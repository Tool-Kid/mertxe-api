class ScoringRecordEntry {
  createdAt: string;
  amount: number;
  reason: string;
}

export class GetScoringRecordsResponse {
  entries: ScoringRecordEntry[];
}
