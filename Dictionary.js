let myDictionaryForm = document.forms.dictionary_form;
let displayContainer = document.querySelector('[data-displayContainer]')
let searchContainer = document.querySelector('[data-searchContainer]')
let userInput = document.querySelector("input")
let templateDefinition = document.querySelector("[data-definitionTemplate]")
myDictionaryForm.onsubmit=(e)=>{
    e.preventDefault();
    let myDictionaryValue= userInput.value.trim();
    const fetchPromise = new Promise(async(resolve, reject) => {
        let data=await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+myDictionaryValue);
        let json =await data.json();

        if (data.ok) {
            resolve(json);

        }else {
            reject({mssg:"cannot fetch data from this url "+data.url,words:json});
        }
    
    }).then(getWord,rejectFetch)


}
function getWord(word) {
    let searchData = searchContainer.content.cloneNode(true).children[0];
    let title = searchData.querySelector('[data-title]');
    let speak = searchData.querySelector('[data-speak]').src = word[0].phonetics[1].audio
    let speakClick = searchData.querySelector('[data-speakClick]')
    speakClick.onclick = ()=>{
        searchData.querySelector('[data-speak]').play()
        console.log(speak);
    }
    title.textContent = word[0].word
    word.map((data,key)=>{
      let definitionTemplate = searchData.querySelector('[data-definitionTemplate]').content.cloneNode(true).children[0];
      let definition = definitionTemplate.querySelector('[data-definition]')
        console.log(data.meanings);
      definition.textContent =data.meanings[key].definitions[key].definition
      searchData.querySelector('[data-define]').append(definition)
    })  
   displayContainer.append(searchData)   
}
function rejectFetch(err) {
    console.log(err);
}








