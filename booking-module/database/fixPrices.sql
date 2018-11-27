ALTER TABLE listings
  ALTER COLUMN pricing SET DATA TYPE numeric(7,2),
  ALTER COLUMN cleaning_fee SET DATA TYPE numeric(7,2),
  ALTER COLUMN service_fee SET DATA TYPE numeric(7,2);
