let sel = document.querySelectorAll('.currency')
let btn = document.getElementById('btn')
let input = document.getElementById('input')
fetch('https://api.frankfurter.app/currencies')
.then(res => res.json())
.then(res => display(res))

function display(res){
  let cur = Object.entries(res);
  for( let i=0;i<cur.length;i++){
      let opt = `<option value="${cur[i][0]}">${cur[i][1]} (${cur[i][0]})</option>`
      sel[0].innerHTML += opt
      sel[1].innerHTML += opt 
    }
}

btn.addEventListener('click',()=>{
  let cur1 = sel[0].value
  let cur2 = sel[1].value
  let inputVal = input.value
  if(cur1===cur2)
    alert("Choose different currencies")
  else
    convert(cur1,cur2,inputVal)
});

function convert(cur1,cur2,inputVal){
  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=${inputVal}&from=${cur1}&to=${cur2}`)
  .then(resp => resp.json())
  .then((data) => {
    let resul = Object.values(data.rates)[0];
    if (resul >= 1000) {
      const resull = resul.toLocaleString();
      document.getElementById('result').value = resull;
    }
    document.getElementById('result').value = resul;
  });

}