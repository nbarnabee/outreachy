import json  # will let us print out the response in a prettier format
import requests  # necessary to make API calls

# configure API session parameters

# user_agent helps identify the request if there is an issue and is best practice
REQUEST_LABEL = 'Outreachy 25 Toolhub Microtask'

# NOTE: it's considered best practice to include contact info in user agents
# I have used mine here – feel free to change it to your own
USER_INFO = 'Phabricator user: NicoleLBee'

headers = {'User-Agent': f'{REQUEST_LABEL} - {USER_INFO}'}

TOOLS_API_ENDPOINT = "https://toolhub.wikimedia.org/api/tools"
toolname = 'pywikibot'  # name of tool we want info about 
url = f'{TOOLS_API_ENDPOINT}/{toolname}/'

# response = requests.get(url, headers=headers)
# if response.status_code == 200:
#     json_formatted_response = json.dumps(response.json(), indent=2)
#     print(json_formatted_response)
# else:
#     print(response.status_code)


# TODO: Write a function that takes a tool name,
# and returns all the missing fields as a list.

# I'm making use of the variable declarations and imports found in the sample code block.

def list_missing_fields(target):
    global toolname
    toolname = target
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