const REQUIRED_FIELD = 'Поле не может быть пустым';

export const nameValidation = {
    required: REQUIRED_FIELD,
    
};
export const emailValidation = {
    required: REQUIRED_FIELD,
    pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Введите корректный email"
          }

};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length < 6) {
            return 'Пароль должен быть длиннее 6-ти символов'
        }

        return true;
    }
};
export const passwordConfirmationValidation = {
    required: REQUIRED_FIELD,
    
    
};