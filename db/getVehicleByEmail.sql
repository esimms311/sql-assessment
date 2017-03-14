select * from Vehicles
join Users on Users.id = Vehicles.ownerId
where Users.email = $1;
