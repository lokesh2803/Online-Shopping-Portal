/* When the user clicks on the button, 
      toggle between hiding and showing the dropdown content */
      
function myFunction() {
    console.log("Here comes");
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      document.getElementById("myDropdown").classList.remove("show");
      }
  }