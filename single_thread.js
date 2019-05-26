sum = 0;

console.log("Start  calculation");

for (i = 0; i < 500000000; i++) sum += i;

var loop = function(){
  console.log("Response sum", sum);
}


setTimeout(loop, 0);

console.log("End calculation1");
console.log("End calculation2");
console.log("End calculation3");
console.log("End calculation4");

// Start  calculation
// Response sum
// End calculation