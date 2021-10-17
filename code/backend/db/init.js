db.attributes.insertMany([
  {
    "name": "has_dog",
    "values": [
      "yes",
      "no",
    ]
  },
  {
    "name": "has_person",
    "values": [
      "yes",
      "no",
    ]
  },
  {
    "name": "dog_color",
    "values": [
      "dark",
      "light",
      "mixed"
    ]
  },
  {
    "name": "dog_tail",
    "values": [
      "long",
      "short",
      "absent"
    ]
  },
])

db.attributes.createIndex( { "name": 1 }, { unique: true } )
