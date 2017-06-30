/*jslint browser:true */
'use strict';

var marsData = new XMLHttpRequest();

function LoadMarsData() {
            
    var month = document.getElementById('month').value;
    var day = document.getElementById('day').value;
    var year = document.getElementById('year').value;
    
    if (month === '' || day === '' || year === '') {
        var today = new Date();
        
        year = today.getFullYear();
        month = today.getMonth()+1
        day = today.getDate() - 10;
    }
    
    var dateToUse =year + "-" + month + "-" + day
    console.log(dateToUse);
    var dataPath = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+dateToUse+"&api_key=DEMO_KEY ";
        
    marsData.open('GET', dataPath , true);
    marsData.responseType = 'text';
    marsData.send();   
}

/* directly from https://www.w3schools.com/howto/howto_js_sort_table.asp */
function sortTable() {
  var table, rows, switching, i, x, y,  shouldSwitch;
  table = document.getElementById("dataTable");
   switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
     //start by saying: no switching is done:
    switching =  false;
    rows = table.getElementsByTagName("TR");
     /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length  - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
       /*Get the two elements you want to compare,
      one from current row and one from the next:*/
       x = rows[i].getElementsByTagName("TD")[0];
      y  = rows[i + 1].getElementsByTagName("TD")[0];
       //check if the two rows should switch place:
       if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         //if so, mark as a switch and break the loop:
         shouldSwitch= true;
        break;
       }
    }
    if (shouldSwitch) {
       /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
       switching = true;
    }
  }
};

marsData.onload = function() {
    if (marsData.statusText === 'OK'){
        var marsObj = JSON.parse(marsData.responseText);
        console.log(marsObj);

        var r = new Array();
        var j = 0;
        var imgLink;
            r[++j] = '<tr><th>Camera Full Name</th><th>Camera Name</th><th>Image URL</th></tr>';
        for (var key = 0; key < marsObj.photos.length; key++){
            imgLink = marsObj.photos[key].img_src;
            r[++j] ='<tr><td>';
            r[++j] = marsObj.photos[key].camera.full_name;
            r[++j] = '</td><td>';
            r[++j] = marsObj.photos[key].camera.name;
            r[++j] = '</td><td><a href="'+imgLink+'">View Image</a>';
            r[++j] = '</td></tr>';
         }
        console.log(r);

        $('#dataTable')[0].innerHTML = r.join(''); 
        sortTable();
    } //end if
}; 

LoadMarsData();
