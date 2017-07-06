import $ from 'jquery';

// assign dom
var btn = document.querySelector('.seeResult');
btn.addEventListener('click', getHeightandWeight);
var recordsList = document.querySelector('.BMI-records__list');
var data = JSON.parse(localStorage.getItem('listData')) || [];

// Listen and update
recordsList.addEventListener('click', toggleDone);
updateRecordsList(data);

function getDate() {
    var addZero = function (num) {
        var numString = String(num);
        while (numString.length < 2) {
            numString = '0' + numString;
        }
        return numString;
    }

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    var output = addZero(month + 1) + '-' + addZero(date) + '-' + year;
    // console.log('output: '+output);
    return output;
}


//get the values of inputHeight &  inputWeight
function getHeightandWeight(e) {
    e.preventDefault();
    var JSONData = {
        "height" : $('.inputHeight').val(),
        "weight" : $('.inputWeight').val()
    }
    if(JSONData.height == ''){alert('請填入身高cm.'); $('.seeResult').css('display','block'); return false; }
    if(JSONData.weight == ''){alert('請填入體重kg.'); $('.seeResult').css('display','block'); return false; }
    var inputHeight = document.querySelector('.inputHeight').value;
    var inputWeight = document.querySelector('.inputWeight').value;
    console.log('inputHeight: ' + inputHeight);
    console.log('inputWeight: ' + inputWeight);
    getBMI(inputHeight, inputWeight);
}




// get BMI
var getBMI = function (h, w) {
    var description = null;
    var listClass = null;
    var height = h / 100;
    //console.log(height+'m');
    var BMI = w / Math.pow(height, 2);
    BMI = Math.round(BMI * 100) / 100;
    console.log('Your BMI is: ' + BMI);
    console.log(getDate());

    // BMI Analysis
    if (BMI >= 22 && BMI <= 24) {
        $('#result .description').text('理想');
        $('#BMI-value').text(BMI);
        $('#result').removeClass();
        $('#deco--loop').removeClass();
        $('#result').addClass('result--ideal');
        $('#deco--loop').addClass('deco--bg-ideal');
        listClass = 'ideal';
        description ='理想';
        console.log('理想');
    }
    if (BMI < 22) {
        $('#result .description').text('過輕');
        $('#BMI-value').text(BMI);
        $('#result').removeClass();
        $('#deco--loop').removeClass();
        $('#result').addClass('result--Too-light');
        $('#deco--loop').addClass('deco--bg-Too-light');
        listClass = 'Too-light';
        description = '過輕';
        console.log('過輕');
    }
    if (BMI >= 24 && BMI <= 27) {
        $('#result .description').text('過重');
        $('#BMI-value').text(BMI);
        $('#result').removeClass();
        $('#deco--loop').removeClass();
        $('#result').addClass('result--Too-heavy');
        $('#deco--loop').addClass('deco--bg-Too-heavy');
        listClass = 'Too-heavy';
        description = '過重';
        console.log('過重');
    }
    if (BMI >= 27 && BMI <= 30) {
        $('#result .description').text('輕度肥胖');
        $('#BMI-value').text(BMI);
        $('#result').removeClass();
        $('#deco--loop').removeClass();
        $('#result').addClass('result--Mildly-obese');
        $('#deco--loop').addClass('deco--bg-Mildly-obese');
        listClass = 'Mildly-obese';
        description = '輕度肥胖';
        console.log('輕度肥胖');
    }
    if (BMI >= 30 && BMI <= 33) {
        $('#result .description').text('中度肥胖');
        $('#BMI-value').text(BMI);
        $('#result').removeClass();
        $('#deco--loop').removeClass();
        $('#result').addClass('result--Moderate-obesity');
        $('#deco--loop').addClass('deco--bg-Moderate-obesity');
        listClass = 'Moderate-obesity';
        description = '中度肥胖';
        console.log('中度肥胖');
    }
    if (BMI > 33) {
        $('#result .description').text('重度肥胖');
        $('#BMI-value').text(BMI);
        $('#result').removeClass();
        $('#deco--loop').removeClass();
        $('#result').addClass('result--Severe-obesity');
        $('#deco--loop').addClass('deco--bg-Severe-obesity');
        listClass = 'Severe-obesity';
        description = '重度肥胖';
        console.log('重度肥胖');
    }
    $('.seeResult').css('display', 'none');
    $('#result').css('display', 'block');

    // Join the list and synchronize updates web page with localstorage
    
    var BMIRecordsList = {
        class: listClass,
        description: description,
        height: h,
        weight: w,
        BMI: BMI,
        output: getDate()
    };
    data.push(BMIRecordsList);
    updateRecordsList(data);
    localStorage.setItem('listData', JSON.stringify(data));
}

// update web content of BMIRecordsList
function updateRecordsList(items) {
    var str = '';
    var len = items.length;
    for (var i = 0; len > i; i++) {
        str += '<li class="col-md-12 '+items[i].class+'" data-index='+ i +'><div id' +
            ' ="BMI-status">'+items[i].description+'</div><div id = "BMI"><label' +  ' for = "BMI" > BMI </label>'+items[i].BMI+'</div><div id = "weight"><label for = "weight">weight</label>'+items[i].weight+'kg</div><div id = "height"><label for = "height">height</label>'+items[i].height+'cm</div>'+'<div id = "BMI-recorded-date">'+items[i].output+'</div></li>';
    }
    recordsList.innerHTML = str;
}

function toggleDone(e) {
    e.preventDefault();
    if(e.target.nodeName !== 'LI'){return};
    var c = confirm('Are you sure to delete this item??');
    if(c == true){
        var index = e.target.dataset.index;
        data.splice(index, 1);
        localStorage.setItem('listData', JSON.stringify(data));
        updateRecordsList(data);
    }else {
        return;
    }  
    
}


// loop
$('#result span#deco--loop').click(function (e) {
    e.preventDefault();
    $('.inputHeight').val('');
    $('.inputWeight').val('');
    $('.seeResult').css('display', 'block');
    $('#result').css('display', 'none');
});
