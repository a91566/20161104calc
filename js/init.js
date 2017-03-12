$(function(){
  $('#btnCalc').click(
    function(){
      if(Number($("#txtPoint").val())<0){
        $("#txtPoint").attr('value','0');
      }
      if(Number($("#txtPoint").val())>5){
        $("#txtPoint").attr('value','5');
      }
      $("#result").html('');
      var iCount = $("#txtCreateCount").val();
      var arrayObj = new Array();　
      if(Number($("#txtDeviation").val())>1){
        var mixNum = Number(-$("#txtDeviation").val()) + 1;
        var maxNum = Number($("#txtDeviation").val()) - 1;
        for (var i = 0; i < iCount; i++) {
          var temp = GetRandomNum(mixNum,maxNum);
          temp = Number(temp) + Number(GetRandomFloat(6)) + Number($("#txtMiddle").val());
          arrayObj[i] = temp.toFixed(Number($("#txtPoint").val()));
        }
      }else{
        for (var i = 0; i < iCount; i++) {
          if(Math.round(Math.random())==1){    
            var temp = Number($("#txtMiddle").val()) - Number(GetRandomFloat(6));          
          }else{
            var temp = Number($("#txtMiddle").val()) + Number(GetRandomFloat(6));            
          }
          arrayObj[i] = temp.toFixed(Number($("#txtPoint").val()));
        }
      }
      
      var output="";
      for (var i = 0; i < arrayObj.length; i++) {
        if(i%2 ==0){
          output+="<span class='result-item result-item-0'>"+arrayObj[i]+"</span>";   
        }else{       
          output+="<span class='result-item'>"+arrayObj[i]+"</span>";
        }
      }
      $("#result").html(output);
      var arrAvg = arrAverageNum(arrayObj).toFixed(Number($("#txtPoint").val()));
      var arrSD = getStandardDeviation(arrayObj).toFixed(Number($("#txtPoint").val()));
      var arrCD = getCoefficientofVariation(arrSD,arrAvg).toFixed(Number($("#txtPoint").val()))+"%";
      $("#result-avg").html(arrAvg);
      $("#result-StandardDeviation").html(arrSD);
      $("#result-cv").html(arrCD);



      //var tt = [1,2,3,4,5];
      //alert(getStandardDeviation(arrayObj));
      //$("#result-StandardDeviation").html(getStandardDeviation(tt).toFixed(Number($("#txtPoint").val())));

    }
  );
});
$(function(){
  $('#btnUpPoint').click(function(){
    $('#txtPoint').attr('value',parseInt($('#txtPoint').val())+1);
  });
  $('#btnDownPoint').click(function(){
    $('#txtPoint').attr('value',parseInt($('#txtPoint').val())-1);
  });
  $('#btnUpCreateCount').click(function(){
    $('#txtCreateCount').attr('value',parseInt($('#txtCreateCount').val())+1);
  });
  $('#btnDownCreateCount').click(function(){
    $('#txtCreateCount').attr('value',parseInt($('#txtCreateCount').val())-1);
  });  
});
function GetRandomNum(Min,Max){
  var Range = Max - Min;
  var Rand = Math.random();
  return(Min + Math.round(Rand * Range));
};
function GetRandomFloat(floatLength){
  var num=Math.random();
  return num.toFixed(floatLength);
};
function arrAverageNum(arr){
  var sum = eval(arr.join("+"));
  return ~~(sum/arr.length*100)/100;
};
function getStandardDeviation(arr){
  var avg = arrAverageNum(arr);
  var temp=0;
  for (var i = 0; i < arr.length; i++) {
    temp = Number(temp) + ((arr[i]-avg) * (arr[i]-avg));
  }
  return temp/(arr.length -1);
};
function getCoefficientofVariation(StandardDeviation,avg){
  return StandardDeviation/avg*100;
};
