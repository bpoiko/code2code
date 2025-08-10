// there likely will be a text animation
function welcome(){
    var Evil = new Date();
   var babble =  document.getElementById("date")
   babble.textContent = Evil.toLocaleDateString();

}
welcome();