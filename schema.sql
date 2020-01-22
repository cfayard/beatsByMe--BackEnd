create table packs (
    id serial primary key,
    name text,
    contributor text
);

create table sounds (
    id serial primary key,
    name text,
    url text,
    tag text
);

create table soundpacks (
    id serial primary key,
    soundid integer references sounds(id),
    packid integer references packs(id)
);


create table users (
    id serial primary key,
    name text,
    hash text
);




