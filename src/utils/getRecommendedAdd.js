getRecommendedAdd = (currentNumber) => {
  let add = 0;
  let mod = currentNumber % 3;
  if (mod == 1) {
    add = -1;
  }
  else if (mod == 2) {
    add = 1;
  }
  return add;
}

module.exports=getRecommendedAdd

