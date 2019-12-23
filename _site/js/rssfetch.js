var Feed = {
  currentID: 0,
  number: 0,
  resultDiv: '',
  switchNext: '',
  switchPrevious: ''
};

$(document).ready(function() {
    
    (function loadRSS() {
      //due to the no access control origin header policy, an external service must be used to convert XML to JSON so we can fetch the JSON using JSONP; see http://www.raymondcamden.com/2015/12/08/parsing-rss-feeds-in-javascript-options/
      var yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Fblog.fossasia.org%2Frss.xml'&format=json&callback=";
      $.getJSON(yql, function(data) {
        //get the posts
        var posts = data.query.results.item;
        Feed.number = posts.length;
        //for each post, store the post in a div
        for(index in posts) {
          //first append the url to the img tag so the images and sources without a link already load correctly
          posts[index].description = posts[index].description.replace(/(src)="(?!http|\/\/)/gi, 'src="https://blog.fossasia.org');
          //do the same thing with links (i.e. for tags)
          posts[index].description = posts[index].description.replace(/(href)="(?!http|\/\/)/gi, 'href="https://blog.fossasia.org');

          var date = new Date(posts[index].pubDate);
          //write data to a div
          $('#result').append("<div class='post'><h3 class='title'>"+posts[index].title+"</h3> \
                              <h4 class='author-date'>By "+posts[index].creator+" on "+date.toDateString()+"</h4> \
                              <div class='content'>"+posts[index].description.substring(0,400)+". . . </div> \
                              <a href='"+posts[index].link+"'><div class='link'>See more at FOSSASIA</div></a> \
                              </div>");
          if(index == 0) {
            $('.post').addClass('active');
          }
        }

      }, "jsonp");
    
    })();
  
  //define object
  
  Feed.resultDiv = document.getElementById('result');
  
  Feed.switchNext = function() {
    //check to see if it's the last one
    if(this.currentID != this.number - 1) {
      this.currentID += 1;
      document.getElementsByClassName('post')[this.currentID-1].className = "post";
      document.getElementsByClassName('post')[this.currentID].className = "post active";
    } else {
      this.currentID = 0;
        document.getElementsByClassName('post')[this.number - 1].className = "post";
        document.getElementsByClassName('post')[this.currentID].className = "post active";
    }
  }
  
  Feed.switchPrevious = function() {
    if(this.currentID != 0) {
      this.currentID -= 1;
      document.getElementsByClassName('post')[this.currentID+1].className = "post";
      document.getElementsByClassName('post')[this.currentID].className = "post active";
    } else {
      this.currentID = this.number - 1;
      document.getElementsByClassName('post')[0].className = "post";
      document.getElementsByClassName('post')[this.currentID].className = "post active";
    }
  }
  
  
});

setInterval(function() {
  Feed.switchNext(); 
}, 5000);
