/*  ---  MOCK DATA ---- */

const anno_keys = {
  wikidata_qid: "Wikidata item ID",
  for_wikis:
    "A string or array of strings describing the wiki(s) this tool can be used on.  Use hostnames such as <code>zh.wiktionary.org</code>.  Use asterisks as wildcards.  For example, <code>*.wikisource.org</code means 'this tool works on all Wikisource wikis.'  <code>*</code> means 'this works on all wikis, including Wikimedia wikis.'",
  icon: "A link to a Wikimedia Commons file description page for an icon that depicts the tool.",
  available_ui_languages:
    "The language(s) the tool's interface has been translated into.  Use <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes' target='_blank'>ISO 639 language codes</a> like <code>zh</code> and <code>scn</code>.",
  tool_type:
    "The manner in which the tool is used.  Select one from the available options.",
  repository: "A link to the repository where the tool code is hosted.",
  api_url: "A link to the tool's API, if available.",
  developer_docs_url:
    "A link to the tool's developer documentation, if available.",
  user_docs_url: "A link to the tool's user documentation, if available.",
  feedback_url:
    "A link to a location where the tool's user can leave feedback.",
  privacy_policy_url: "A link to the tool's privacy policy, if available.",
  translate_url: "A link to the tool's translation interface.",
  bugtracker_url:
    "A link to the tool's bug tracker on GitHub, Bitbucket, Phabricator, etc.",
};

const mm_wikidata_todo = {
  title: "Wikidata Todo",
  toolhub: "https://toolhub.wikimedia.org/tools/mm_wikidata_todo",
  description: "Shows you little things you can do on Wikidata.",
  url: "http://tools.wmflabs.org/wikidata-todo",
  repository: "https://bitbucket.org/magnusmanske/wikidata-todo",
  missing: [
    "wikidata_qid",
    "for_wikis",
    "icon",
    "api_url",
    "user_docs_url",
    "feedback_url",
    "privacy_policy_url",
    "translate_url",
  ],
};

const pywikibot = {
  title: "Pywikibot",
  description:
    "Python library and collection of scripts that automate work on MediaWiki sites",
  toolhub: "https://toolhub.wikimedia.org/tools/pywikibot",
  url: "https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Pywikibot",
  repository: "https://gerrit.wikimedia.org/g/pywikibot/core",
  missing: ["wikidata_qid", "api_url", "feedback_url", "privacy_policy_url"],
};

// Going to need a different interface if we're working on "tool type"
