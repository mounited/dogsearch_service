rs.initiate();

while (!rs.isMaster().ismaster) {
  sleep(100);
}

db.attributes.insertMany([
  {
    "name": "is_animal_there",
    "values": [
      "yes",
      "no",
    ]
  },
  {
    "name": "is_it_a_dog",
    "values": [
      "yes",
      "no",
      "undefined",
    ]
  },
  {
    "name": "is_the_owner_there",
    "values": [
      "yes",
      "no",
      "undefined",
    ]
  },
  {
    "name": "color",
    "values": [
      "dark",
      "light",
      "mixed",
      "undefined",
    ]
  },
  {
    "name": "tail",
    "values": [
      "long",
      "short",
      "absent",
      "undefined",
    ]
  },
])

db.attributes.createIndex( { "name": 1 }, { unique: true } )
