
create table packs (
    id serial primary key,
    name text,
    contributor text
);

create table sounds (
    id serial primary key,
    name text,
    packs integer references packs(id),
    url text,
    tag text
);

create table users (
    id serial primary key,
    name text,
    phone_number varchar(20),
    hash text
);

-- create table books (
--     id serial primary key,
--     title text
-- );

-- create table customers (
--     id serial primary key,
--     name text,
--     email text
-- );





-- create table usersSavedData (
--     id serial primary key,
--     name text,
--     screenData text,
--     dateSaved date
-- );

