import json  # will let us print out the response in a prettier format
import requests  # necessary to make API calls
import datetime

# configure API session parameters

# user_agent helps identify the request if there is an issue and is best practice
REQUEST_LABEL = 'Outreachy 25 Toolhub Microtask'

# NOTE: it's considered best practice to include contact info in user agents
USER_INFO = 'Phabricator user: NicoleLBee'

headers = {'User-Agent': f'{REQUEST_LABEL} - {USER_INFO}'}

TOOLS_API_ENDPOINT = "https://toolhub.wikimedia.org/api/tools"
# toolname = "pywikibot"
# url = f'{TOOLS_API_ENDPOINT}/{toolname}/'


# response = requests.get(url, headers=headers)
# if response.status_code == 200:
#    json_formatted_response = json.dumps(response.json(), indent=2)
#    print(json_formatted_response)
# else:
#    print(response.status_code)


# TODO: Write a function that takes a tool name,
# and returns all the missing fields as a list.

# I'm making use of the variable declarations and imports found in the sample code block.

def list_missing_fields(target):
    url = f'{TOOLS_API_ENDPOINT}/{target}/'
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        api_response = response.json()
        empty_fields = []
        for key in api_response["annotations"]:
            # If the tool has not been deprecated, then the absence of a value for "replaced_by" is irrelevant
            if key == "replaced_by" and (api_response["deprecated"] == False or api_response["annotations"]["deprecated"] == False):
                 continue
            # Although the following lines are unwieldy, it was specified that a piece of information is missing only if it is absent in both the Core and Annotations layers, and therefore I need to check both sources.
            # This only works if the key exists in both places, so I check for that first.
            elif (key in api_response):
                    if (api_response[key] == [] or api_response[key] == None) and (api_response["annotations"][key] == [] or api_response["annotations"][key] == None):
                        empty_fields.append(key)
            elif api_response["annotations"][key] == [] or api_response["annotations"][key] == None:
                empty_fields.append(key)
        return empty_fields
    else:
        print(response.status_code)

  
#   **TESTING TASK 1**:  

# Examining the output of the fetch request in the example code block, I can see that, within the "annotations" dict of pywikibot, the following fields have no value:

# wikidata_quid
# replaced_by
# for_wikis
# icon
# tool_type
# repository
# api_url
# user_docs_url
# feedback_url
# privacy_policy_url
# translate_url
# bug_tracker_url

# However, most of these have values contained within the Core tool info.  If I eliminate the ones that are assigned values in the Core tool info, and eliminate "replaced_by" (since the tool is not deprecated, the absence of a value here is expected), I'm left with the following:
# wikidata_qid,
# api_url,
# feedback_url,
# privacy_policy_url

# So I would expect that calling `list_missing_fields("pywikibot")` would return the following list: `['wikidata_quid', 'api_url', 'feedback_url', 'privacy_policy_url']`

list_missing_fields("pywikibot")




# Task Set 2

# TODO: Write a function that returns a dict where the keys are tool names, and the values are tuples:
# {<tool name>: (<number of missing fields>, <days since the tool was last edited>)}.

# Make a request to the /api/tools endpoint, gather the values from the "results" dict: for each entry, "name"  and "modified_date" (OR "created_date", if it's never been modified
# Run it through a modified version of the the function that I wrote above and return the length of the dict to fill the <number of missing fields> bit
# Push all of that info to an entry in the dict.

# First I will rewrite the above function to serve as a callback function.  This time it will only return the length of the list, e.g. the number of empty fields.

def countMissingEntries(entry):
    empty_fields = []
    for key in entry["annotations"]:
        if key == "replaced_by" and (entry["deprecated"] == False or entry["annotations"]["deprecated"] == False):
            continue
        elif (key in entry):
            if (entry[key] == [] or entry[key] == None) and (entry["annotations"][key] == [] or entry["annotations"][key] == None):
                        empty_fields.append(key)
        elif entry["annotations"][key] == [] or entry["annotations"][key] == None:
             empty_fields.append(key)
    return len(empty_fields)
    
# The value of the "modified_date" and "created_date" fields does not appear to be in iso format, or at least datetime.date.fromisoformat doesn't want to recognize it
# What a bummer!  So I'll write a function to make a proper date out of the value.  I only need the year, month and day.

def parseDate(date):
    slice_point = date.index('T')
    year, month, day = date[0:slice_point].split('-')
    return datetime.date(int(year), int(month), int(day))

# I'll write another function to calculate the number of days elapsed between the current date and the value of the "modified_date" field

def calculateDaysElapsed(entry_date): 
    current_date = datetime.date.today()
    past_date = parseDate(entry_date)
    return (current_date - past_date).days

