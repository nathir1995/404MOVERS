@extends('admin.main.index')
@section('title','Site Logo')
@section('content')
<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Site Logo & Favicon</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>

                    <li class="breadcrumb-item"><a href="#!">Site Logo & Favicon</a></li>
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
                    <form action="{{ route('admin.add.favicon')}}" method="post" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Logo Note(Upload Only 150px*30px size logo)<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" name="logo" id="logo"/>
                                <div class="profile_image">
                                    <img src="{{ Storage::url('app/public/'.$logo->option_value ) }} " class="img-radius img_logo" alt="User-Profile-Image" accept="image/png,image/jpg,image/jpeg">
                                </div>
                                @error('logo')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Favicon<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-10">
                                <input type="file" class="form-control" name="favicon" id="profile_image"/>
                                <div class="profile_image">
                                    <img src="{{ Storage::url('app/public/'.$favicon->option_value ) }} " class="img-radius img_profile" alt="User-Profile-Image" accept="image/png,image/jpg,image/jpeg">
                                </div>
                                @error('avatar')
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
<script>
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


