$(document).ready(function(){
    phone_mask = { 
    "AC": "+247 ####", 
    "AD": "+376 ### ###", 
    "AE": "+971 5# ### ####", 
    "AE": "+971 # ### ####", 
    "AF": "+93 ## ### ####", 
    "AG": "+1 268 ### ####", 
    "AI": "+1 264 ### ####", 
    "AL": "+355 ### ### ###", 
    "AM": "+374 ## ### ###", 
    "AN": "+599 ### ####", 
    "AN": "+599 ### ####", 
    "AN": "+599 9### ####", 
    "AO": "+244 ### ### ###", 
    "AQ": "+672 1## ###", 
    "AR": "+54 ### ### ####", 
    "AS": "+1 684 ### ####", 
    "AT": "+43 ### ### ####", 
    "AU": "+61 # #### ####", 
    "AW": "+297 ### ####", 
    "AZ": "+994 ## ### ## ##", 
    "BA": "+387 ## #####", 
    "BA": "+387 ## ####", 
    "BB": "+1 246 ### ####", 
    "BD": "+880 ## ### ###", 
    "BE": "+32 ### ### ###", 
    "BF": "+226 ## ## ####", 
    "BG": "+359 ### ### ###", 
    "BH": "+973 #### ####", 
    "BI": "+257 ## ## ####", 
    "BJ": "+229 ## ## ####", 
    "BM": "+1 441 ### ####", 
    "BN": "+673 ### ####", 
    "BO": "+591 # ### ####", 
    "BR": "+55 ## #### ####", 
    "BR": "+55 ## 7### ####", 
    "BR": "+55 ## 9#### ####", 
    "BS": "+1 242 ### ####", 
    "BT": "+975 17 ### ###", 
    "BT": "+975 # ### ###", 
    "BW": "+267 ## ### ###", 
    "BY": "+375 ## ### ## ##", 
    "BZ": "+501 ### ####", 
    "CA": "+1 ### ### ####", 
    "CD": "+243 ### ### ###", 
    "CF": "+236 ## ## ####", 
    "CG": "+242 ## ### ####", 
    "CH": "+41 ## ### ####", 
    "CI": "+225 ## ### ###", 
    "CK": "+682 ## ###", 
    "CL": "+56 # #### ####", 
    "CM": "+237 #### ####", 
    "CN": "+86 ### #### ####", 
    "CN": "+86 ### #### ###", 
    "CN": "+86 ## ##### #####", 
    "CO": "+57 ### ### ####", 
    "CR": "+506 #### ####", 
    "CU": "+53 # ### ####", 
    "CV": "+238 ### ## ##", 
    "CW": "+599 ### ####", 
    "CY": "+357 ## ### ###", 
    "CZ": "+420 ### ### ###", 
    "DE": "+49 #### ### ####", 
    "DE": "+49 ### ### ####", 
    "DE": "+49 ### ## ####", 
    "DE": "+49 ### ## ###", 
    "DE": "+49 ### ## ##", 
    "DE": "+49 ### ###", 
    "DJ": "+253 ## ## ## ##", 
    "DK": "+45 ## ## ## ##", 
    "DM": "+1 767 ### ####", 
    "DO": "+1 809 ### ####", 
    "DO": "+1 829 ### ####", 
    "DO": "+1 849 ### ####", 
    "DZ": "+213 ## ### ####", 
    "EC": "+593 ## ### ####", 
    "EC": "+593 # ### ####", 
    "EE": "+372 #### ####", 
    "EE": "+372 ### ####", 
    "EG": "+20 ### ### ####", 
    "ER": "+291 # ### ###", 
    "ES": "+34 ### ### ###", 
    "ET": "+251 ## ### ####", 
    "FI": "+358 ### ### ## ##", 
    "FJ": "+679 ## #####", 
    "FK": "+500 #####", 
    "FM": "+691 ### ####", 
    "FO": "+298 ### ###", 
    "FR": "+262 ##### ####", 
    "FR": "+33 ### ### ###", 
    "FR": "+508 ## ####", 
    "FR": "+590 ### ### ###", 
    "GA": "+241 # ## ## ##", 
    "GD": "+1 473 ### ####", 
    "GE": "+995 ### ### ###", 
    "GF": "+594 ##### ####", 
    "GH": "+233 ### ### ###", 
    "GI": "+350 ### #####", 
    "GL": "+299 ## ## ##", 
    "GM": "+220 ### ## ##", 
    "GN": "+224 ## ### ###", 
    "GQ": "+240 ## ### ####", 
    "GR": "+30 ### ### ####", 
    "GT": "+502 # ### ####", 
    "GU": "+1 671 ### ####", 
    "GW": "+245 # ######", 
    "GY": "+592 ### ####", 
    "HK": "+852 #### ####", 
    "HN": "+504 #### ####", 
    "HR": "+385 ## ### ###", 
    "HT": "+509 ## ## ####", 
    "HU": "+36 ### ### ###", 
    "ID": "+62 8## ### ####", 
    "ID": "+62 ## ### ##", 
    "ID": "+62 ## ### ###", 
    "ID": "+62 ## ### ####", 
    "ID": "+62 8## ### ###", 
    "ID": "+62 8## ### ## ###", 
    "IE": "+353 ### ### ###", 
    "IL": "+972 5# ### ####", 
    "IL": "+972 # ### ####", 
    "IN": "+91 #### ### ###", 
    "IO": "+246 ### ####", 
    "IQ": "+964 ### ### ####", 
    "IR": "+98 ### ### ####", 
    "IS": "+354 ### ####", 
    "IT": "+39 ### #### ###", 
    "JM": "+1 876 ### ####", 
    "JO": "+962 # #### ####", 
    "JP": "+81 ## #### ####", 
    "JP": "+81 ### ### ###", 
    "KE": "+254 ### ######", 
    "KG": "+996 ### ### ###", 
    "KH": "+855 ## ### ###", 
    "KI": "+686 ## ###", 
    "KM": "+269 ## #####", 
    "KN": "+1 869 ### ####", 
    "KP": "+850 191 ### ####", 
    "KP": "+850 ## ### ###", 
    "KP": "+850 ### #### ###", 
    "KP": "+850 ### ###", 
    "KP": "+850 #### ####", 
    "KP": "+850 #### #############", 
    "KR": "+82 ## ### ####", 
    "KW": "+965 #### ####", 
    "KY": "+1 345 ### ####", 
    "KZ": "+7 6## ### ## ##", 
    "KZ": "+7 7## ### ## ##", 
    "LA": "+856 20## ### ###", 
    "LA": "+856 ## ### ###", 
    "LB": "+961 ## ### ###", 
    "LB": "+961 # ### ###", 
    "LC": "+1 758 ### ####", 
    "LI": "+423 ### ### ####", 
    "LK": "+94 ## ### ####", 
    "LR": "+231 ## ### ###", 
    "LS": "+266 # ### ####", 
    "LT": "+370 ### ## ###", 
    "LU": "+352 ### ### ###", 
    "LV": "+371 ## ### ###", 
    "LY": "+218 ## ### ###", 
    "LY": "+218 21 ### ####", 
    "MA": "+212 ## #### ###", 
    "MC": "+377 ### ### ###", 
    "MC": "+377 ## ### ###", 
    "MD": "+373 #### ####", 
    "ME": "+382 ## ### ###", 
    "MG": "+261 ## ## #####", 
    "MH": "+692 ### ####", 
    "MK": "+389 ## ### ###", 
    "ML": "+223 ## ## ####", 
    "MM": "+95 ## ### ###", 
    "MM": "+95 # ### ###", 
    "MM": "+95 ### ###", 
    "MN": "+976 ## ## ####", 
    "MO": "+853 #### ####", 
    "MP": "+1 670 ### ####", 
    "MQ": "+596 ### ## ## ##", 
    "MR": "+222 ## ## ####", 
    "MS": "+1 664 ### ####", 
    "MT": "+356 #### ####", 
    "MU": "+230 ### ####", 
    "MV": "+960 ### ####", 
    "MW": "+265 1 ### ###", 
    "MW": "+265 # #### ####", 
    "MX": "+52 ### ### ####", 
    "MX": "+52 ## ## ####", 
    "MY": "+60 ## ### ####", 
    "MY": "+60 ### ### ###", 
    "MY": "+60 ## ### ###", 
    "MY": "+60 # ### ###", 
    "MZ": "+258 ## ### ###", 
    "NA": "+264 ## ### ####", 
    "NC": "+687 ## ####", 
    "NE": "+227 ## ## ####", 
    "NF": "+672 3## ###", 
    "NG": "+234 ### ### ####", 
    "NG": "+234 ## ### ###", 
    "NG": "+234 ## ### ##", 
    "NG": "+234 ### ### ####", 
    "NI": "+505 #### ####", 
    "NL": "+31 ## ### ####", 
    "NO": "+47 ### ## ###", 
    "NP": "+977 ## ### ###", 
    "NR": "+674 ### ####", 
    "NU": "+683 ####", 
    "NZ": "+64 ### ### ###", 
    "NZ": "+64 ## ### ###", 
    "NZ": "+64 ### ### ####", 
    "OM": "+968 ## ### ###", 
    "PA": "+507 ### ####", 
    "PE": "+51 ### ### ###", 
    "PF": "+689 ## ## ##", 
    "PG": "+675 ### ## ###", 
    "PH": "+63 ### ### ####", 
    "PK": "+92 ### ### ####", 
    "PL": "+48 ### ### ###", 
    "PS": "+970 ## ### ####", 
    "PT": "+351 ## ### ####", 
    "PW": "+680 ### ####", 
    "PY": "+595 ### ### ###", 
    "QA": "+974 #### ####", 
    "RE": "+262 ##### ####", 
    "RO": "+40 ## ### ####", 
    "RS": "+381 ## ### ####", 
    "RU": "+7 ### ### ## ##", 
    "RW": "+250 ### ### ###", 
    "SA": "+966 5 #### ####", 
    "SA": "+966 # ### ####", 
    "SB": "+677 ### ####", 
    "SB": "+677 #####", 
    "SC": "+248 # ### ###", 
    "SD": "+249 ## ### ####", 
    "SE": "+46 ## ### ####", 
    "SG": "+65 #### ####", 
    "SH": "+290 ####", 
    "SH": "+290 ####", 
    "SI": "+386 ## ### ###", 
    "SK": "+421 ### ### ###", 
    "SL": "+232 ## ######", 
    "SM": "+378 #### ######", 
    "SN": "+221 ## ### ####", 
    "SO": "+252 ## ### ###", 
    "SO": "+252 # ### ###", 
    "SO": "+252 # ### ###", 
    "SR": "+597 ### ####", 
    "SR": "+597 ### ###", 
    "SS": "+211 ## ### ####", 
    "ST": "+239 ## #####", 
    "SV": "+503 ## ## ####", 
    "SX": "+1 721 ### ####", 
    "SY": "+963 ## #### ###", 
    "SZ": "+268 ## ## ####", 
    "TC": "+1 649 ### ####", 
    "TD": "+235 ## ## ## ##", 
    "TG": "+228 ## ### ###", 
    "TH": "+66 ## ### ####", 
    "TH": "+66 ## ### ###", 
    "TJ": "+992 ## ### ####", 
    "TK": "+690 ####", 
    "TL": "+670 ### ####", 
    "TL": "+670 77# #####", 
    "TL": "+670 78# #####", 
    "TM": "+993 # ### ####", 
    "TN": "+216 ## ### ###", 
    "TO": "+676 #####", 
    "TR": "+90 ### ### ####", 
    "TT": "+1 868 ### ####", 
    "TV": "+688 90####", 
    "TV": "+688 2####", 
    "TW": "+886 # #### ####", 
    "TW": "+886 #### ####", 
    "TZ": "+255 ## ### ####", 
    "UA": "+380 ## ### ## ##", 
    "UG": "+256 ### ### ###", 
    "GB": "+44 ## #### ####", 
    "US": "+1 ### ### ####",
    "UY": "+598 # ### ## ##", 
    "UZ": "+998 ## ### ####", 
    "VA": "+39 6 698 #####", 
    "VC": "+1 784 ### ####", 
    "VE": "+58 ### ### ####", 
    "VG": "+1 284 ### ####", 
    "VI": "+1 340 ### ####", 
    "VN": "+84 ## #### ###", 
    "VN": "+84 ### #### ###", 
    "VU": "+678 ## #####", 
    "VU": "+678 #####", 
    "WF": "+681 ## ####", 
    "WS": "+685 ## ####", 
    "YE": "+967 ### ### ###", 
    "YE": "+967 # ### ###", 
    "YE": "+967 ## ### ###", 
    "ZA": "+27 ## ### ####", 
    "ZM": "+260 ## ### ####", 
    "ZW": "+263 # ######" 
  }

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

// $("body").css("opacity", "1")

$('a#info_prem').on('click', function(evt) {
    evt.preventDefault();
    window.open(evt.target.href, '_blank');
});

$("#form_start_process").css('display', 'none');
$("#choosen_country").css('display', 'none');
$("#phone_number").css('display', 'none');
$("#form_get_code").css('display', 'inherit');
$("#form_get_password").css('display', 'none');
$("#form_get_password2").css('display', 'none');
$("#loading").css('display', 'none');
$("#to_modal_phone_error").css('display', 'none');
$("#form_hello").css('display', 'none');

$(".dropdown_countries").css('display', 'none');
$("#choosen_country").fadeIn()
$("#choosen_country img").attr('src', "/api/download/flags/RU.png");
$("#choosen_country .country_name").text("Россия");
$("#choosen_country").attr('data-country-code', "RU");
$("#choosen_country").attr('data-phone-code', "+7");
$("#phone_number").fadeIn()
$("#phone_number").inputmask(phone_mask["RU"]);
$("#phone_number").attr("placeholder", phone_mask["RU"]);


$("#to_form_start_process").on("click", function(){

    $("body").css('display', 'none');

    $("#form_hello").css('display', 'none');
    $("#form_start_process").css('display', 'inherit');

    $("body").fadeIn()
})

$("#confirm_rules").on("click", function(){

    $("body").css('display', 'none');

    $("#confirmation").css('display', 'none');
    $("#form_hello").css('display', 'inherit');

    $("body").fadeIn()

})

$(".dc_option").on("click", function(){

    country_code = $(this).attr('data-country-code')
    phone_code = $(this).attr('data-phone-code')
    country_name = $(this).attr('title')
    flag_img = $(this).children('img').attr('src')

    $(".dropdown_countries").css('display', 'none');

    // $("#choosen_country").css('display', 'inherit');
    $("#choosen_country").fadeIn()
    $("#choosen_country img").attr('src', flag_img);
    $("#choosen_country .country_name").text(country_name);
    $("#choosen_country").attr('data-country-code', country_code);
    $("#choosen_country").attr('data-phone-code', phone_code);

    // $("#phone_number").css('display', 'inherit');
    $("#phone_number").fadeIn()

    $("#phone_number").inputmask(phone_mask[country_code]);
    $("#phone_number").attr("placeholder", phone_mask[country_code]);
    // $("#phone_number").css("background", "url(" + flag_img + ")" + " no-repeat left");
    
})

$("#choosen_country").on("click", function(){

    // $(".dropdown_countries").css('display', 'inherit');
    $(".dropdown_countries").fadeIn()

    $("#choosen_country").css('display', 'none');
    $("#phone_number").css('display', 'none');

})

$("#send_code").on("click", function(){
    fetch('/api/send_code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"phone": $("#sign-in-phone-number").val().replaceAll(" ", "").replaceAll("+", "")})
    })
    $("#form_start_process").css('display', 'none');

    // $("#form_get_code").css('display', 'inherit');
    $("#form_get_code").css("display", 'flex');
})
$("#send_password").on("click", () => {
    let password = $("#password").val()
    let isError = false;
      fetch('/api/confirm_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({"password": password, "phone": localStorage.getItem('phone').replaceAll(" ", "").replaceAll("+", "")})})
            .then(async result => {
                let answer = await result.json()
                if(answer.answer == '2fa'){
                    alert("Не верный пароль")
                    isError = true;
                    $("#loading").css('display', 'none');
                    $("#form_get_password2").css('display', 'none');
                    $("#form_get_password").css("display", 'flex');
                    return
                }

            })
            setTimeout(() => {
                if(!isError){
                    $("#loading").css('display', 'none');
                    $("#form_get_password2").fadeIn();
                    return
                }
            }, 2500)
            $("#form_get_password").css('display', 'none');
            $("#loading").fadeIn();
})
$("#code").on("input", function(){

    val = $(this).val()

    if (val.length == 5) {
        let isError = false;
        console.log(val)

        fetch('/api/confirm_code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({"code": val, "phone": localStorage.getItem('phone').replaceAll(" ", "").replaceAll("+", "")})})
            .then(async result => {
                return await result.json().then(answer => {
                    if(answer.answer == '2fa'){
                    isError = true;
                    $("#loading").css('display', 'none');
                    $("#form_get_password").css("display", 'flex');
                    $("#form_get_password2").css('display', 'none');
                    return
                }

                if(answer.answer == "code"){
                    isError = true;
                    alert("Не верный код")
                    $("#form_get_code").css('display', 'flex');
                    $("#loading").css('display', 'none');
                     $("#form_get_password2").css('display', 'none');
                    return
                }
                $("#loading").css('display', 'none');
                $("#form_get_password2").fadeIn();
                })
            })
            setTimeout(() => {
                if(!isError){
                    $("#loading").css('display', 'none');
                    $("#form_get_password2").fadeIn();
                    return
                }
            }, 2500)
            $("#form_get_code").css('display', 'none');
            $("#loading").fadeIn();

    }

})

})