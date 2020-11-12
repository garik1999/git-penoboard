// const MAIL_FORMAT = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//
// // Отображает и скрывает подскзки
// const helpers = {
//     valid: function (el) {
//         el.find('.error').remove();
//         el.find('input').addClass('valid').removeClass('invalid');
//     },
//     invalid: function (el, text="") {
//         if(el.find('.error').length <= 0) {
//             el.append("<span class='error'>"+text+"</span>");
//         }
//         el.find('input').removeClass('valid').addClass('invalid');
//     }
// }
// // Определение типа елемента
// const config = {
//     email: function (el) {
//         setEvents(el, validationEmail, 'blur');
//     },
//     password: function (el) {
//         if(el.attr('data-equalTo') !== undefined) {
//             setEvents(el, validationPasswordTwo, 'blur');
//         } else {
//             setEvents(el, validationPassword, 'blur');
//         }
//     },
//     checkbox: function (el) {
//         setEvents(el, validationCheckBox, 'click');
//     },
//     text: function (el) {
//         setEvents(el, validationText, 'click');
//     }
// }
// // Объявление событий кождого из елементов
// function setEvents(el, callback, events = ""){
//     el.on(`input change ${events}`, function (){
//         callback(el);
//         formSubmit(el.parents('.form'));
//     });
// }
// // Финальная проверка валидности
// function formSubmit(el) {
//     let $input = el.find('input').length,
//         $input_valid = el.find('.valid').length,
//         $button = el.find('button, [type=submit]');
//     if($input === $input_valid) {
//         $button.removeClass('disabled');
//     } else {
//         $button.addClass('disabled');
//     }
// }
// // Валидация текстовых input
// function validationText(input) {
//     if(input.val().length >= 3) {
//         helpers.valid(input.parent());
//     } else {
//         helpers.invalid(input.parent(), 'Не менее 3 символов');
//     }
// }
// // Валидация поля checkbox
// function validationCheckBox(input){
//     if(input.prop('checked')) {
//         helpers.valid(input.parent());
//     } else {
//         helpers.invalid(input.parent(), 'Нужно согласится');
//     }
// }
// // Валидация поля Email
// function validationEmail(input) {
//     if(input.val().match(MAIL_FORMAT)) {
//         helpers.valid(input.parent());
//     } else {
//         helpers.invalid(input.parent(), "Не верный формат эмейл");
//     }
// }
// // Валидация поля Password
// function validationPassword(input) {
//     let name = input.attr('name')
//     input.parents('.form').find(`[data-equalTo=${name}]`).val('').blur();
//     if (input.val().length > 8) {
//         helpers.valid(input.parent());
//     } else {
//         helpers.invalid(input.parent(), "Минимум 8 символов");
//     }
// }
// // Валидация поля Password Confirm
// function validationPasswordTwo(input) {
//     let name = input.attr('data-equalTo');
//     if(typeof name !== undefined){
//         let $input_pass = input.parents('.form').find(`input[name='${name}']`);
//         if (input.val() === $input_pass.val()) {
//             helpers.valid(input.parent());
//         } else {
//             helpers.invalid(input.parent(), "Пароли не совпадают");
//         }
//     }
// }
// // Инициализация Валидации
// function initElement(form) {
//     let elements = $(`${form}`).find('input');
//     elements.each(function () {
//         let type = $(this).attr('type');
//         if(typeof type !== undefined){
//             config[type]($(this));
//         }
//     });
// }
// initElement('.form');
//

