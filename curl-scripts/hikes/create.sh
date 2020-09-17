#!/bin/bash

API="http://localhost:4741"
URL_PATH="/hikes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "hike": {
      "date": "'"${DATE}"'",
      "trails": "'"${TRAIL}"'",
      "distance": "'"${DISTANCE}"'",
      "elevation": "'"${ELEVATION}"'",
      "timeTaken": "'"${TIMETAKEN}"'",
      "mountainsClimbed": "'"${MOUNTAIN}"'",
      "trailNotes": "'"${NOTES}"'",
      "hikedWith": "'"${WITH}"'"
    }
  }'

echo
