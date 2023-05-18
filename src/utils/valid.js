const valid = ({fullname, username, email, password, cf_password}) => {
    const err = {}

    if(!fullname) {
        err.fullname = "Поле не может быть пустым."
    }else if(fullname.length > 25){
        err.fullname = "Имя не может быть длиннее 25 символов."
    }

    if(!username) {
        err.username = "Поле не может быть пустым."
    }else if(username.replace(/ /g, '').length > 25){
        err.username = "Имя не может быть длиннее 25 символов."
    }

    if(!email) {
        err.email = "Добавьте ваш email."
    }else if(!validateEmail(email)){
        err.email = "Введите корректный еmail."
    }

    if(!password) {
        err.password = "Пожалуйста введите пароль."
    }else if(password.length < 6){
        err.password = "Пароль должен быть длиннее 6 символов."
    }

    if(password !== cf_password) {
        err.cf_password = "Пароли не совпадают."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}



function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
export default valid