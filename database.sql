
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"city" VARCHAR(255) NOT NULL,
	"state" VARCHAR(255) NOT NULL,
	"country" VARCHAR(255) NOT NULL,
	"username" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"about_me" TEXT,
	"profile_image" TEXT,
	"banner_image" TEXT
);


CREATE TABLE "contacts" (
	"id" SERIAL PRIMARY KEY,
	"relationship" VARCHAR(50) NOT NULL,
	"user_A_id" INT REFERENCES "users",
	"user_B_id" INT REFERENCES "users",
	"pending" BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE "prompts" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"prompt" TEXT NOT NULL
);


CREATE TABLE "videos" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"prompt_id" INT REFERENCES "prompts",
	"url" TEXT NOT NULL
);



CREATE TABLE "shared_videos" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"video_id" INT REFERENCES "videos"
);



CREATE TABLE "invited_by" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"email_address" VARCHAR(255) NOT NULL,
	"video_id" INT REFERENCES "videos"
);


INSERT INTO "users" ("first_name", "last_name", "city", "state", "country", "username", "password", "about_me", "profile_image", "banner_image")
VALUES ('Jane', 'Kim', 'Minneapolis', 'MN', 'United States', 'janekim@lol.com', 1234, 'I am Jane Kim.', './images/janeKim.png', './images/flowers.jpg');