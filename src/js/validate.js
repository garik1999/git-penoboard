const MAIL_FORMAT =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function validate(input) {
    let label = input.parent(),
        form = input.parents('.form');
    if(input.attr('data-input') == 'email') {
        if(input.val().match(MAIL_FORMAT)) {
            console.log('test1')
            $(input).addClass('valid').removeClass('invalid')
            if(label.find('.error').length > 0) {
                label.find(".error").remove();
            }
        } else {
            $(input).removeClass('valid').addClass('invalid')
            if(label.find('.error').length == 0) {
                label.append("<span class='error'>Введен некоректный Email</span>");
            }
        }
    } else if(input.attr('data-input') == 'password') {
        if(input.val().length > 3) {
            console.log('test2')
            $(input).addClass('valid').removeClass('invalid')
            if(label.find('.error').length > 0) {
                label.find(".error").remove();
            }
        } else {
            $(input).removeClass('valid').addClass('invalid')
            if(label.find('.error').length == 0) {
                label.append("<span class='error'>Пароль слишком короткий</span>");
            }
        }
    } else if (input.attr('data-input') == 'password2'){
        if(input.val() == $(form).find('[data-input=password]').val()) {
            console.log('test3')
            $(input).addClass('valid').removeClass('invalid')
            if(label.find('.error').length > 0) {
                label.find(".error").remove();
            }
        } else {
            $(input).removeClass('valid').addClass('invalid')
            if(label.find('.error').length == 0) {
                label.append("<span class='error'>Пароль слишком короткий</span>");
            }
        }
    }
}
function formButton(form) {
    let button = $(form).find('button'),
        inputs = $(form).find('input'),
        valid = $(form).find('input.valid')

    if(inputs.length === valid.length) {
        $(button).removeClass('disabled')
    } else {
        $(button).addClass('disabled')
    }
}

$('.form input').on('input change', function () {
    validate($(this));
    formButton($(this).parents('.form'));
});
// Валидация авторизации
// function validationLoginUser() {
//     let form_auth = $('#form_login_user');
//     let form_auth_btn = $('#form_login_user').find('button');
//     $(form_auth_btn)
//         .addClass("disabled")
//         .attr("disabled", true);
//     $(form_auth).find('#user_login').on('input change', function() {
//         validationAutorization();
//         if($(this).val().match(mail_format)) {
//             $(this).addClass('log');
//         } else {
//             $(this).removeClass('log');
//         }
//     });
//     $(form_auth).find('#user_password').on('input change', function() {
//         validationAutorization();
//         if($(this).val().length > 3) {
//             $(this).addClass('pass');
//         } else {
//             $(this).removeClass('pass');
//         }
//     });
// }
// function validationAutorization() {
//     if(
//         ($('#user_login').is('.log'))
//         &&
//         ($('#user_password').is('.pass'))
//     ){
//         $('button.authorization')
//             .removeClass("disabled")
//             .attr("disabled", false);
//     } else {
//         $('button.authorization')
//             .addClass("disabled")
//             .attr("disabled", true);
//     }
// }
//
//
// // Валидация Регистрации
// function validationRegUser() {
//     let form_auth = $('#form_registration_user');
//     let form_auth_btn = $('#form_registration_user').find('button');
//     $(form_auth_btn)
//         .addClass("disabled")
//         .attr("disabled", true);
//     $(form_auth).find('#user_reg_email').on('input change', function() {
//         validationRegistration();
//         if($(this).val().match(mail_format)) {
//             $(this).addClass('log');
//         } else {
//             $(this).removeClass('log');
//         }
//     });
//     $(form_auth).find('#user_reg_password, #user_reg_password2').on('input change', function() {
//         if($('#user_reg_password').val().length > 3) {
//             $('#user_reg_password').addClass('pass');
//             if($('#user_reg_password').val() == $('#user_reg_password2').val()) {
//                 $('#user_reg_password2').addClass('pass2');
//             } else {
//                 $('#user_reg_password2').removeClass('pass2');
//             }
//         } else {
//             $('#user_reg_password').removeClass('pass');
//         }
//         validationRegistration();
//     });
// }
// function validationRegistration() {
//     if(
//         ($('#user_reg_email').is('.log'))
//         &&
//         ($('#user_reg_password').is('.pass'))
//         &&
//         ($('#user_reg_password2').is('.pass2'))
//     ){
//         $('button.registration')
//             .removeClass("disabled")
//             .attr("disabled", false);
//     } else {
//         $('button.registration')
//             .addClass("disabled")
//             .attr("disabled", true);
//     }
// }
// validationRegUser();
// validationLoginUser();