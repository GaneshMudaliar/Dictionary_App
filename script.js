const form =document.querySelector("form");
const resultDiv =document.querySelector(".result");
let wordInput = document.querySelector(".word-input")
// console.log(wordInput.value)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(wordInput.value);
})



async function getWordInfo(word) {

  try{

    resultDiv.innerHTML = "Fetching data ...";
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  
  const data = await response.json();
  // console.log(data);

  // console.log(data[0].phonetics[0].audio);

   // fetching data and add in html 
  
  let definitions = data[0].meanings[0].definitions[0]

  resultDiv.innerHTML = `
      <h2><strong>Word :</strong> ${data[0].word}</h2>

      <p><strong>Meaning : </strong>${definitions.definition === undefined ?  "Not Found" : definitions.definition}</p>

      <p><strong>Example : </strong>${definitions.example === undefined ?  "Not Found" : definitions.example}</p>

      <ion-icon name="play" class ="playIcon"></ion-icon>

      
  `;
  

  resultDiv.innerHTML +=`<a href="${data[0].sourceUrls}" target= "_blank">Read More</a>`;


  function playAudio() { 
    
    let audioLink = new Audio(`${data[0].phonetics[0].audio}`);
    audioLink.play();
    
  }


  let playIcon = document.querySelector(".playIcon");
  if(data[0].phonetics[0].audio === '') {
    playIcon.style.visibility="hidden"

  }
  playIcon.addEventListener("click",playAudio);
  

 }catch(error){
    resultDiv.innerHTML = `<p>Sorry, the word not found </p>`;
    
 }


}


