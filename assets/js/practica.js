let listaTweets=document.querySelector('#lista-tweets');

eventListeners();


function eventListeners() {
     const formulario= document.querySelector('#formulario');
           formulario.addEventListener('submit',agregarTweet);
     
      listaTweets.addEventListener('click',borrarTweets); 

      window.addEventListener('DOMContentLoaded',listarTweetsLocalStorage);
}


function agregarTweet(e){
      e.preventDefault();
            const tweet=document.getElementById('tweet').value.trim(),
                  li=document.createElement('li'),
                  botonBorrar=document.createElement('a');

                  botonBorrar.classList='borrar-tweet';
                  botonBorrar.innerText='X';
                                    
                  li.innerText=tweet;
                  li.appendChild(botonBorrar);
                     listaTweets.appendChild(li);
                  
                  setTweetsLocalStorage(tweet);
                  
}

function borrarTweets(e){
      e.preventDefault();
      if(e.target.classList == 'borrar-tweet'){
            e.target.parentElement.remove();   
      }
     
      borrarTweetsLocalStorage(e.target.parentElement.textContent);

}

function getTweetsLocalStorage() {
      let tweets; 

      if(localStorage.getItem('tweets')===null){
            tweets=[];
      }else{
            tweets=JSON.parse(localStorage.getItem('tweets'));
      }
      return tweets;
}

function setTweetsLocalStorage(tweet) {
      let tweets= getTweetsLocalStorage();
          
          tweets.push(tweet);      
            
         localStorage.setItem('tweets',JSON.stringify(tweets));   
}


function listarTweetsLocalStorage() {
      const tweets = getTweetsLocalStorage();

      tweets.forEach(tweet => {
            const li = document.createElement('li'),
                   a = document.createElement('a');

                   a.classList = 'borrar-tweet';
                   a.innerText = 'X';
                   li.innerText = tweet;
                   li.appendChild(a);
            listaTweets.appendChild(li);       
      });
}

function borrarTweetsLocalStorage(tweet){
      
      let tweets, borrarTweet;
          borrarTweet = tweet.substring(0,tweet.length - 1);
            
          tweets = getTweetsLocalStorage();
          tweets.forEach(function(tweet,index){

              if(tweet == borrarTweet){
                  tweets.splice(index,1);
              }

          });

       localStorage.setItem('tweets',JSON.stringify(tweets));      

      
}