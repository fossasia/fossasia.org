// var Feed = {
//   currentID: 0,
//   number: 0,
//   resultDiv: '',
//   switchNext: '',
//   switchPrevious: ''
// };

// $(document).ready(function() {
    
//     (function loadRSS() {
//       //due to the no access control origin header policy, an external service must be used to convert XML to JSON so we can fetch the JSON using JSONP; see http://www.raymondcamden.com/2015/12/08/parsing-rss-feeds-in-javascript-options/
//       var yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'http%3A%2F%2Fblog.fossasia.org%2Frss.xml'&format=json&callback=";
//       $.getJSON(yql, function(data) {
//         //get the posts
//         var posts = data.query.results.item;
//         Feed.number = posts.length;
//         //for each post, store the post in a div
//         for(index in posts) {
//           //first append the url to the img tag so the images and sources without a link already load correctly
//           posts[index].description = posts[index].description.replace(/(src)="(?!http|\/\/)/gi, 'src="http://blog.fossasia.org');
//           //do the same thing with links (i.e. for tags)
//           posts[index].description = posts[index].description.replace(/(href)="(?!http|\/\/)/gi, 'href="http://blog.fossasia.org');

//           var date = new Date(posts[index].pubDate);
          
//           //write data to a div
//           $('#result').append("<div class='post'><h3 class='title'>"+posts[index].title+"</h3> \
//                               <h4 class='author-date'>By "+posts[index].creator+" on "+date.toDateString()+"</h4> \
//                               <div class='content'>"+posts[index].description+"</div> \
//                               <a href='"+posts[index].link+"'><div class='link'><span class='linkText'>Read more in the blog</span></div></a> \
//                               </div>");
//           if(index == 0) {
//             $('.post').addClass('active');
//           }
//         }

//       }, "jsonp");
    
//     })();
  
//   //define object
  
//   Feed.resultDiv = document.getElementById('result');
  
//   Feed.switchNext = function() {
//     //check to see if it's the last one
//     if(this.currentID != this.number - 1) {
//       transition(this.currentID, this.currentID + 1);
//       this.currentID += 1;
//     } else {
//       transition(this.currentID, 0);
//       this.currentID = 0;
//     }
//   }
  
//   Feed.switchPrevious = function() {
//     if(this.currentID != 0) {
//       transition(this.currentID, this.currentID - 1);
//       this.currentID -= 1;
//     } else {
//       transition(this.currentID, this.number - 1);
//       this.currentID = this.number - 1;
//     }
//   }
  
//   // Transition from Post `a` to Post `b`
//   function transition(a, b) {
//     $('.post:eq(' + String(a) + ')').fadeOut(1000, function(){
//       $('.post:eq(' + String(b) + ')').fadeIn(1000);
//     });
//   }
// });
  
// setInterval(function() {Feed.switchNext();}, 7000);
$(document).ready(function() {
    var blog = $("#result")
    var url = 'http://blog.fossasia.org/feed/?format=xml';
    
    feednami.load(url,function(result){
        if(result.error) {
            console.log(result.error);
        } else {
            var entries = result.feed.entries;
          for( var x=0 ; x< 10; x++){
            var count =0;
            var text = entries[x];
            
            var title = text.title;
            blog.append("<h1>"+title+"</h1>");
            var author = text.author ;
            blog.append("<h2>"+(author)+"</h2>");
            var link = text.guid ;
            var date = new Date(text.date);

            blog.append("<span>"+(date)+"</span>");
             text = text.description;
              // console.log(text);
            
            
            text = $(text);
            // $("#main").append(text);
            var content = text.find("p").prevObject ;
            // console.log(content);
            length = content.length;
            i=0;
            count =0;
             while(i < length){
             if(content[i].innerHTML && count<2){
                 blog.append("<p>"+(content[i].innerHTML)+"</p>");
                count+=1;
               }
              i=i+1;
            }
            blog.append("<a href=" +(link)+"</a>");
            
         }
          
             
       }
        
    });
    
});