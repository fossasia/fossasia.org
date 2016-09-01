$(document).ready(function() {
    
    var url = 'http://blog.fossasia.org/feed/?format=xml';
    feeds(url);
 });


function feeds(url){
var blog = $("#result");
var html = [];
feednami.load(url,function(result){
        if(result.error) {
            console.log(result.error);
        } else {
          
            var entries = result.feed.entries;
          for( var x=0 ; x< 10; x++){
            html=[];
            var count =0;
            var text = entries[x];
            
            var title = text.title;
            if(x===0){
                html.push("<div class='item active'><h1>"+title+"</h1>");
            }
            else{
                html.push("<div class='item' ><h1 class='blogtitle'>"+title+"</h1>");
            }
            var author = text.author ;
            html.push("<h1>"+(author)+"</h1>");
           
            var link = text.guid ;
            var date = new Date(text.date);

           
             text = text.description;
             text = $(text);
            
            var content = text.find("p").prevObject ;
           
            length = content.length;
            i=0;
            count =0;
             while(i < length){
             if(content[i].innerHTML && count<2){
                 html.push(" <p>"+(content[i].innerHTML)+"</p> ");
                 
                count+=1;
               }
              i=i+1;
            }

            html.push("<p><a href=" + link +" target='_blank'>Read More</a></p><br>");
             html.push("<span>"+(date)+"</span></div>");
            blog.append(html.join(""));
             
            
         }
          
        
      
      
            
       }
        
    });
 
}
