import * as migration_20251013_191129_migration from './20251013_191129_migration';

export const migrations = [
  {
    up: migration_20251013_191129_migration.up,
    down: migration_20251013_191129_migration.down,
    name: '20251013_191129_migration'
  },
];
