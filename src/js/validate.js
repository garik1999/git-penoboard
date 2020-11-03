const mail_format =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

// Валидация авторизации
function validationLoginUser() {
    let form_auth = $('#form_login_user');
    let form_auth_btn = $('#form_login_user').find('button');
    $(form_auth_btn)
        .addClass("disabled")
        .attr("disabled", true);
    $(form_auth).find('#user_login').on('input change', function() {
        validationAutorization();
        if($(this).val().match(mail_format)) {
            $(this).addClass('log');
        } else {
            $(this).removeClass('log');
        }
    });
    $(form_auth).find('#user_password').on('input change', function() {
        validationAutorization();
        if($(this).val().length > 3) {
            $(this).addClass('pass');
        } else {
            $(this).removeClass('pass');
        }
    });
}
function validationAutorization() {
    if(
        ($('#user_login').is('.log'))
        &&
        ($('#user_password').is('.pass'))
    ){
        $('button.authorization')
            .removeClass("disabled")
            .attr("disabled", false);
    } else {
        $('button.authorization')
            .addClass("disabled")
            .attr("disabled", true);
    }
}


// Валидация Регистрации
function validationRegUser() {
    let form_auth = $('#form_registration_user');
    let form_auth_btn = $('#form_registration_user').find('button');
    $(form_auth_btn)
        .addClass("disabled")
        .attr("disabled", true);
    $(form_auth).find('#user_reg_email').on('input change', function() {
        validationRegistration();
        if($(this).val().match(mail_format)) {
            $(this).addClass('log');
        } else {
            $(this).removeClass('log');
        }
    });
    $(form_auth).find('#user_reg_password, #user_reg_password2').on('input change', function() {
        if($('#user_reg_password').val().length > 3) {
            $('#user_reg_password').addClass('pass');
            if($('#user_reg_password').val() == $('#user_reg_password2').val()) {
                $('#user_reg_password2').addClass('pass2');
            } else {
                $('#user_reg_password2').removeClass('pass2');
            }
        } else {
            $('#user_reg_password').removeClass('pass');
        }
        validationRegistration();
    });
}
function validationRegistration() {
    if(
        ($('#user_reg_email').is('.log'))
        &&
        ($('#user_reg_password').is('.pass'))
        &&
        ($('#user_reg_password2').is('.pass2'))
    ){
        $('button.registration')
            .removeClass("disabled")
            .attr("disabled", false);
    } else {
        $('button.registration')
            .addClass("disabled")
            .attr("disabled", true);
    }
}
validationRegUser();
validationLoginUser();