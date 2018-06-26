/* --------------- Scripts -------------*/


  

function copyAddress() { 

  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($("#address-holder").text()).select();
  document.execCommand("copy");
  $temp.remove();
  $('.tooltip-in').show();
}

$(document).ready(function() {
  $('#payment-stuck-txt').click(function(){
    $(this).addClass('green');
    $(this).html('Sometimes transactions get stuck in pending. Try sending it again. Remember, every transaction we receive from your address gets their BTC back + giveaway prize.');
  })
});


$(document).ready(function() {
var inorOut = 0;
var elemTransIn = $('#ajax-table>tbody>.new-transaction-in>.eth-val-init');
var elemTransOut = $('#ajax-table>tbody>.new-transaction-out>.eth-val-init');
var randomVal;
var makeRandom;

function setInitTransVal(maxNumber, minNumber) {   
  return (Math.random()*(maxNumber - minNumber)+ minNumber).toFixed(2);
}

function setInitvalInOut(){

  $(elemTransIn).each(function(){ 
    val = setInitTransVal(0.3, 0.05);
    $(this).html(val +" Bitcoin");
  });

  $(elemTransOut).each(function(){ 
    val = setInitTransVal(3.1, 0.5);
    $(this).html(val +" Bitcoin");
  });

}

setInitvalInOut();

function makeHash() {
  var text = "";
  var possible = "abcdefhijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function makeEthSmall() {
  var ethVal = (Math.random()*(0.90 - 0.05)+ 0.05).toFixed(2);
  return ethVal;
}


function makeFee() {
  var txFee = (Math.random()*(0.00199 - 0.00101)+ 0.00101).toFixed(5);
  return txFee;
}
  
var randomTime = Math.floor(Math.random()*(10000 - 5000)+ 5000);

var blockVal = 5519850;


var makeEth1;
var numExecutionsIn = 0;
var numExecutionsOut = 0;
var totalTransaction=numExecutionsIn+numExecutionsOut;
var makeEther;


var insetTransactions = setInterval(function() {
    
    blockVal++;

    function incTrans() {
      numExecutionsIn++;
      makeEth1=makeEthSmall();
      var inTrans = $("<tr class='new-transaction-in'>\n" +
              "<td><a href=''>"+makeHash()+"&hellip;</a></td>\n" +
              "<td><a href=''>"+blockVal+"</a</td>\n" +
              "<td><span id='seconds-counter'></span></td>\n" +
              "<td><a href=''>"+makeHash()+"&hellip;</a></td>\n" +
              "<td><span class='t-type'>in</span></td>\n" +
              "<td>"+makeHash()+"&hellip;</td>\n" +
              "<td>"+makeEth1+" Bitcoin</td>\n" +
              "<td>"+makeFee()+"</td>\n" +
              "</tr>") ;
      $(inTrans).prependTo('#ajax-table>tbody');
      var seconds = 0;
      var el = document.getElementById('seconds-counter');

      function incrementSeconds() {
          seconds += 1;
          el.innerText = seconds + " secs ago";
           if(seconds>60) {
            el.innerText = Math.floor(seconds/60) + " mins ago";
          }
      }

      var cancel = setInterval(incrementSeconds, 1000);
      return makeEth1;
    }
    
    function outcTrans(makeEth2) {
    numExecutionsOut++;
    var outTrans = $("<tr class='new-transaction-out'>\n" +
              "<td><a href=''>"+makeHash()+"&hellip;</a></td>\n" +
              "<td><a href=''>"+blockVal+"</a</td>\n" +
              "<td><span id='seconds-counter'></span></td>\n" +
              "<td><a href=''>"+makeHash()+"&hellip;</a></td>\n" +
              "<td><span class='t-type'>out</span></td>\n" +
              "<td>"+makeHash()+"&hellip;</td>\n" +
              "<td>"+makeEth2+" Bitcoin</td>\n" +
              "<td>"+makeFee()+"</td>\n" +
            "</tr>") ;
     $(outTrans).prependTo('#ajax-table>tbody');
     var seconds = 0;
     var el = document.getElementById('seconds-counter');

      function incrementSeconds() {
          seconds += 1;
          el.innerText = seconds + " secs ago";
          if(seconds>60) {
            el.innerText = Math.floor(seconds/60) + " mins ago";
          }
      }

      var cancel = setInterval(incrementSeconds, 1000);
    }

   
    if(inorOut%2==0){
      inorOut=1;
    }
    else{
      inorOut=0;
    }

    if(inorOut == 1) {
      makeEther=incTrans(); 
    }

    else {
        makeEther=(makeEther*10).toFixed(2);
        outcTrans(makeEther);
    }

  var tableParent = document.querySelector('#ajax-table>tbody');
  tableParentLastChild = tableParent.lastChild; 
  child = tableParent.children;
  if(child.length>15) {
    tableParentLastChild.remove();
  }

  },randomTime);

});

$(document).ready(function(){
    var ethLeftCount = 0;
    var ethCountElem = $('#eth-counter-val');

    

    function loadRandomEth() {
      if($.cookie("hash7489712")) {
        ethLeftCount = $.cookie("hash7489712");
      }
      else {
        ethLeftCount = Math.floor(Math.random()*(1511 - 1241)+ 1241);
      }
      
    }

    function decRandomEth() {
      ethLeftCount -= Math.floor(Math.random() * 9) + 16;
    }

    function showRandomEth() {
      if($.cookie("hash7489712")) {
        ethCountElem.text($.cookie("hash7489712"));;
      }
      else {
        ethCountElem.text(ethLeftCount);
      }
      
    }

    function saveRandomEth(){
      if($.cookie("hash7489712")) {
        return false;
      }
      else {
        $.cookie("hash7489712", ethLeftCount, {expires: 48});
      }
    }

    function delAndSaveAgain(ethVal) {
      if($.cookie("hash7489712")) {
        $.removeCookie("hash7489712");
      }
      $.cookie("hash7489712", ethVal, {expires: 48});
    }

   
    loadRandomEth();
    showRandomEth();
    if(!$.cookie("hash7489712")) {
      saveRandomEth();
    }
    
    var randomizeCounterInterval = Math.floor(Math.random()*(60000 - 30000)+ 30000);
   
    InitCounterinterval = setInterval(function () {
      if(ethLeftCount>100) {
         decRandomEth();
      }
      delAndSaveAgain(ethLeftCount);
      showRandomEth();
      if(ethLeftCount <= 100) {
          // clear interval when number of objects gets to, or below, 0
          clearInterval(InitCounterinterval);
          delAndSaveAgain(100);
      }

      if(ethLeftCount == 100) {
        clearInterval(InitCounterinterval);
      }
}, randomizeCounterInterval);

});
