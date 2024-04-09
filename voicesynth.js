
let timerIntervalM;
let secondsM = 0;
let minutesM = 0;
const delayBetweenIntroItems = 300;
let index = 0;
let speechSynthesisUtterance;
let activeArray = 1;
var intervalID;
var activeVoice = 0;
var introPlayed = 0;
var doNotSkipIntro = "1";
  // Get the span element by its id
  var spanElement = document.getElementById("textr");
  let ideaDecisionIndex = 0; // Define a global variable to keep track of the index



//start voice synth
function next() {
  stopSpeechLoop();
      if (introPlayed == 0) {
        intro();
        introPlayed = 1;
      } else {
        guide();
      }



    
  }

function intro() {
  var what = document.getElementById("options").value;
    let currentArrayName = "intro" + what;
      // Change the text content
  spanElement.textContent = "Instructions via speakers 🔊";
    let currentArray = eval(currentArrayName);
    var introplayed = Number(intro);
    if (introplayed == 0) {



      if (whichGuide == 'none') {

      } else {
        currentArray = eval(currentArrayName);
        index = 0; // Reset index to start from the beginning
        introPlayed = 1;
        guide();
      }
      return;
    }


    if (index < currentArray.length) {
      // Use Web Speech API for text-to-speech
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(currentArray[index]);

      // Adjust the rate to make it slower (you can experiment with different values)
      utterThis.rate = 1.0; // 0.8 is a slower rate

      // Find the Irish voice
      const voices = synth.getVoices();
      const irishVoice = voices.find(voice => voice.lang === 'en-US');

      if (irishVoice) {
        utterThis.voice = irishVoice;
      } else {
        console.log('Irish voice not found. Using the default voice.');
      }

      synth.speak(utterThis);

      index++;
      utterThis.onend = () => {
        setTimeout(intro, delayBetweenIntroItems);
      };
    } else {
      // All items have been uttered, now call the randomM() function
      if (whichGuide == 'none') {

      } else {
        currentArray = eval(currentArrayName);
        index = 0; // Reset index to start from the beginning
        introPlayed = 1;
      
      }

    }
  }










  function guide() {
    // Clear any existing speech loop
    stopSpeechLoop();

 
    let what = document.getElementById("options").value;

   if (what == "Project"){
      var randomItem = getRandomItem(ideaProject);
    } else if (what == "Product"){
      var randomItem = getOrderedItem(ideaProduct);
    } else if (what == "Braindump"){
      var randomItem = getOrderedItem(ideaBraindump);
    }
    else if (what == "Decision"){
      var randomItem = getOrderedItem(ideaDecision);
    }     else if (what == "Problem"){
      var randomItem = getOrderedItem(ideaProblem);
    }
      const speed = 0.9;
      const voice = getAustralianVoice();
      spanElement.textContent = randomItem;
      speechSynthesisUtterance = new SpeechSynthesisUtterance(randomItem);
      speechSynthesisUtterance.rate = speed;
      speechSynthesisUtterance.voice = voice;
      window.speechSynthesis.speak(speechSynthesisUtterance);

     
 
  }




function getRandomItem(arr) {
  if (arr.length == 0) {
      // If the array is empty, display a message and exit the function
      
      const itemend = "Guidance is complete! Refresh page to start guided brainstorm again.";
      return itemend; // Exit the function here
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  const selectedItem = arr[randomIndex];
  arr.splice(randomIndex, 1); // Remove the selected item from the array
  return selectedItem;

}

    function getOrderedItem(arr) {
      const item = arr[ideaDecisionIndex];
      ideaDecisionIndex = (ideaDecisionIndex + 1) % arr.length; // Increment index and loop back to 0 when it reaches the end
      return item;
  }



  function stopSpeechLoop() {

    clearInterval(intervalID);
    intervalID = null; // Clear the intervalID
    window.speechSynthesis.cancel();


  }




    function getAustralianVoice() {
      const voices = window.speechSynthesis.getVoices();
      return voices.find(voice => voice.lang === 'en-US');
    }

  window.speechSynthesis.onvoiceschanged = function () {
    const updatedVoices = window.speechSynthesis.getVoices();
  };

  var gg;

  function getGuideName(gn) {
    if (gn == "Project") {
      gg = "Brainstorming New Projects/Products";
    } else if (gn == "Product") {
      gg = "Initial Product/Project Pre-Planning";
    } else if (gn == "Problem") {
      gg = "Problem Solving";
    } else if (gn == "Decision") {
      gg = "Decision Making";
    } else {
      gg = "Brain Dump";
    }
    return gg;
  }
  
  var GuideOptions = localStorage.getItem('GuideOptions');
  
  if (GuideOptions === "" || GuideOptions === null) {
    document.getElementById('options').value = "Braindump";
    spanElement.textContent = "Guided BrainStormer // Brain Dump";
  } else {
    document.getElementById('options').value = GuideOptions;
    var guideName = getGuideName(GuideOptions);
    spanElement.textContent = "Guided BrainStormer // " + guideName;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('options').addEventListener('change', function () {
      const selectedOption = this.value;
      var guideName = getGuideName(selectedOption);
      spanElement.textContent = "Guided BrainStormer | " + guideName;
      localStorage.setItem('GuideOptions', selectedOption);
      GuideOptions = selectedOption;

stopSpeechLoop();
introPlayed = 0;
activeVoice = 0;
index = 0;
ideaDecisionIndex = 0;
    });
  });