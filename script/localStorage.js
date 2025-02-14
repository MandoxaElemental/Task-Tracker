function saveToLocalStorage(myData) {
    let dataArr = getLocalStorage();
    if (!dataArr.includes(myData)) {
        dataArr.push(myData);
    }
    localStorage.setItem('Task', JSON.stringify(dataArr));

}

function getLocalStorage(){
    let localStorageData = localStorage.getItem('Task');
    if (localStorageData == null) {
        return [];
    }
    return JSON.parse(localStorageData);
}

// function updateLocalStorage(myData){
//     // let dataArr = getLocalStorage();
//     // let myDataindex = dataArr.indexOf(myData);
//     // dataArr.splice(myDataindex, 1);
//     // localStorage.setItem('Task', JSON.stringify(dataArr));
// }

function removeFromLocalStorage(myData){
    let dataArr = getLocalStorage();
    let myDataindex = dataArr.indexOf(myData);
    dataArr.splice(myDataindex, 1);
    localStorage.setItem('Task', JSON.stringify(dataArr));
}



export{saveToLocalStorage, getLocalStorage, removeFromLocalStorage }