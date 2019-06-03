// 1. Callback
// 2. Promises
// 3. Async/Await

var request = require("request");

console.log("1. Start execution");

// function getResponseFrom5APIs() {
//   request("api1", function(error1, body1) {
//     request("api1", function(error2, body2) {
//       request("api1", function(error3, body3) {
//         request("api1", function(error4, body4) {
//           request("api1", function(error5, body5) {
//             if (error1 || error2 || error3 || error4 || error5) throw new Error();
//             return (body1, body2, body3, body4, body5)
//           });
//         });
//       });
//     });
//   });
// }

// function getResponseFrom5APIsAsPromises(){
//   request("api1").then(resp1 => {
//     request("api1").then(resp2 => {
//       request("api1").then(resp3 => {
//         request("api1").then(resp4 => {
//           request("api1").then(resp5 => {
//             if (error1 || error2 || error3 || error4 || error5) throw new Error();
//             return (body1, body2, body3, body4, body5)
//           })
//         })
//       })
//     })
//   })
// }

async function getResponseFrom5APIsAsAsyncAwait(){
  try{
    resp1 = request("api1");
    resp2 = request("api1");
    resp3 = request("api1");
    resp4 = request("api1");
    resp5 = request("api1");
    return (resp1, resp2, resp3, resp4 , resp5)
  } catch(e){
    throw e
  }
}


promise1 = new Promise((resolve, reject) => {
  request("https://jsonplaceholder.typicode.com/todos/1", function(
    error,
    _response,
    body
  ) {
    if (error) reject(error);
    else resolve(body);
  });
});

promise2 = new Promise((resolve, reject) => {
  request("https://jsonplaceholder.typicode.com/albums/1", function(
    error,
    _response,
    body
  ) {
    if (error) reject(error);
    else resolve(body);
  });
});

/*
STEPS TO WRITE A FUNCTION IN ASYNC AWAIT
1. Declare the function to be async
2. Write await in front of any function which returns a [PROMISE]
*/

const f = (async function() {
  resp1 = await promise1;
  resp2 = await promise2;
  console.log("2. Body", resp1, resp2);
})();

/*
1. Call API 1
2. If API 1 is success, Call API 2
3. If API 1 is failure, throw error
4. (2), If API 2 is succes, send resp
5. (2), If API 2 is failure, throw error
*/

/*
1. Call API 1 and API 2, simultaneously
2. If any fails, throw error
3. If both succeed, send resp
*/

// Promise.all([promise1, promise2])
//   .then(values => {
//     console.log("2. Body", values[0], values[1]);
//   })
//   .catch(e => console.error(e));

// promise1
//   .then(x => {
//     promise2.then(y => {
//       console.log("2. Body", x, y);
//     });
//   })
//   .catch(e => console.error(e));

console.log("3. End API call");
