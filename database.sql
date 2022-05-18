
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "videos" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"prompt_id" INT NOT NULL,
	"url" TEXT NOT NULL
);



CREATE TABLE "contacts" (
	"id" SERIAL PRIMARY KEY,
	"relationship" VARCHAR(50) NOT NULL,
	"user_A_id" INT NOT NULL,
	"user_B_id" INT NOT NULL,
	"pending" BOOLEAN NOT NULL DEFAULT TRUE
);



CREATE TABLE "shared_videos" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"video_id" INT NOT NULL
);



CREATE TABLE "prompts" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"prompt" TEXT NOT NULL
);



CREATE TABLE "invited_by" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"username" VARCHAR(255) NOT NULL,
	"video_id" INT NOT NULL
);



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
	"profile_image" TEXT NOT NULL,
	"banner_image" TEXT NOT NULL
);

INSERT INTO "users" ("first_name", "last_name", "city", "state", "country", "username", "password", "about_me", "profile_image", "banner_image")
VALUES ('Jane', 'Kim', 'Minneapolis', 'MN', 'United States', 'janekim@lol.com', 1234, 'I am Jane Kim.', './images/janeKim.png', './images/flowers.jpg');

INSERT INTO "videos" ("user_id", "prompt_id", "url")
VALUES 
(1,1,'https://d2qw0j2prooaok.cloudfront.net/1118756.mp4'),
(1,2,'https://d2qw0j2prooaok.cloudfront.net/1315907.mp4'),
(1,3,'https://d2qw0j2prooaok.cloudfront.net/1336144.mp4'),
(1,4,'https://d2qw0j2prooaok.cloudfront.net/1780209.mp4'),
(1,1,'https://d2qw0j2prooaok.cloudfront.net/2655535.mp4'),
(1,2,'https://d2qw0j2prooaok.cloudfront.net/2696979.mp4'),
(1,3,'https://d2qw0j2prooaok.cloudfront.net/3182315.mp4'),
(1,4,'https://d2qw0j2prooaok.cloudfront.net/3492195.mp4'),
(1,1,'https://d2qw0j2prooaok.cloudfront.net/4054498.mp4'),
(1,2,'https://d2qw0j2prooaok.cloudfront.net/4273448.mp4'),
(1,3,'https://d2qw0j2prooaok.cloudfront.net/4462639.mp4'),
(1,4,'https://d2qw0j2prooaok.cloudfront.net/610206.mp4'),
(1,1,'https://d2qw0j2prooaok.cloudfront.net/6223778.mp4'),
(1,2,'https://d2qw0j2prooaok.cloudfront.net/662434.mp4'),
(1,3,'https://d2qw0j2prooaok.cloudfront.net/7042344.mp4'),
(1,4,'https://d2qw0j2prooaok.cloudfront.net/8228153.mp4'),
(1,1,'https://d2qw0j2prooaok.cloudfront.net/myboat_video.mp4')
;