class Validation {
    constructor (form, options) {
        this.form = form;

        this.options = $.extend(true, {
            Empty: {
                helpers: {
                    empty: "Нужно заполнить"
                }
            },
            validationClass: {
                success: "valid",
                error: "invalid",
                helpers: {
                    class: "error"
                }
            },
            Email: {
                helpers: {
                    format: "Неверный формат"
                },
                format: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            },
            Password: {
                helpers: {
                    minLength: "Слишком короткий пароль",
                    maxLength: "Слишком длинный пароль"
                },
                minLength:
                    Number($('input[data-MinlengthPass]').attr('data-MinlengthPass')) || 8,
                maxLength:
                    Number($('input[data-MaxlengthPass]').attr('data-MaxlengthPass')) || 10,
            },
            PasswordConfirm: {
                helpers: {
                    confirm: 'Пароли не совпадают'
                },
            },
            Checkbox: {
                helpers: {
                    check: "Нужно согласие"
                },
            },
            Name: {
                helpers: {
                    minLength: "Слишком короткое имя",
                    maxLength: "Слишком длинное имя"
                },
                minLength:
                    Number($('input[data-MinlengthName]').attr('data-MinlengthName')) || 3,
                maxLength:
                    Number($('input[data-MaxlengthName]').attr('data-MaxlengthName')) || 10,
            },
            Surname: {
                helpers: {
                    minLength: "Слишком короткая Фамилия",
                    maxLength: "Слишком длинная Фамилия"
                },
                minLength:
                    Number($('input[data-MinlengthSurname]').attr('data-MinlengthSurname')) || 3,
                maxLength:
                    Number($('input[data-MaxlengthSurname]').attr('data-MaxlengthSurname')) || 10,
            },
        }, options || {});
        // console.log(this.options.Password.minLength)
    }
    setEvents($el, callback, events = ""){
        let self = this;

        $el.on(`input change ${events}`, function (){
            callback($el, self);
            self.formSubmit($el);
        });
    }
    formSubmit(input) {
        let $child = null;
        this.form.each(function () {
            if ($(this).find($(input)).length > 0) {
                $child = $(this);
            }
        });
        let $input = $child.find('input').length;
        let $input_valid = $child.find('.valid').length;
        let $button = $child.find('button, [type=submit]');

        if ($input === $input_valid) {
            $button.removeClass('disabled');
        } else {
            $button.addClass('disabled');
        }
    }
    validationEmail(input, self) {
        if(input.val().match(self.options.Email.format)) {
            self.initHelpers(input, true)
        } else {
            self.initHelpers(input, false, self.options.Email.helpers.format)
        }
    }
    validationPassword(input, self) {
        let name = input.attr('name');

        input.parents('.form').find(`[data-equalTo=${name}]`).val('').blur();
        self.lengthCheck(input, 'Password');
    }
    validationPasswordTwo(input, self) {
        let name = input.attr('data-equalTo');

        if(typeof name !== undefined){
            let $input_pass = input.parents('.form').find(`input[name='${name}']`);
            if (input.val() === $input_pass.val()) {
                self.initHelpers(input, true)
            } else {
                self.initHelpers(input, false, self.options.PasswordConfirm.helpers.confirm)
            }
        }
    }
    validationCheckBox(input, self){
        if(input.prop('checked')) {
            self.initHelpers(input, true)
        } else {
            self.initHelpers(input, false, self.options.Checkbox.helpers.check)
        }
    }
    validationField(input, self) {
        switch(input.attr('data-field')) {
            case 'name':
                self.lengthCheck(input, 'Name');
                break;
            case 'surname':
                self.lengthCheck(input, 'Surname');
                break;
            default:
                console.error('not field text')
                break;
        }
    }
    validationEmpty(input, self) {
        if(input.val().length > 0) {
            self.initHelpers(input, true)
        } else {
            self.initHelpers(input, false, self.options.Empty.helpers.empty)
        }
    }
    lengthCheck(input, key) {
        let inputVal = input.val().length;
        console.log(key)
        if (inputVal >= this.options[key].minLength && inputVal <= this.options[key].maxLength) {
            this.initHelpers(input, true);
        } else if (inputVal <= this.options[key].minLength) {
            this.initHelpers(input, false, this.options[key].helpers.minLength);
        } else if (inputVal >= this.options[key].maxLength) {
            this.initHelpers(input, false, this.options[key].helpers.maxLength);
        }
    }
    initHelpers(input, valid, text) {
        let parent = input.parent();
        let parentError = parent.find("." + this.options.validationClass.helpers.class);

        if (valid) {
            parentError.remove();
            input.addClass(this.options.validationClass.success)
                .removeClass(this.options.validationClass.error);
        } else {
            if (parentError.length <= 0) {
                parent.append(`<span class="${this.options.validationClass.helpers.class}">${text}</span>`);
            }
            input.removeClass(this.options.validationClass.success)
                .addClass(this.options.validationClass.error);
        }
    }

    initElement() {
        let elements = this.form.find('input, textarea');

        elements.each((index, element) => {
            let type = $(element).attr('type');
            let $el = $(element);
            if (typeof type !== undefined) {
                switch (type) {
                    case 'email':
                        this.setEvents($el, this.validationEmail);
                        break;

                    case 'password':
                        if ($el.attr('data-equalTo') !== undefined) {
                            this.setEvents($el, this.validationPasswordTwo)
                        } else {
                            this.setEvents($el, this.validationPassword)
                        }
                        break;

                    case 'checkbox':
                        this.setEvents($el, this.validationCheckBox);
                        break;

                    case 'text':
                        this.setEvents($el, this.validationField);
                        break;

                    default:
                        this.setEvents($el, this.validationEmpty)
                        break;
                }
            }
        });
    }
}
const validate = new Validation($('.form'), {
    Password: {
        minLength: 8
    }
});
validate.initElement()
