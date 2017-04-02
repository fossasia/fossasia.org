
  function hider(channel,no) {
  
    if(channel==1)
   {

    var x = document.getElementById('donation1')
    var y = document.getElementById('regular1');
    if(x.className === 'hide')
    {
    if(no==1)
    {
     y.className = 'hide';	
    
    x.className = 'appear'; 
    }
   
   	}
   	if(y.className === 'hide')
   	{
    if(no==2)
    { 
    y.className = 'appear';  
	x.className = 'hide';  
 	
    }
   	}

}
 if(channel==2)
   {

    var x = document.getElementById('donation2')
    var y = document.getElementById('regular2');
    if(x.className === 'hide')
    {
    if(no==1)
    {
      y.className = 'hide'; 
    
    x.className = 'appear'; 
    }
   
   	}
   	if(y.className === 'hide')
   	{
    if(no==2)
    { 
   y.className = 'appear';  
  x.className = 'hide';  
  
 	
    }
   	}

}}


   