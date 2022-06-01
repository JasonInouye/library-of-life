
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"city" VARCHAR(255) NOT NULL,
	"state" VARCHAR(255),
	"country" VARCHAR(255) NOT NULL,
	"username" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"about_me" TEXT,
	"profile_image" TEXT,
	"banner_image" TEXT
);

--DROP TABLE "connections";

CREATE TABLE "connections" (
	"id" SERIAL PRIMARY KEY,
	"relationship" VARCHAR(50) NOT NULL,
	"user_A_id" INT REFERENCES "users",
	"user_B_id" INT REFERENCES "users",
	"pending" BOOLEAN NOT NULL DEFAULT TRUE,
	UNIQUE ("user_A_id", "user_B_id")
);

--DROP TABLE "prompts";

CREATE TABLE "prompts" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"prompt" TEXT NOT NULL
);

--DROP TABLE "videos";


CREATE TABLE "videos" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"prompt_id" INT REFERENCES "prompts",
	"url" TEXT NOT NULL,
	"permissions" VARCHAR(50)
);

--DROP TABLE "shared_videos";

CREATE TABLE "shared_videos" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"video_id" INT REFERENCES "videos",
	UNIQUE ("user_id", "video_id")
);

--DROP TABLE "invited_by";


CREATE TABLE "invited_by" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"email_address" VARCHAR(255) NOT NULL,
	"video_id" INT REFERENCES "videos"
);



INSERT INTO "prompts" ("prompt")
VALUES ('If the whole world was listening, what would you say?'),
('What do you most want your children (or future children) to learn from you?'),
('What is your favorite thing about yourself?'),
('Which three words describe you best?'), 
('What challenge have you overcome in your life?'), 
('What is your favorite memory?'),
('If you could have dinner with anyone – dead or alive – 
who would it be and what would you ask them?'), 
('If someone else described you, what do you think they would say?'), 
('Who do you look up to?'), 
('How do you show compassion to others? How can you extend that same compassion to yourself?');