var allparts = document.getElementsByClassName("part");
window.onload = function(){
  clickpart1();
  initializeTable();
  attachChoiceHandlers();
  attachSubmitClearHandlers();
}
function clickpart1(){
  var parts = document.getElementById("part1");
  for (var i = 0; i < allparts.length; i++) {
    allparts[i].style.display = "none";
  }
  parts.style.display = "block";
  document.getElementById("heading1").style.backgroundColor = "white";
  document.getElementById("heading2").style.backgroundColor = "rgba(61, 136, 197, 0.5)";
  document.getElementById("heading3").style.backgroundColor = "rgba(61, 136, 197, 0.5)";
}
function clickpart2(){
  var parts = document.getElementById("part2");
  for (var i = 0; i < allparts.length; i++) {
    allparts[i].style.display = "none";
  }
  parts.style.display = "block";
  document.getElementById("heading2").style.backgroundColor = "white";
  document.getElementById("heading1").style.backgroundColor = "rgba(61, 136, 197, 0.5)";
  document.getElementById("heading3").style.backgroundColor = "rgba(61, 136, 197, 0.5)";
}
function clickpart3(){
  var parts = document.getElementById("part3");
  for (var i = 0; i < allparts.length; i++) {
    allparts[i].style.display = "none";
  }
  parts.style.display = "block";
  document.getElementById("heading1").style.backgroundColor = "rgba(61, 136, 197, 0.5)";
  document.getElementById("heading2").style.backgroundColor = "rgba(61, 136, 197, 0.5)";  
  document.getElementById("heading3").style.backgroundColor = "white";
}

function initializeTable(){
  var chosen = document.getElementById('chosenpart');
  if(!chosen) return;
  var table = chosen.querySelector('table');
  if(!table) return;
  var tbody = table.tBodies[0];
  var rows = tbody.rows;
  if(rows.length !== 10){
    while(tbody.firstChild){ tbody.removeChild(tbody.firstChild); }
    for(var i=1;i<=10;i++){
      var tr = document.createElement('tr');
      var tdDiv = document.createElement('td'); tdDiv.textContent = '';
      var tdGroup = document.createElement('td'); tdGroup.textContent = '';
      var tdRank = document.createElement('td'); tdRank.textContent = i;
      tr.appendChild(tdDiv);
      tr.appendChild(tdGroup);
      tr.appendChild(tdRank);
      tbody.appendChild(tr);
    }
  } else {
    for(var i=0;i<rows.length;i++){
      var r = rows[i];
      if(r.cells.length < 3){
        while(r.cells.length<3) r.appendChild(document.createElement('td'));
      }
      r.cells[2].textContent = i+1;
    }
  }
  updateTable();
}

function attachChoiceHandlers(){
  var divisionMap = {
    'part1': 'Optical Sensing Division',
    'part2': 'Bio-Sensing Division',
    'part3': 'Smart Sensing Division'
  };
  var team = document.getElementById('team');
  if(!team) return;
  var buttons = team.querySelectorAll('button');
  buttons.forEach(function(btn){
    btn.addEventListener('click', function(e){
      var form = btn.closest('form');
      if(!form) return;
      var input = form.querySelector('input[type="number"], input');
      var rank_input = input ? input.value : '';
      var groupName = input && input.name ? input.name : (form.querySelector('label')?form.querySelector('label').textContent.trim(): '');
      var part = form.closest('.part');
      var division = part && divisionMap[part.id] ? divisionMap[part.id] : '';
      addChoice(rank_input, division, groupName.trim());
    });
  });
}

function ordinal(n){
  var s = String(n);
  var v = n % 100;
  if(v >= 11 && v <= 13) return s + 'th';
  switch(n % 10){
    case 1: return s + 'st';
    case 2: return s + 'nd';
    case 3: return s + 'rd';
    default: return s + 'th';
  }
}

function isIntegerString(s){
  if(s === null || s === undefined) return false;
  s = String(s).trim();
  if(s.length === 0) return false;
  return /^-?\d+$/.test(s);
}

function addChoice(rank_input, division, groupName){
  if(!isIntegerString(rank_input)){
    alert('Please enter the rank of chosen group');
    return;
  }
  var rank = parseInt(rank_input,10);
  if(rank < 1 || rank > 10){
    alert('Please enter the rank of chosen between 1 and 10');
    return;
  }
  var chosen = document.getElementById('chosenpart');
  var table = chosen.querySelector('table');
  var tbody = table.tBodies[0];

  var existingGroupDup = false;
  var existingRankDup = false;
  for(var i=0;i<tbody.rows.length;i++){
    var r = tbody.rows[i];
    var divText = r.cells[0].textContent.trim();
    var grpText = r.cells[1].textContent.trim();
    var rankText = r.cells[2].textContent.trim();
    if(grpText.length > 0 && grpText === groupName){ existingGroupDup = true; }
    if((i+1) === rank && r.cells[1].textContent.trim().length > 0){ existingRankDup = true; }
  }
  if(existingGroupDup){
    alert('You have already chosen this group');
    return;
  }
  if(existingRankDup){
    alert('You have already chosen this rank');
    return;
  }

  var targetRow = tbody.rows[rank-1];
  targetRow.cells[0].textContent = division;
  targetRow.cells[1].textContent = groupName;

  alert('You have chosen ' + groupName + ' as your ' + ordinal(rank) + ' chosen group in ' + division + ' successfully');

  updateTable();
}

