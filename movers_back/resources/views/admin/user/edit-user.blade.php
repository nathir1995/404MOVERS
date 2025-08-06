@extends('admin.main.index')
@section('title','Edit User')
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
    padding-top: 7px;
    font-size: 13px;
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
                    <h4>Edit User</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="{{ route('user.list')}}">Users List</a>
                        </li>
                    <li class="breadcrumb-item"><a href="#!">Edit User</a></li>
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
                    <form action="{{ route('admin.submit.user.data',[$user_info->id])}}" method="post" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">First Name <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="first_name" value="{{$user_info->first_name}}" placeholder="Enter Phone Number" />
                                @error('first_name')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Last Name <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="last_name" value="{{$user_info->last_name}}" placeholder="Enter Phone Number" />
                                @error('last_name')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>


                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Date Of Birth <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="date" class="form-control" name="dob" value="{{date('Y-m-d', strtotime($user_info->dob))}}" placeholder="Choose User Date Of Birth" />
                                @error('dob')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Email <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="email" class="form-control" name="email" value="{{$user_info->email}}" placeholder="Enter User Email" />
                                @error('email')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row phone_number_sec">
                            <label class="col-sm-3 col-form-label">Address <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="tel" class="form-control" name="address"  value="{{$user_info->address}}" placeholder="Enter Address" />
                                @error('address')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row phone_number_sec">
                            <label class="col-sm-3 col-form-label">Phone Number <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="tel" class="form-control" name="phone_number" id="phone_number" value="{{$user_info->phone_number}}" onchange="this.value=this.value.replace(/[+[$\]\\@]/g,'_');" placeholder="Enter Phone Number"/>
                                <input type='hidden' name="country_code" class="country_code" value="{{$user_info->country_code}}">
                                <input type='hidden' name="contact_code" class="contact_code" value="{{$user_info->contact_code}}">
                                <input type='hidden' name="country_name" class="country_name" value="{{$user_info->country_name}}">

                                @error('phone_number')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>



                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Profile Picture <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="file" class="form-control" name="avatar" id="profile_image" accept="image/png,image/jpg,image/jpeg"/>
                                <div class="profile_image">
                                    <img src="{{ $user_info->avatar  }} " class="img-radius" alt="User-Profile-Image" accept="image/png,image/jpg,image/jpeg">
                                </div>
                                @error('avatar')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>

                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Gender <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="gender" value="1" {{ ($user_info->gender=='1')? 'checked':''}}> Male
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="gender" value="2" {{ ($user_info->gender=='2')? 'checked':''}}> Female
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Status <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="status" value="1" {{($user_info->status=='1')?'checked':''}}> Active
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="status" value="0" {{($user_info->status=='0')?'checked':''}}> Inactive
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float:right;">Submit</button>
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
    defaultCountry: "auto",
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
        $('.img-radius').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
}
}
</script>
@endsection
