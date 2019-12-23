# Feednami

Google Feed API is dead! It was deprecated a long time ago, but people were still using it and when it finally went offline a lot of people had problems, so I made this!

## How to use 

Example source can be found [here](https://github.com/richardkazuomiller/feednami-client/tree/master/examples) or seen on [feednami.com](https://feednami.com/static/feednami-client/examples/index.html)

### Import 

    <script src="https://cdn.rawgit.com/richardkazuomiller/feednami-client/master/releases/1.0.2.min.js"></script>
    
### Load a feed

Fetch your favorite blog or podcast!

    <script>
      var url = 'http://daringfireball.net/feeds/articles'
      feednami.load(url,function(result){
        if(result.error){
          console.log(result.error)
        }
        else{
          var entries = result.feed.entries
          for(var i = 0; i < entries.length; i++){
            var entry = entries[i]
            console.log(entry.title)
          }
        }
      })
    </script>
    
### For the former Google API users

`feednami.loadGoogleFormat` replicates as best as possible the Google Feed API. For example, the `content` attribute of an entry corresponsds to `<content>`, `<summary>`, or `<description>`, whereas by default, all three are returned with the unset values as `null`.

    <script>
      var url = 'http://daringfireball.net/feeds/articles'
      feednami.loadGoogleFormat(url,function(result){
        if(result.error){
          console.log(result.error)
        }
        else{
          var entries = result.feed.entries
          for(var i = 0; i < entries.length; i++){
            var entry = entries[i]
            console.log(entry.title)
            console.log(entry.contentSnippet) 
            // the first 120 characters of the entry
          }
        }
      })
    </script>
    
Where with the Google Feed API you would use `new Feed(url).load(callback)`, all you need to do is use `feednami.loadGoogleFormat(url,callback)`

### Function Reference

#### feednami.load(options,callback)

The first argument can be either a `url` or an `options` object. The only required option is `url`. All others are optional.

 - `url` - a valid url of the RSS or Atom feed to load
 - `includeXml` - default `false`. Set to true if you want to load the original XML Document 
 
##### Result Object

This is basically copied from <https://developers.google.com/feed/v1/reference>

  - `error?` Present if there was an error loading the feed.
    - `code` An HTTP-style error code.
    - `message` A human-readable string describing the error.
  - `xmlDocument?` Present if XML Document is requested
  - `feed` 
    - `meta` Feed properties. The parser normalizes feed data into generic properties similar to the RSS 2.0 format. The original tags e.g. `rdf:title` are also present.
      - `title`
      - `description`
      - `link` (website link)
      - `xmlurl` (the canonical link to the feed, as specified by the feed)
      - `date` (most recent update)
      - `pubdate` (publish date)
      - `author
      - `language`
      - `image[]`
        - `url`
        - `title`
      - `favicon`
      - `copyright`
      - `generator`
      - `categories[]` 
    - `entries[]`
      - `title`
      - `description (frequently, the full article content)
      - `summary` (frequently, an excerpt of the article content)
      - `link`
      - `origlink` (when FeedBurner or Pheedo puts a special tracking url in the link property, origlink contains the original link)
      - `permalink` (when an RSS feed has a guid field and the isPermalink attribute is not set to false, permalink contains the value of guid)
      - `date` (most recent update)
      - `date_ms` (most recent update unix time in ms)
      - `pubdate` (original published date unix time in ms)
      - `author`
      - `guid` (a unique identifier for the article)
      - `comments` (a link to the article's comments section)
      - `image` (an Object containing url and title properties)
      - `categories` (an Array of Strings)
      - `source` (an Object containing url and title properties pointing to the original source for an article; see the RSS Spec for an explanation of this element)
      - `enclosures` (an Array of Objects, each representing a podcast or other enclosure and having a url property and possibly type and length properties)
 
#### feednami.loadGoogleFormat(url,callback)
 
##### Result Object

This is basically copied from <https://developers.google.com/feed/v1/reference>

  - `error?` Present if there was an error loading the feed.
    - `code` An HTTP-style error code.
    - `message` A human-readable string describing the error.
  - `xmlDocument?` Present if XML Document is requested
  - `feed`
    - `feedUrl` The URL for the feed
    - `title` The feed title. Corresponds to the `<title>` element in Atom and the `<title>` element in RSS.
    - `link` The URL for the HTML version of the feed. Corresponds to the `<link>` element in Atom and the `<link>` element in RSS.
    - `description` The feed description. Corresponds to the `<subtitle>` element in Atom and the `<description>` element in RSS.
    - `author` The feed author. Corresponds to the `<name>` element for the author in Atom.
    - `entries[]` A list of all of the entries in the feed. Corresponds to the `<entry>` element in Atom and the `<item>` element in RSS.
      - `mediaGroup` A container for Media RSS feed results. All result properties nested under mediaGroups correspond exactly as documented in the Media RSS Specification. Media RSS is available only for feed entries newer than February 1st, 2010. Please refer to that specification for detailed information about Media RSS fields.
      - `title` The entry title. Corresponds to the `<title>` element in Atom and the `<title>` element in RSS.
      - `link` The URL for the HTML version of the entry. Corresponds to the `<link>` element in Atom and the `<link>` element in RSS.
      - `content` The body of this entry, inlcuding HTML tags. Since this value can contain HTML tags, you should display this value using `elem.innerHTML = entry.content` (as opposed to using document.createTextNode). Corresponds to the `<content>` or `<summary>` elements in Atom and the `<description>` element in RSS.
      - `contentSnippet` A snippet (< 120 characters) version of the content attribute. The snippet does not contain any HTML tags.
      - `publishedDate` The string date on which the entry was published of the form `"13 Apr 2007 12:40:07 -0700"`. You can parse the date with new `Date(entry.publishedDate)`. Corresponds to the `<published>` element in Atom and the `<pubDate>` element in RSS.
      - `categories[]` A list of string tags for the entry. Corresponds to the term attribute for the <category> element in Atom and the `<category>` element in RSS.
      
 ####This is how my browser console showed me things through feednami 
  https://github.com/vaibsharma/fossasia.org/blob/gh-pages/js/Screenshot%20from%202016-08-30%2020:59:23.png
  
