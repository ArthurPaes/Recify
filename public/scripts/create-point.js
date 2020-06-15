function populateUFs(){
    const ufSelect= document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res)=> {return res.json()})
    .then((states) => {

        for(state of states){
        
           // ufSelect.innerHTML = ufSelect.innerHTML + `<option value ="${state.id}">${state.nome}</option>`

        }


        });

}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

   const ufValue = event.target.value //o evento é "change" || target > onde o evento foi executado(foi execugado no select) vai trazer o select
 
   indexOfSelectedState = event.target.selectedIndex
   stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML= ""
    citySelect.disabled = true;



    fetch(url)
    .then( (res)=> {return res.json()})
    .then(cities => {
        for(city of cities){
        
            citySelect.innerHTML = citySelect.innerHTML + `<option value ="${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false


        });
}

//document
  //      .querySelector("select[name=uf]")  
     //   .addEventListener("change", getCities) // quando o nome da uf mudar, execute a função getCities
 
//itens de coleta
 
const itemsToCollect = document.querySelectorAll('.items-grid li') // selecionar os items no items grid(lampas, p&b etc.)

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")         //cria a classe caso nao exista, remove caso exista

    // if(itemLi.classList.contains("selected")){
    //     itemLi.classList.remove("selected")
    // }


    const itemId = itemLi.dataset.id        // pega o id(dataset.id), dos elementos li(.target), quando acontecer o evento click

    //verificar se existem itens selecionados, se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex((item) =>{
        const itemFound = item == itemId
        return itemFound; 
    });
    
    console.log(alreadySelected)
    
    
    //se já estiver selecionado
    if(alreadySelected != -1){
        // tirar da seleção
        const filteredItems = selectedItems.filter( (item) =>{ // se a função filter retornar true, irá adicionar o elemento no array filteredItems. se retornar false, remove
            const itemIsDifferent = item != itemId
            return itemIsDifferent 
        })

        selectedItems = filteredItems
         //se nao estiver selecionado
    }else{
        // adicionar à seleção
        selectedItems.push(itemId)

    }
    console.log(selectedItems)
    //atualizar os campos escondidos com os itens selecionados
    collectedItems.value = selectedItems
    
}



