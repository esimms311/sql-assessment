update Vehicles
  set ownerId = null
  where ownerId = $1 and id = $2;
