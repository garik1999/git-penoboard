const MAIL_FORMAT =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

// Отображает и скрывает подскзки
const helpers = {
    valid: function (el) {
        el.find('.error').remove();
        el.find('input').addClass('valid').removeClass('invalid');
    },
    invalid: function (el, text="") {
        if(el.find('.error').length <= 0) {
            el.append("<span class='error'>"+text+"</span>");
        }
        el.find('input').removeClass('valid').addClass('invalid');
    }
}
// Определение типа елемента
const config = {
    email: function (el) {
        setEvents(el, validationEmail, 'blur');
    },
    password: function (el) {
        if(el.attr('data-equalTo') !== undefined) {
            setEvents(el, validationPasswordTwo, 'blur');
        } else {
            setEvents(el, validationPassword, 'blur');
        }
    },
    checkbox: function (el) {
        setEvents(el, validationCheckBox, 'click');
    },
    text: function (el) {
        setEvents(el, validationText, 'click');
    }
}
// Объявление событий кождого из елементов
function setEvents(el, callback, events = ""){
    el.on(`input change ${events}`, function (){
        callback(el);
        formSubmit(el.parents('.form'));
    });
}
// Финальная проверка валидности
function formSubmit(el) {
    let $input = el.find('input').length,
        $input_valid = el.find('.valid').length,
        $button = el.find('button, [type=submit]');
    if($input === $input_valid) {
        $button.removeClass('disabled');
    } else {
        $button.addClass('disabled');
    }
}
// Валидация текстовых input
function validationText(input) {
    if(input.val().length >= 3) {
        helpers.valid(input.parent());
    } else {
        helpers.invalid(input.parent(), 'Не менее 3 символов');
    }
}
// Валидация поля checkbox
function validationCheckBox(input){
    if(input.prop('checked')) {
        helpers.valid(input.parent());
    } else {
        helpers.invalid(input.parent(), 'Нужно согласится');
    }
}
// Валидация поля Email
function validationEmail(input) {
    if(input.val().match(MAIL_FORMAT)) {
        helpers.valid(input.parent());
    } else {
        helpers.invalid(input.parent(), "Не верный формат эмейл");
    }
}
// Валидация поля Password
function validationPassword(input) {
    let name = input.attr('name')
    input.parents('.form').find(`[data-equalTo=${name}]`).val('').blur();
    if (input.val().length > 8) {
        helpers.valid(input.parent());
    } else {
        helpers.invalid(input.parent(), "Минимум 8 символов");
    }
}
// Валидация поля Password Confirm
function validationPasswordTwo(input) {
    let name = input.attr('data-equalTo');
    if(typeof name !== undefined){
        let $input_pass = input.parents('.form').find(`input[name='${name}']`);
        if (input.val() === $input_pass.val()) {
            helpers.valid(input.parent());
        } else {
            helpers.invalid(input.parent(), "Пароли не совпадают");
        }
    }
}
// Инициализация Валидации
function initElement(form) {
    let elements = $(`${form}`).find('input');
    elements.each(function () {
        let type = $(this).attr('type');
        if(typeof type !== undefined){
            config[type]($(this));
        }
    });
}
initElement('.form');


// class Validation {
//     constructor (form) {
//         this.form = form;
//     }
//     init() {
//         this.initElement();
//     }
//     initElement() {
//         let elements = this.form.find('input');
//         elements.each(function () {
//             let type = $(this).attr('type');
//             if(typeof type !== undefined){
//                 config[type]($(this));
//                 console.log(type)
//             }
//         });
//     }
// }
// const validate = new Validation($('.form'))
// console.log(validate.init())