update Vehicles
  set ownerId = $2
  where Vehicles.id = $1;
