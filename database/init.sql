CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL
);

CREATE TABLE workspaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    amenities TEXT,
    rules TEXT,
    photo VARCHAR(255)
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    workspace_id INTEGER REFERENCES workspaces(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);
