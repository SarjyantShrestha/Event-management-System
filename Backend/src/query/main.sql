---------------------MAIN QUERY--------------------------------------------------
-- CREATE TABLE "Events"(
--     "event_id" SERIAL PRIMARY KEY NOT NULL,
--     "name" VARCHAR(255) NOT NULL,
--     "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
--     "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE "Slots"(
--     "slot_id" SERIAL PRIMARY KEY NOT NULL,
--     "day_id" INTEGER NOT NULL,
--     "slot_time" TIME(0) WITHOUT TIME ZONE NOT NULL
-- );
--
-- CREATE TABLE "Users"(
--     "user_id" SERIAL PRIMARY KEY NOT NULL,
--     "firstname" VARCHAR(50) NOT NULL,
--     "lastname" VARCHAR(50) NOT NULL,
--     "email" VARCHAR(100) UNIQUE NOT NULL,
--     "password" VARCHAR(255) NOT NULL,
--     "role" VARCHAR(20) DEFAULT 'user' NOT NULL
--     "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
--     "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE "Venues"(
--     "venue_id" SERIAL PRIMARY KEY,
--     "venue_name" VARCHAR(100) NOT NULL,
--     "location" VARCHAR(255) NOT NULL,
--     "capacity" INTEGER NOT NULL
-- );
--
-- CREATE TABLE "Days"(
--     "day_id" SERIAL PRIMARY KEY NOT NULL,
--     "event_id" INTEGER NOT NULL,
--     "date" DATE NOT NULL
-- );
--
-- CREATE TABLE "EventBookings"(
--     "venue_id" INTEGER NOT NULL,
--     "event_id" INTEGER NOT NULL,
--     "user_id" INTEGER NOT NULL,
--     "slot_id" BIGINT NOT NULL,
--     "status" VARCHAR(255) CHECK
--         (
--             "status" IN('pending', 'booked', 'available')
--         ) NOT NULL,
--     PRIMARY KEY ("venue_id", "event_id", "user_id", "slot_id")
-- );
--
-- ALTER TABLE "EventBookings" ADD CONSTRAINT "eventbookings_event_fk"
--     FOREIGN KEY("event_id") REFERENCES "Events"("event_id");
--
-- ALTER TABLE "EventBookings" ADD CONSTRAINT "eventbookings_venue_fk"
--     FOREIGN KEY("venue_id") REFERENCES "Venues"("venue_id");
--
-- ALTER TABLE "EventBookings" ADD CONSTRAINT "eventbookings_user_fk"
--     FOREIGN KEY("user_id") REFERENCES "Users"("user_id");
--
-- -- Other tables reference EventBookings through their foreign keys to the appropriate columns
-- ALTER TABLE "Days" ADD CONSTRAINT "days_event_id_foreign"
--     FOREIGN KEY("event_id") REFERENCES "Events"("event_id");
--
-- ALTER TABLE "Slots" ADD CONSTRAINT "slots_day_id_foreign"
--     FOREIGN KEY("day_id") REFERENCES "Days"("day_id");
--
-- ALTER TABLE "EventBookings" ADD CONSTRAINT "eventbookings_slots_foreign"
-- FOREIGN KEY("slot_id")
-- REFERENCES "Slots"("slot_id");


----------------------CREATE THIS FUNCTION FIRST THEN EXECUTE FOR REQUIRED TABLES--------
-- CREATE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = CURRENT_TIMESTAMP;
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER set_updated_at
-- BEFORE UPDATE ON "Users"
-- FOR EACH ROW
-- EXECUTE FUNCTION update_updated_at_column();
--
-- CREATE TRIGGER set_updated_at
-- BEFORE UPDATE ON "Events"
-- FOR EACH ROW
-- EXECUTE FUNCTION update_updated_at_column();

----------------------SET ADMIN FOR USERS-------------------------------------
-- UPDATE "Users"
-- SET role = 'admin'
-- WHERE email = 'sarjyant@gmail.com';
