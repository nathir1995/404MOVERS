@extends('admin.main.index')
@section('title','Edit Admin Profile')
@section('content')
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/6.4.1/css/intlTelInput.css">
<style>
.phone_number_sec .intl-tel-input {
    width: 100%;
}
.phone_number_sec .form-group .form-control {
    padding-left: 80px;
}
.phone_number_sec .selected-dial-code {
    display: inline-block;
    padding-left: 24px;
    vertical-align: middle;
    padding-top: 6px;
}
.phone_number_sec .flag-box {
    display: inline-block;
    vertical-align: middle;
}
.phone_number_sec .country .country-name, .phone_number_sec .country .country-dial-code {
    overflow: hidden;
    padding-left: 15px;
}

.intl-tel-input input[type=tel] {
padding-left: 66px;

}
</style>
<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Edit Profile</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>

                    <li class="breadcrumb-item"><a href="#!">Edit Profile</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-block">
                    <form action="{{ route('admin.submit.profile')}}" method="post" enctype="multipart/form-data">
                        @csrf


                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">First Name <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="first_name" value="{{Auth::user()->first_name}}" placeholder="Enter Phone Number" />
                                @error('first_name')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Last Name <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="last_name" value="{{Auth::user()->last_name}}" placeholder="Enter Phone Number" />
                                @error('last_name')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Date Of Birth <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="date" class="form-control" name="dob" value="{{date('Y-d-m', strtotime(Auth::user()->dob)) ??''}}" placeholder="Enter Date Of Birth" />
                                @error('dob')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row phone_number_sec">
                            <label class="col-sm-3 col-form-label">Phone Number <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="tel" class="form-control" name="phone_number" id="phone_number" value="{{Auth::user()->phone_number}}" placeholder="Enter Phone Number" />
                                <input type='hidden' name="country_code" class="country_code" value="{{Auth::user()->country_code}}">
                                <input type='hidden' name="contact_code" class="contact_code" value="{{Auth::user()->contact_code}}">
                                <input type='hidden' name="country_name" class="country_name" value="{{Auth::user()->country_name}}">

                                @error('phone_number')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row ">
                            <label class="col-sm-3 col-form-label">Address <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="address" value="{{Auth::user()->address}}" placeholder="Enter Address" />
                                @error('address')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Profile Picture Note(Upload Only 100px*100px size profile picture) <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="file" class="form-control" name="avatar" id="profile_image"/>
                                <div class="profile_image">
                                    <img src="{{ Auth::user()->avatar}} " class="img-radius img_profile" alt="User-Profile-Image" accept="image/png,image/jpg,image/jpeg">
                                </div>
                                @error('avatar')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Gender <span class="mandatoryicon">*</span> </label>
                            <div class="col-sm-9">
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="gender" value="1" {{ (Auth::user()->gender=='1')? 'checked':''}}> Male
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="gender" value="2" {{ (Auth::user()->gender=='2')? 'checked':''}}> Female
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-12 col-form-label">Note (If You want to create new password please fill new password .Otherwise you can submit password fields blank ).</label>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">New Password </label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control password_change" name="password" placeholder="Enter New Password" />
                                <span class="admin-new-password-icon show_password"><i class="fa fa-eye"></i></span>
                                <span class="admin-new-password-icon hide_password"><i class="fa fa-eye-slash"></i></span>
                                @error('password')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Confirm Password</label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control confirm_password_change" name="new_password"  placeholder="Enter Confirm Password" />
                                <span class="admin-new-password-icon confirm_show_password"><i class="fa fa-eye"></i></span>
                                <span class="admin-new-password-icon confirm_hide_password"><i class="fa fa-eye-slash"></i></span>
                                @error('new_password')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float: right;">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- Number Validation card end -->
        </div>
    </div>
</div>

@endsection
@section('admin')
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/intlTelInput.js"></script>
<script>
    $("#phone_number").keyup(function(){
        var data = $(this).val();
      var validate = data.replace(/[(+)*]/g, '');
      $("#phone_number").val(validate);
    });

    $(document).ready(function(){
        $('.show_password').show();
        $('.hide_password').hide();
        $('.confirm_show_password').show();
        $('.confirm_hide_password').hide();
    });
    $('.show_password').click(function(){

        $('.show_password').hide();
        $('.hide_password').show();
        $(".password_change").prop("type", "text");

    });
    $('.hide_password').click(function(){
        $('.show_password').show();
        $('.hide_password').hide();
        $(".password_change").prop("type", "password");
    });
    $('.confirm_show_password').click(function(){
        $('.confirm_show_password').hide();
        $('.confirm_hide_password').show();
        $(".confirm_password_change").prop("type", "text");

    });
    $('.confirm_hide_password').click(function(){
        $('.confirm_show_password').show();
        $('.confirm_hide_password').hide();
        $(".confirm_password_change").prop("type", "password");
    });


    var telInput = $("#phone_number");
telInput.on("countrychange", function () {
    var country_code_t = $("#phone_number").intlTelInput("getSelectedCountryData").iso2;
    jQuery(".country_code").val(country_code_t);

    var code = jQuery('.selected-dial-code').text();
    var country_name = jQuery('.selected-flag').attr('title');
    jQuery(".contact_code").val(code);
    jQuery(".country_name").val(country_name);
});

telInput.intlTelInput({
    allowExtensions: true,
    formatOnDisplay: false,
    autoFormat: true,
    autoHideDialCode: true,
    autoPlaceholder: true,
    defaultCountry: "iq",
    ipinfoToken: "yolo",
    nationalMode: false,
    numberType: "MOBILE",
    onlyCountries: ["iq"],

    preventInvalidNumbers: true,
    separateDialCode: true,
    initialCountry: "iq",

    geoIpLookup: function (callback) {
        jQuery.get("http://ipinfo.io", function () {}, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
        });
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
});
$("#profile_image").change(function () {
    profileImgReadURL(this);
});


function profileImgReadURL(input) {
if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('.img_profile').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
}
}

$("#logo").change(function () {
    profileImgReadURLs(this);
});


function profileImgReadURLs(input) {
if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('.img_logo').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
}
}
</script>
@endsection


