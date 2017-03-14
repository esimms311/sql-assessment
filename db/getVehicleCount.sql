select Count(*) from Users
join Vehicles on Users.id = Vehicles.ownerId
where Users.id = $1;
