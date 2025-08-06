@extends('admin.main.index')
@section('title','Edit Offer')
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
                    <h4>Edit Offer</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="{{ route('admin.offers.list')}}">Offers List</a>
                        </li>
                    <li class="breadcrumb-item"><a href="#!">Edit Offer</a></li>
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
                    <form action="{{ route('admin.submit.offer.data',[$offer_info->id])}}" method="post" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Title <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="title" value="{{$offer_info->title}}" placeholder="Enter Offer Title" />
                                @error('title')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Description <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="description" value="{{$offer_info->description}}" placeholder="Enter Offer Description" />
                                @error('description')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Offer Picture <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="file" class="form-control" name="image" id="profile_image" accept="image/png,image/jpg,image/jpeg"/>
                                <div class="profile_image">
                                    <img src="{{ $offer_info->image  }} " class="img-radius" alt="Offer-Image" accept="image/png,image/jpg,image/jpeg">
                                </div>
                                @error('image')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
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
