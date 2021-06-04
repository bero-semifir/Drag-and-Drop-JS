// récup DOM
const zone1 = document.querySelector("#zone1")
const zone2 = document.querySelector("#zone2")

// logique drag and drop

/**
 * Actions à lancer au début du drag
 * @param {DragEvent} event 
 */
const dragStart = (event) => {
    event.stopPropagation();
    // remplissage des info du DataTransfer (objet qui sera transmit lors de l'event)
    // ici je me sert de l'id car setData n'utilise que des strings (possible de sérialiser)
    event.dataTransfer.setData("element", event.target.id);
    event.target.style.opacity = "0.1";
}

/**
 * Action à lancer au moment du drop
 * @param {DragEvent} event 
 */
const drop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    // lecture des infos dans l'objet DataTransfer
    const elementId = event.dataTransfer.getData("element");
    // récup de l'élément DOM
    const element = document.getElementById(elementId);
    element.style.opacity = "1";
    // sécu pour ne pas mettre l'élément n'import où
    if(event.target == zone1 || event.target == zone2){
        event.target.appendChild(element);
    }else{
        event.target.after(element);
    }
}

/**
 * Actions à lancer quand l'element passe au dessu d'une zone
 * @param {DragEvent} event 
 */
const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "link";
}

// écoute d'événements
    // début de drag
zone1.addEventListener("dragstart", dragStart);
zone2.addEventListener("dragstart", dragStart);
    // drop
zone1.addEventListener("drop", drop);
zone2.addEventListener("drop", drop);
    // drag au dessus d'un element
zone1.addEventListener("dragover", dragOver);
zone2.addEventListener("dragover", dragOver);