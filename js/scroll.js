window.onscroll = function() {
scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 100 ) {
    document.getElementById("totop").style.visibility = "hidden";
  } else {
    document.getElementById("totop").style.visibility = "visible";
  }
}




function totop(){
  window.scrollTo(0,0);
}
