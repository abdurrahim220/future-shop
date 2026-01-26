export type AuditChangeValue = unknown;

export interface AuditChange {
  from: AuditChangeValue;
  to: AuditChangeValue;
}

export function buildChanges(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): Record<string, AuditChange> | undefined {
  const changes: Record<string, AuditChange> = {};

  for (const key of Object.keys(after)) {
    if (before[key] !== after[key]) {
      changes[key] = {
        from: before[key],
        to: after[key],
      };
    }
  }

  return Object.keys(changes).length ? changes : undefined;
}
