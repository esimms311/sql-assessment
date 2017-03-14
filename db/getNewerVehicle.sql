select * from Users
join Vehicles on Users.id = Vehicles.ownerId
where Vehicles.year > 2000
order by Vehicles.year desc;
