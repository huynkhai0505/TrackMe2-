define({ "api": [
  {
    "type": "get",
    "url": "/api/devices",
    "title": "AllDevices An array of all devices * @apiGroup Device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[ *{\n\"_id\": \"dsohsdohsdofhsofhosfhsofh\",\n     \"name\": \"Mary's iPhone\",\n     \"user\": \"mary\",\n\"sensorData\": [\n{\n  \"ts\": \"87234987813\",\n  \"temp\": \"12\",\n  \"loc\" :{\n      \"lat\": \"-23.238472\",\n      \"lon\": \"123.214124\"\n}\n},\n{\n  \"ts\": \"87234987813\",\n  \"temp\": \"12\",\n  \"loc\" :{\n      \"lat\": \"-23.238472\",\n      \"lon\": \"123.214124\"\n}\n}\n]\n}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: *{",
          "content": "\"User does not exist\" *}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "group": "/Users/khaihuynh/Documents/code/SIT209/TrackMe1/api/api.js",
    "groupTitle": "/Users/khaihuynh/Documents/code/SIT209/TrackMe1/api/api.js",
    "name": "GetApiDevices"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/generated-docs/main.js",
    "group": "/Users/khaihuynh/Documents/code/SIT209/TrackMe1/api/public/generated-docs/main.js",
    "groupTitle": "/Users/khaihuynh/Documents/code/SIT209/TrackMe1/api/public/generated-docs/main.js",
    "name": ""
  }
] });
