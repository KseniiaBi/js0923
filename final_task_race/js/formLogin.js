export const formSubmitBtn = document.querySelector('#form-submit-btn');
export let nameOfUserArr = ['tom'];
export let userNameInfo = {
    name: '',
    countCrash: 0,
    score: 10,
    get nickname() {
        return this.name;// return userNameInfo.name;//return document.getElementById('user-name').value;
        }
};
const formContainer = document.querySelector('#form');

    formContainer.addEventListener('submit', function (e) {
        e.preventDefault();
    
        userNameInfo.name = document.getElementById('user-name').value;
        if (userNameInfo.name == '') {
            alert("Enter your Nickname!!!");
            return;
        }
        if (userNameInfo.name.length < 3 || userNameInfo.name.length > 14) {
            alert("Nickname's length should be 3-14 symbols");
            document.getElementById("user-name").value = " ";  
            return;
        }
        for (let i = 0; i < nameOfUserArr.length; i++){
             if (nameOfUserArr.includes(userNameInfo.name)) {
                 continue;
             }
             else {
                 nameOfUserArr.push(userNameInfo.name);
                 break;
            }    
        }        
        document.getElementById("user-name").value = " ";  
        return nameOfUserArr;
    })