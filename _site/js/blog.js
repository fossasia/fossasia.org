$(document).ready(function() {
    
    var url = 'https://blog.fossasia.org/feed/?format=xml';
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
            html=[];
          for( var x=0 ; x< 10; x++){
            
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
            html.push("<h1>By - "+(author)+"</h1>");
           
            var link = text.guid ;
            var date = new Date(text.date);
             summary = text.summary
             html.push("<hr><p class ='summary'>"+summary + "<p>");
             html.push("<span class='date'> Posted On - "+(date)+"</span></div>");
            
             
            
         }
          blog.html(html.join(""));
        
      
      
            
       }
        
    });
 
}
