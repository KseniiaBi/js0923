export const formSubmitBtn = document.querySelector('#form-submit-btn');
export let nameOfUserArr = ['tom'];
export let userNameInfo = {
    name: '',
    get nickname() {
        return userNameInfo.name;
        }
};
     document.getElementById('form').addEventListener('submit', function (e) {
        e.preventDefault();
        userNameInfo.name = document.getElementById('user-name').value;
         if (userNameInfo.name == '') {
             alert("Enter your Nickname!!!");
             return;
         }
         for (let i = 0; i < nameOfUserArr.length; i++){
             if (userNameInfo.name === nameOfUserArr[i]) {
                 continue;
             }
             else {
                 nameOfUserArr.push(userNameInfo.name);
                 break;
             }
         }
    document.getElementById("user-name").value = " ";  
    })