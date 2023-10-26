// let numbers = 15;

// if (numbers >= 0 && numbers <= 14) {
//     console.log("Число в первой четверти часа");
// } else if (numbers >= 15 && numbers <= 29) {
//     console.log("Число во второй четверти часа");
// } else if (numbers >= 30 && numbers <= 44) {
//     console.log("Число в третьей четверти часа");
// } else {
//     console.log("Число попадает в четвертую четверть часа");
// }




// let a = 5; 

// if (a === 0 || a === 2) {
//     a += 7;
// } else {
//     a = a/10;
// }


// console.log(a);




// let test = true; 

// if (test === true) {
//     console.log('Верно');
// } else {
//     console.log('Неверно');
// }

// 1) создать два массива с длиной 10 и произвольными числами в нем. Из них слепить третий, в котором каждый элемент будет суммой элементов с тем же индексом из двух базовых массивов.

// const array1 = [3, 4, 3, 4, 3, 5, 3, 8, 1, 10];
// const array2 = [10, 9, 0, 7, 6, 2, 4, 3, 0, 1];

// const resultArray = [];


// for (let i = 0; i < array1.length; i++) {
//   resultArray[i] = array1[i] + array2[i];
// }


// console.log(resultArray);


// Найти сумму чисел в массиве [[1,2,3], [4,5,6]]


// const Array = [[1, 2, 3], [4, 5, 6]];
// let sum = 0;


// for (let i = 0; i < Array.length; i++) {
//   for (let j = 0; j < Array[i].length; j++) {
  
//     sum += Array[i][j];
//   }
// }


// // console.log(sum);

// function checkFive(arr) {
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] === 5) {
//         console.log('Есть');
//         break; 
//     }
// }
// }
// const myArray = [1, 2, 3, 4, 5, 6];
// checkFive(myArray);




// function fibonacci(n) {
//     if (n <= 2) {
//         return 1;
//   } else {
//     return fibonacci(n - 1) + fibonacci(n - 2);
// }
// }

// const n = 20
// const result = fibonacci(n);
// console.log(`число Фибоначчи: ${result}`);




function checkPageUrl(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
   console.log("URL успешный" + url);


  } else {
    console.error("Ошибка Url должен начинатся с http или https")
  }
}

checkPageUrl("http://rozetka.com")
checkPageUrl("https://market.com")
checkPageUrl("apple.com")


function countLetters(str1, str2) {
  const lettersCount = {};

  for (let letter of str1) {
      if (str2.includes(letter)) {
          if (lettersCount[letter]) {
              lettersCount[letter]++;
          } else {
              lettersCount[letter] = 1;
          }
      }
  }

  return lettersCount;
}

const result = countLetters("frontend", "backend");
console.log(result);
