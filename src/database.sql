CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    alt TEXT NOT NULL,
    url TEXT NOT NULL,
    hoverBackground BOOLEAN DEFAULT FALSE
);

CREATE TABLE content_table (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    thumbnail TEXT,
    description TEXT,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE call_to_action_table (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    url TEXT NOT NULL,
    content_id INTEGER REFERENCES content_table(id) ON DELETE CASCADE
);
