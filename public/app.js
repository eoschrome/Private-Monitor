//var ProgressBar = require('progressbar.js');
var interval;
$(document).ready(function(){
    interval=setInterval(function() {
        
        $.getJSON('api/ibct/get_info')
            .then(getBlockInfo)
        $.getJSON('api/ibct/get_producer_schedule')
            .then(getNextProducer)
        $.getJSON('api/ibct/getNumberOfBlocks')
            .then(getNumberOfBlocks)
        $.getJSON('api/ibct/getNumberOfTrx')
            .then(getNumberOfTrx)
        $.getJSON('api/ibct/getNonEmptyBlocks')
            .then(getNonEmptyBlocks)
        getTime();
    },500);

    setInterval(function() {
        move();
    },5000);
})
eos = Eos({keyProvider});

function getTime(){
    var time=new Date()
    var hours = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    if(min<10 && sec<10 && hours<10){
        $('#time').html("0"+hours+":0"+min+":0"+sec);
        
    }
    else if(min<10 && sec<10){
        $('#time').html(hours+":0"+min+":0"+sec);
        
    }
    else if(min<10 && hours<10){
        $('#time').html("0"+hours+":0"+min+":"+sec);
    }
    else if(hours<10){
        $('#time').html("0"+hours+":"+min+":"+sec);
    }
    else if(sec<10){
        $('#time').html(hours+":"+min+":0"+sec);
    }
    else if(min<10){
        $('#time').html(hours+":0"+min+":"+sec);
    }
    else{
        $('#time').html(hours+":"+min+":"+sec);
    }
}
function getNumberOfTrx(result){
    let numberOfTrx=formatMoney(result);
    $('#num_of_trx').html(numberOfTrx);
}

function getNumberOfBlocks(result){
    let numberOfBlocks=formatMoney(result);
    $('#num_of_blocks').html(result);
}
function getBlockInfo(result){
    let last_irr_block=formatMoney(result.last_irreversible_block_num);
    let lastBlock=formatMoney(result.head_block_num);
    $('#eos').html(lastBlock);
    $('#last_irr_block').html(last_irr_block);
    $('#BP_name').html(result.head_block_producer);
    $('#BP_name').val(result.head_block_producer);
}

function getNextProducer(result){
    var currentProducer=$('#BP_name').val();
    var producers=result.active.producers;
   for(var i=0;i<producers.length;i++){
       if(currentProducer ===producers[i].producer_name){
           var nxt=producers[i+1].producer_name;
           $('#next_bp').html(nxt);
       }
   }   
   //console.log(result.active.producers[0].producer_name)
}

function getNonEmptyBlocks(result){
    let non_empty=formatMoney(result);
    $('#non_empty').html(result);
    //non_empty=parseInt(result);
}

function move() {
    let elem = document.getElementById("myBar"); 
    let used=document.getElementById("used");
    let num_of_blocks=parseInt(document.getElementById("num_of_blocks").innerHTML);
    let non_empty=parseInt(document.getElementById("non_empty").innerHTML);
    let width = (non_empty*100)/num_of_blocks;
    let id = setInterval(frame, 500);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            elem.style.width = width + '%'; 
            used.innerHTML = width.toFixed(2) * 1 + '%';
        }
    }
}

function formatMoney(real_number, fixed, value, comma) {
    var fixed = isNaN(fixed = Math.abs(fixed)) ? 0 : fixed,
      value = value == undefined ? "." : value,
      comma = comma == undefined ? "," : comma,
      s = real_number < 0 ? "-" : "",
      i = String(parseInt(real_number = Math.abs(Number(real_number) || 0).toFixed(fixed))),
      j = (j = i.length) > 3 ? j % 3 : 0;
  
    return s + (j ? i.substr(0, j) + comma : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + comma) + (fixed ? value + Math.abs(real_number - i).toFixed(c).slice(2) : "");
  };
//console.log(eos);