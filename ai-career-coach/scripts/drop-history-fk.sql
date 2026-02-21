-- Run this once in Neon SQL Editor if historyTable was created with a foreign key
-- and inserts fail with a constraint error. This removes the FK so records can be stored
-- using Clerk email without requiring a row in users table.
--
-- To find the exact constraint name in Neon: Tables → historyTable → view DDL or run:
--   SELECT conname FROM pg_constraint c
--   JOIN pg_class t ON c.conrelid = t.oid WHERE t.relname = 'historyTable';

ALTER TABLE "historyTable"
  DROP CONSTRAINT IF EXISTS "historyTable_userEmail_users_email_fk";
