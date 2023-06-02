prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("webcam");

Webcam.attach('#webcam');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image src="' + data_uri + '"/>'
    });
}

console.log('ml5 version -', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/90bGimfnk/model.json", modelLoaded)

function modelLoaded() {
    console.log('Model Loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is "+ prediction1;
    speak_data_2 = "The second prediction is "+ prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function predict() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("prediction1").innerHTML = results[0].label;
        document.getElementById("prediction2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
    }
    if(results[0].label == "peace"){
        document.getElementById("icon1").innerHTML = "&#9996;";
    }
    if(results[0].label == "perfect"){
        document.getElementById("icon1").innerHTML = "&#128076;";
    }
    if(results[0].label == "thumbs_up"){
        document.getElementById("icon1").innerHTML = "&#128077;";
    }
    if(results[0].label == "thumbs_down"){
        document.getElementById("icon1").innerHTML = "&#128078;";
    }
    if(results[0].label == "fist"){
        document.getElementById("icon1").innerHTML = "&#9994;";

    }
    if(results[1].label == "peace"){
        document.getElementById("icon2").innerHTML = "&#9996;";
    }
    if(results[1].label == "thumbs_up"){
        document.getElementById("icon2").innerHTML = "&#128077;";
    }
    if(results[1].label == "thumbs_down"){
        document.getElementById("icon2").innerHTML = "&#128078;";
    }
    if(results[1].label == "perfect"){
        document.getElementById("icon2").innerHTML = "&#128076;";
    }
    if(results[1].label == "fist"){
        document.getElementById("icon2").innerHTML = "&#9994;";
    }
}
