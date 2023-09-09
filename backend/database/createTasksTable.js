export const sqlCreateTasksTable =
  "-- Creating `tasks` table  \n" +
  "CREATE TABLE IF NOT EXISTS `tasks` (\n" +
  "  `id` BINARY(16) NOT NULL PRIMARY KEY ,\n" + // DEFAULT UNHEX(REPLACE(UUID(),'-',''))
  "  `title` VARCHAR(128) NOT NULL,\n" +
  "  `description` VARCHAR(256),\n" +
  "  `done` BOOLEAN NOT NULL DEFAULT 0,\n" +
  "  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n" +
  "  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n" +
  ");";
