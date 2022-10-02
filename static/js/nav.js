  // When the user scrolls down 20px from the top of the document, slide down the navbar
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  console.log("here",document.body.scrollTop,document.documentElement.scrollTop);
  // maybe set the nav bar to sticky when scrolling, with a solid background??????
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementsByClassName("navbar")[0].style.top = "-150px";
  } else {
    document.getElementsByClassName("navbar")[0].style.top="0px";
  }
}