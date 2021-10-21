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
      "undefined",
    ]
  },
  {
    "name": "is_the_owner_there",
    "values": [
      "no",
      "yes",
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
