rs.initiate();

while (!rs.isMaster().ismaster) {
  sleep(100);
}

db.attributes.insertMany([
  {
    "name": "is_animal_there",
    "values": [
      "no",
      "yes",
    ]
  },
  {
    "name": "is_it_a_dog",
    "values": [
      "no",
      "yes",
    ]
  },
  {
    "name": "is_the_owner_there",
    "values": [
      "no",
      "yes",
    ]
  },
  {
    "name": "color",
    "values": [
      "undefined",
      "dark",
      "light",
      "mixed",
    ]
  },
  {
    "name": "tail",
    "values": [
      "undefined",
      "short/absent",
      "long",
    ]
  },
  {
    "name": "address",
  },
  {
    "name": "cam_id",
  }
])

db.attributes.createIndex( { "name": 1 }, { unique: true } )
