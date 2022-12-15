
const errorMessageContainer=document.getElementById('error-message-container');
const errorMessage=document.getElementById('error-message');
const informationContainer=document.getElementById('information-container');
const weightInformationContainer=document.getElementById('weight-information-container');
const planetImage=document.getElementById('planet-image');
const planetInput=document.getElementById('planet-input');
const massInput=document.getElementById('mass-input');
const calculateWeightButton=document.getElementById('calculate-weight-button');
const planetName=document.getElementById('planet-name');
const planetWeight=document.getElementById('planet-weight');

const surfaceGravities={
    mercury : '3.37',
    venus : '8.87',
    earth : '9.798',
    moon : '1.62',
    mars : '3.71',
    jupiter : '24.92',
    saturn : '10.44',
    uranus : '8.87',
    neptune : '10.15',
    pluto : '0.58'
}


init();

function init(){
    errorMessage.innerText='Please select a Planet';

    planetInput.addEventListener('change',selectPlanet);

    calculateWeightButton.addEventListener('click',calculateWeight);
}

function selectPlanet(event){
    const value=event.target.value;

    if(!value){
        informationContainer.style.display='none';
        errorMessageContainer.style.display='block';
        errorMessage.innerText('Please select a planet');
    }else{
        informationContainer.style.display='flex';
        errorMessageContainer.style.display='none';
        weightInformationContainer.style.display='none';
        planetImage.setAttribute('src',`https://raw.githubusercontent.com/geeksterin/WebCurriculum/master/Advance%20Js/Day-04/Project%20image/${value}.png`);
    }
}


function calculateWeight(){
    const massValue=massInput.value;

    if(validateMass(massValue)){
        weightInformationContainer.style.display='flex';
        planetName.innerText=planetInput.value;
        planetWeight.innerText=`${convertMassIntoWeight(massInput.value,planetInput.value)} N`;
    }else{
        informationContainer.style.display='none';
        errorMessageContainer.style.display='block';
        errorMessage.innerText='mass is required';

        setTimeout(()=>
        {
            informationContainer.style.display='flex';
            errorMessageContainer.style.display='none';
        },3000)
    }
}

function validateMass(massValue){
    return massValue ? !isNaN(massValue) : false;
}

function convertMassIntoWeight(mass, planet){
    let W=(mass*surfaceGravities[planet]).toFixed(2);
    return W;
}
