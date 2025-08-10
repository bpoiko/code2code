// there likely will be a text animation
(function () {
  const now = new Date();
  const el = document.getElementById("date");
  el.textContent = now.toLocaleString();
})();

function confirm(language){
    const conmf = prompt(`Are you sure you want to use ${language}?`);
    if(conmf){
        const pages = {
            "Java" : "langchoicej.html",
            "C/C++" : "langchoicec.html",
            "Python" : "langchoicep.html"
        };
        if(pages[language]){
            window.location.href = pages[language];

        }else{
            alert("NO PAGE FOUND");
        }
    }
}

