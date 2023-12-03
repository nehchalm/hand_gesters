Webcam.set({
    width:350,
    height:300,
    image_format : 'png',

    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 versions:', ml5.versions);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mf5Arikt3/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "best")
        {
            document.getElementById("update_gester").innerHTML = "&#9994;";
        }
        if(results[0].label == "you rock")
        {
            document.getElementById("update_gester").innerHTML = "&#9996;";
        }
        if(results[0].label == "victory")
        {
            document.getElementById("update_gester").innerHTML = "&#128077;";
        }

    }
}