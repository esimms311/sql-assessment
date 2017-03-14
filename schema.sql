create table Users (
  id serial primary key,
  firstname text,
  lastname text,
  email text
);
insert into Users
  (firstname, lastname, email)
  values('John', 'Smith', 'john@smith.com'),
        ('Dave', 'Davis', 'dave@davis.com'),
        ('Jane', 'Janis', 'jane@janis.com');

create table Vehicles (
  id serial primary key,
  make text,
  model text,
  year int,
  ownerId int references Users
);

insert into Vehicles
  (make, model, year, ownerId)
  values('Toyota', 'Camry', '1991', 1),
        ('Honda', 'Civic', '1995', 1),
        ('Ford', 'Focus', '2005', 1),
        ('Ford', 'Taurus', '2003', 2),
        ('VW', 'Bug', '2010', 2),
        ('Mini', 'Cooper', '2013', 3);
