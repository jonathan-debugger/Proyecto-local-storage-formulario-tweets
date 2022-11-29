/*Variables*/
const listaTweets = document.getElementById('lista-tweets');


/*Event Listeners*/

eventListeners();

function eventListeners(){

       // Cuando se envia el formulario
       document.querySelector('#formulario').addEventListener('submit',agregarTweet);

       listaTweets.addEventListener('click',borrarTweet);

       // Contenido cargado del localStorage
       document.addEventListener('DOMContentLoaded',localStorageListo);
}



//Funciones


//Añadir tweet del formulario

function agregarTweet(e){
        e.preventDefault();// Para evitar o cancelar que se ejecute el action del forumario
        
        // Leer el  valor del  textarea
        const tweet = document.getElementById('tweet').value;
        
        //Crear boton de eliminar
        const botonBorrar = document.createElement('a'); // Creamos un elemento a
        botonBorrar.classList='borrar-tweet';// Añadimos una clase borrar-tweet
        botonBorrar.innerText='X';//Insertamos un x 

        
        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
              li.innerText=tweet; 
              // añade el  boton de  borrar  al tweet
              li.appendChild(botonBorrar);   
              //añade el  tweet a la  lista 
              listaTweets.appendChild(li);

        // Añadir a local storage 
        setTweetLocalStorage(tweet);      
    }


 // agregar al dom los datos de local storage
    function localStorageListo(){
       let tweets;
       tweets = getTweetsLocalStorage();
       
              tweets.forEach(function(tweet) {

                     const botonBorrar = document.createElement('a'); 
                     botonBorrar.classList='borrar-tweet';
                     botonBorrar.innerText='X';
             
                     const li = document.createElement('li');
                           li.innerText=tweet; 
                           li.appendChild(botonBorrar);   
                           listaTweets.appendChild(li);  
              });

}


    //Elimar el tweet del DOM
    function borrarTweet(e) {
           e.preventDefault();
           //Delegation
           if(e.target.className=='borrar-tweet'){
                  //Eliminando el li con traversing
                  console.log(e.target);
              e.target.parentElement.remove();
              borrarTweetLocalStorage(e.target.parentElement.textContent);
           }
           
    }


 // Agregar tweet a local storage   
 function setTweetLocalStorage(tweet){
       let tweets;
       tweets = getTweetsLocalStorage();
       
       // Añadir el nuevo tweet
       tweets.push(tweet);       
       //convierte un objeto o valor de JavaScript en una cadena de texto JSON.
       localStorage.setItem('tweets',JSON.stringify(tweets));

 }

 //Comprobando que haya  elementos en localStorage, retorna un arreglo
 function getTweetsLocalStorage() {
        let tweets;
        // Revisamos los valores de local storage
        if(localStorage.getItem('tweets')===null){
               tweets=[];

        }else{
               // Toma el valor de un objeto json o array y lo transforma a un objeto javascript
               tweets = JSON.parse(localStorage.getItem('tweets'));
              
        }
        return tweets;
 }


function  borrarTweetLocalStorage(tweet) {
       let tweets, tweetBorrar;
       //Elimina la x del tweet
       tweetBorrar= tweet.substring(0,tweet.length -1);//leo el tweet y le borro la x
       console.log(tweetBorrar);
       tweets= getTweetsLocalStorage();

       tweets.forEach(function(tweet, index) {
              if(tweetBorrar===tweet){
                     tweets.splice(index,1);
              }
       });

       console.log(JSON.stringify(tweets));


       localStorage.setItem('tweets',JSON.stringify(tweets));
       

}