# Then I will write a cut-down version of the function to ensure that it will produce the results that I want using a test data set and those functions I just wrote.

def listToolsTest(target):
    tool_entries = {}
    data_set = target["results"]
    for entry in data_set:
        # I want to calculate days elapsed based on the value of "modified_date" if it exists and the value of "created_date" if it does not.
        date = entry["modified_date"] or entry["created_date"]
        tool_entries[entry["name"]] = (countMissingEntries(entry), calculateDaysElapsed(date))
    return tool_entries


#     Testing the function¶

# I'll test the core functionality by taking information from the following dict, which is structured in the same way as the result of an actual fetch request to the /api/tools endpoint, and contains the data from "mm_wikidata_todo" and "pywikibot" plus a modified dataset that contains no modified date.

mock_data = {
    "count": 2702,
    "next": "https://toolhub.wikimedia.org/api/search/tools/?page=2",
    "previous": None,
    "results": [
{
      "name": "mm_wikidata_todo",
      "title": "Wikidata Todo",
      "description": "Shows you little things you can do on Wikidata.",
      "url": "http://tools.wmflabs.org/wikidata-todo",
      "keywords": [
        "wikidata",
        "task"
      ],
      "author": [
        {
          "name": "Magnus Manske"
        }
      ],
      "repository": "https://bitbucket.org/magnusmanske/wikidata-todo",
      "subtitle": None,
      "openhub_id": None,
      "url_alternates": [],
      "bot_username": None,
      "deprecated": False,
      "replaced_by": None,
      "experimental": False,
      "for_wikis": [],
      "icon": None,
      "license": None,
      "sponsor": [],
      "available_ui_languages": [],
      "technology_used": [],
      "tool_type": None,
      "api_url": None,
      "developer_docs_url": [],
      "user_docs_url": [],
      "feedback_url": [],
      "privacy_policy_url": [],
      "translate_url": None,
      "bugtracker_url": None,
      "annotations": {
        "wikidata_qid": None,
        "deprecated": False,
        "replaced_by": None,
        "experimental": False,
        "for_wikis": [],
        "icon": None,
        "available_ui_languages": [
          "en"
        ],
        "tool_type": "web app",
        "repository": "https://bitbucket.org/magnusmanske/wikidata-todo/src/master/",
        "api_url": None,
        "developer_docs_url": [
          {
            "url": "https://toolhub.mediawiki.com",
            "language": "en"
          }
        ],
        "user_docs_url": [],
        "feedback_url": [],
        "privacy_policy_url": [],
        "translate_url": None,
        "bugtracker_url": "https://bitbucket.org/magnusmanske/wikidata-todo/issues?status=new&status=open"
      },
      "_schema": None,
      "_language": "en",
      "origin": "crawler",
      "created_by": {
        "id": 9,
        "username": "Toolhub"
      },
      "created_date": "2021-10-10T21:04:18.627185Z",
      "modified_by": {
        "id": 428,
        "username": "Sabina.zaripova"
      },
      "modified_date": "2022-10-16T10:02:45.287384Z"
    },
        
    {
  "name": "pywikibot",
  "title": "Pywikibot",
  "description": "Python library and collection of scripts that automate work on MediaWiki sites",
  "url": "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot",
  "keywords": [],
  "author": [
    {
      "name": "Pywikibot team"
    }
  ],
  "repository": "https://gerrit.wikimedia.org/g/pywikibot/core",
  "subtitle": None,
  "openhub_id": None,
  "url_alternates": [],
  "bot_username": None,
  "deprecated": False,
  "replaced_by": None,
  "experimental": False,
  "for_wikis": [
    "*"
  ],
  "icon": "https://commons.wikimedia.org/wiki/File:Pywikibot_MW_gear_icon.svg",
  "license": "MIT",
  "sponsor": [],
  "available_ui_languages": [],
  "technology_used": [
    "python"
  ],
  "tool_type": "coding framework",
  "api_url": None,
  "developer_docs_url": [
    {
      "url": "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot/Development",
      "language": "en"
    }
  ],
  "user_docs_url": [
    {
      "language": "en",
      "url": "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot"
    },
    {
      "url": "https://doc.wikimedia.org/pywikibot/",
      "language": "en"
    }
  ],
  "feedback_url": [],
  "privacy_policy_url": [],
  "translate_url": "https://translatewiki.net/wiki/Translating:Pywikibot",
  "bugtracker_url": "https://phabricator.wikimedia.org/tag/pywikibot/",
  "annotations": {
    "wikidata_qid": None,
    "deprecated": False,
    "replaced_by": None,
    "experimental": False,
    "for_wikis": [],
    "icon": None,
    "available_ui_languages": [
      "en"
    ],
    "tool_type": None,
    "repository": None,
    "api_url": None,
    "developer_docs_url": [
      {
        "url": "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot",
        "language": "en"
      }
    ],
    "user_docs_url": [],
    "feedback_url": [],
    "privacy_policy_url": [],
    "translate_url": None,
    "bugtracker_url": None
  },
  "_schema": None,
  "_language": "en",
  "origin": "api",
  "created_by": {
    "id": 10,
    "username": "JJMC89"
  },
  "created_date": "2021-10-12T20:26:29.012245Z",
  "modified_by": {
    "id": 3,
    "username": "BDavis (WMF)"
  },
  "modified_date": "2022-05-21T17:22:54.441791Z"
},
            {
  "name": "pywikifake",
  "title": "Pywikibot",
  "description": "Python library and collection of scripts that automate work on MediaWiki sites",
  "url": "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot",
  "keywords": [],
  "author": [
    {
      "name": "Pywikibot team"
    }
  ],
  "repository": "https://gerrit.wikimedia.org/g/pywikibot/core",
  "subtitle": None,
  "openhub_id": None,
  "url_alternates": [],
  "bot_username": None,
  "deprecated": False,
  "replaced_by": None,
  "experimental": False,
  "for_wikis": [
    "*"
  ],
  "icon": "https://commons.wikimedia.org/wiki/File:Pywikibot_MW_gear_icon.svg",
  "license": "MIT",
  "sponsor": [],
  "available_ui_languages": [],
  "technology_used": [
    "python"
  ],
  "tool_type": "coding framework",
  "api_url": None,
  "developer_docs_url": [
    {
      "url": "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot/Development",
      "language": "en"
    }
  ],
  "user_docs_url": [
    {
      "language": "en",
      "url": "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot"
    },
    {
      "url": "https://doc.wikimedia.org/pywikibot/",
      "language": "en"
    }
  ],
  "feedback_url": [],
  "privacy_policy_url": [],
  "translate_url": "https://translatewiki.net/wiki/Translating:Pywikibot",
  "bugtracker_url": "https://phabricator.wikimedia.org/tag/pywikibot/",
  "annotations": {
    "wikidata_qid": None,
    "deprecated": False,
    "replaced_by": None,
    "experimental": False,
    "for_wikis": [],
    "icon": None,
    "available_ui_languages": [
      "en"
    ],
    "tool_type": None,
    "repository": None,
    "api_url": None,
    "developer_docs_url": [
      {
        "url": "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot",
        "language": "en"
      }
    ],
    "user_docs_url": [],
    "feedback_url": [],
    "privacy_policy_url": [],
    "translate_url": None,
    "bugtracker_url": None
  },
  "_schema": None,
  "_language": "en",
  "origin": "api",
  "created_by": {
    "id": 10,
    "username": "JJMC89"
  },
  "created_date": "2021-10-12T20:26:29.012245Z",
  "modified_by": None,
  "modified_date": None
}
    ]
}

