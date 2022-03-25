
const randomNumber = (cant = 10e7) => {
  const arr = []
  for (let i = 0; i < cant; i++) {
    const num = Math.floor((1000)*(Math.random()));
    if (arr[num] >= 1) {
      arr[num] = arr[num] + 1;
    } else {
      arr[num] = 1
    }    
  }
  return arr
}
process.on('message', (data) => {
  console.log(data)
  const cant = isNaN(+data.cant)? undefined : +data.cant
  const arr = randomNumber(cant);
  process.send(arr);
})