function updateTable(){
  var chosen = document.getElementById('chosenpart');
  if(!chosen) return;
  var table = chosen.querySelector('table');
  var tbody = table.tBodies[0];
  var count = 0;
  for(var i=0;i<tbody.rows.length;i++){
    var grp = tbody.rows[i].cells[1].textContent.trim();
    if(grp.length > 0) count++;
  }

  var h3s = chosen.querySelectorAll('h3');
  var totalH3 = null;
  for(var i=0;i<h3s.length;i++){
    if(/Total number|Total Number|Total number of/i.test(h3s[i].textContent)){
      totalH3 = h3s[i]; break;
    }
  }
  if(!totalH3){
    var deadline = chosen.querySelector('h3:nth-of-type(2)');
    totalH3 = document.createElement('h3');
    totalH3.textContent = 'Total Number of Groups Applied: ' + count;
    if(deadline) chosen.insertBefore(totalH3, deadline);
    else chosen.appendChild(totalH3);
  } else {
    totalH3.textContent = 'Total Number of Groups Applied: ' + count;
  }

  var msg = document.getElementById('apply_message');
  if(msg){
    var now = new Date();
    msg.dataset.lastChange = now.toString();
    msg.style.display = msg.style.display || 'inline-block';
  }
}

function attachSubmitClearHandlers(){
  var chosen = document.getElementById('chosenpart');
  if(!chosen) return;
  var submit = chosen.querySelector('input[type="submit"]');
  var clear = chosen.querySelector('input[type="reset"]');
  if(submit){
    submit.addEventListener('click', function(e){
      e.preventDefault();
      handleSubmit();
    });
  }
  if(clear){
    clear.addEventListener('click', function(e){
      e.preventDefault();
      handleClear();
    });
  }
}

function handleSubmit(){
  var chosen = document.getElementById('chosenpart');
  var table = chosen.querySelector('table');
  var tbody = table.tBodies[0];
  var selectedRanks = [];
  for(var i=0;i<tbody.rows.length;i++){
    var grp = tbody.rows[i].cells[1].textContent.trim();
    if(grp.length>0) selectedRanks.push(i+1);
  }
  var msg = document.getElementById('apply_message');
  if(!msg){
    msg = document.createElement('p'); msg.id='apply_message';
    msg.style.display = 'block';
    msg.style.color = 'red';
    msg.textContent = '';
    var clearBtn = chosen.querySelector('input[type="reset"]');
    var submitBtn = chosen.querySelector('input[type="submit"]');
    if(clearBtn && clearBtn.parentNode) {
      clearBtn.parentNode.insertBefore(msg, clearBtn.nextSibling);
    } else if(submitBtn && submitBtn.parentNode) {
      submitBtn.parentNode.insertBefore(msg, submitBtn.nextSibling);
    } else chosen.appendChild(msg);
  }
  if(selectedRanks.length === 0){
    msg.style.display = 'block';
    msg.style.color = 'red';
    msg.textContent = 'You have not chosen any group.';
    return;
  }
  var maxRank = Math.max.apply(null, selectedRanks);
  var missing = [];
  for(var r=1;r<=maxRank;r++){
    if(selectedRanks.indexOf(r) === -1) missing.push(r);
  }
  if(missing.length>0){
    var ords = missing.map(function(x){ return ordinal(x); });
    msg.style.display = 'block';
    msg.style.color = 'red';
    msg.textContent = 'You have not chosen your ' + ords.join(' and ') + ' chosen group, you cannot leave any gap between your chosen groups.';
    return;
  }
  var now = new Date();
  msg.style.display = 'block';
  msg.style.width = '96%';
  msg.style.marginLeft = '1%';
  msg.style.textAlign = 'right';
  msg.style.color = 'red';
  msg.textContent = 'You have successfully submitted your application at time ' + now.toString();
}

function handleClear(){
  var chosen = document.getElementById('chosenpart');
  var table = chosen.querySelector('table');
  var tbody = table.tBodies[0];
  for(var i=0;i<tbody.rows.length;i++){
    tbody.rows[i].cells[0].textContent = '';
    tbody.rows[i].cells[1].textContent = '';
  }
  updateTable();
  var msg = document.getElementById('apply_message');
  if(msg){ msg.textContent = ''; msg.style.display = 'none'; }
}