# I already know that "mm_wikidata_todo" has 8 missing fields, and "pywikibot" has 4.
# Looking at the dates, I can see that "mm_wikidata_todo" was last modified on October 16, 2022.  "pywikibot" was modified on May 21, 2022 and created on October 12, 2021.  (The creation date is what should be references in the third entry of the list.)

# Therefore, based on today being October 17th, I would expect `listToolsTest(mock_data)` to return the following:
# ```
# {
#     'mm_wikidata_todo': (8, 1),
#     'pywikibot': (4, 149),
#     'pywikifake': (4, 370)
#  }
# ```

# The estimated dates will be a little off by the time you see this!

listToolsTest(mock_data)


# As I am satisfied that my function is working properly, I can incorporate the actual fetch request.

def buildToolDict():
    url = f'{TOOLS_API_ENDPOINT}'
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        api_response = response.json()
        tools = api_response["results"]
        # fortunately the existence of the "next" field allows me to deal with pagination
        while api_response["next"]:
            api_response = requests.get(api_response["next"], headers=headers).json()
            tools.extend(api_response["results"])
        tool_entries = {}
        for entry in tools:
            date = entry["modified_date"] or entry["created_date"]
            tool_entries[entry["name"]] = (countMissingEntries(entry), calculateDaysElapsed(date))
        return tool_entries
    else:
        print(response.status_code)

# I tested this function by setting the return value to len(tool_entries) and received a value of 2702, which is equal to the maximum count of documents that I received while playing with the API
