/* Taken from https://github.com/fossasia/fossasia-loklak-webtweets/blob/gh-pages/js/tweets.js */

var interval_id = null;

function Interval() {
	if (interval_id !== null){
		clearInterval(interval_id)
		interval_id = window.setInterval(nextTweet, 6600); //6.6 secs
	} else{
		interval_id = window.setInterval(nextTweet, 6600); //6.6 secs
	}
}

function datafetcher() {
	loklakFetcher.getTweets({}, datahandler);
	Interval();
}

function datahandler(raw) {
	stuff = raw;   //Makes the data available globally.
	parser(stuff);
}

var tweetNum = 0;

function parseFunc(){
	parser(stuff)
}

function nextTweet() {
	tweetNum += 1;
	var tweetsEl = document.getElementsByClassName('tweets-feed')[0];
	//go back to the first tweet if it's greater than the amount of tweets available
	if(tweetNum == tweetsEl.dataset.count) {
		tweetNum = 0;
	}
  console.log(tweetsEl.dataset.count);
	Interval();
	document.getElementsByClassName('tweets-feed')[0].style.opacity =  0;
	window.setTimeout(parseFunc, 560);
}
function lastTweet() {
	if (tweetNum > 0) {
		tweetNum -= 1;
		Interval();
		document.getElementsByClassName('tweets-feed')[0].style.opacity =  0;
		window.setTimeout(parseFunc, 560);
	}
}

function parser(data) {
	var parsed = ""
	var tweet = data.statuses[tweetNum].text;
	var words = tweet.split(" ");
	var loklakLinkCount = 0;
  var actualLink=data.statuses[tweetNum].links;
	for (word in words) {
		if (words[word].startsWith("@")) {
			parsed += "<a href='https://twitter.com/" + words[word].slice(1) + "' target='_blank'>" + words[word] + "</a> ";
		} else if (words[word].startsWith("#")) {
			parsed += "<a href='https://twitter.com/hashtag/" + words[word].slice(1) + "' target='_blank'>" + words[word] + "</a> ";
		} else if (words[word].startsWith("http")) {
			if (words[word].startsWith("http://api")) {
				parsed += "<a href='" + actualLink + "' target='_blank'>" + actualLink + "</a> ";
				loklakLinkCount += 1;
			} else {
				parsed += "<a href='" + actualLink + "' target='_blank' style='word-break:break-all'>" + actualLink + "</a> ";
			}
		} else {
			parsed += words[word] + " ";
		}
	}
  var date = +new Date(data.statuses[tweetNum].created_at);
  var myDate = new Date();
  myDate = myDate.getTime();
  var difference = myDate-date; //it's in miliseconds
  var difference = Math.round(difference/1000/3600/24);
  parsed += "<span class='dateTweeted'>Tweeted "+difference+" Days Ago</div>";
  
	document.getElementsByClassName("tweets-feed")[0].innerHTML =  parsed;
	document.getElementsByClassName("tweets-feed")[0].style.opacity =  1;
}

/* Taken from https://github.com/fossasia/fossasia-loklak-webtweets/blob/gh-pages/js/loklak-fetcher.js 
See documentation at https://github.com/fossasia/fossasia-loklak-webtweets
*/


var loklakFetcher;

window.onload = (function() {
  var script = null;

  loklakFetcher = {
    /**
     * Fetches tweets from the public loklak API, with the options provided
     * @param  {object}   options  Object with allowed GET-attributes, see
     *                             loklak.org/api.html
     * @param  {function} callback Function called after getting the results.
     *                             These are passed as first argument
     */
    getTweets: function(options, callback) {
      if(typeof options === 'function') { // A callback has been provided as 2nd
                                          // argument (no options)
        var callback = options;
        options = {};
      } else if(callback === undefined) { // No callback has been provided, even
                                          // as 2nd argument
        throw new Error('[LOKLAK-FETCHER] No callback provided');
      }

      var settings = [ 'count', 'fields', 'limit', 'tzOffset',
        'minified' ];  // Field names for all the possible parameters
      var defaults = [ 100, '', '', 0, true ];  // Default values

      // Check if no options have been provided
      if(typeof options === 'undefined') {
        var options = {}; // Create 'options' to avoid ReferenceErrors later
      }
      
      //Check if there are any data elements set
      var tweetsEl = document.getElementsByClassName("tweets-feed")[0];
      var dataset = tweetsEl.dataset;
      if(dataset.count) {
        options[settings[0]] = dataset.count; //count is index 0
      }

      if(dataset.query) {
        var query = dataset.query.replace(/\s/gi, '%20').replace(/#/gi, '%23'); //replace spaces and hashtags in URL
      } else {
        query = '';
      }

      if(dataset.start) {
        query = query + "%20since:" + dataset.start;
      }

      if(dataset.end) {
        query = query + "%20until:" + dataset.end;
      }

      if(dataset.from) {
        query = query + "%20from:" + dataset.from;
      }
    
      

      // Write unset options as their default
      for(index in settings) {
        if(options[settings[index]] === undefined) {
          options[settings[index]] = defaults[index];
        } 
      }
      
      // Create the URL with all the parameters
      var url = 'https://api.loklak.org/api/search.json' +
        '?callback=loklakFetcher.handleData' +
        '&q=' + query +
        '&count=' + options.count +
        '&fields=' + options.fields +
        '&limit=' + options.limit +
        '&timezoneOffset=' + options.tzOffset +
        '&minified=' + options.minified;
      // If the script element for JSONP already exists, remove it
      if(script !== null) {
        document.head.removeChild(script);
      }
      /**
       * Invokes the callback function, passing the data from the server as the
       * first and only argument.
       * @param  {object} data JSON coming from loklak's API
       */
      this.handleData = function(data) {
        callback(data);
      };

      // Create the script tag for JSONP
      script = document.createElement("script");
      script.src = url;
      document.head.appendChild(script);
    }
  };
  datafetcher();

});
