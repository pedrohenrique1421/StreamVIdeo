let windowy = window.scrollY;
let windowyStorage = windowy;

console.log(windowy);

if (windowy != windowyStorage) {
    windowy = window.scrollY;
    console.log(windowy);
}



const mouseOnHandle = ()=>{
    console.log("Mouse em cima")
}

const mouseOutHandle = ()=>{
    console.log("Mouse em fora")
}

