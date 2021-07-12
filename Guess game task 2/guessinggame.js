let btn = document.getElementById('btn');
let output = document.getElementById('outputtext');

let number = Math.floor(Math.random()*100)
btn.addEventListener('click',function(){
    let input = document.getElementById('userinput').value;
    if(input==number){
        output.innerHTML = `Congratulations, You Guessed it right.`
    } else if (input<number){
        output.innerHTML=`Your guess is low.`
    } else{
        output.innerHTML=`Your guess is High.`
    }
});