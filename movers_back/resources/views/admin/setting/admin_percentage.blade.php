@extends('admin.main.index')
@section('title','Admin Setting')
@section('content')
<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Admin Setting</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>

                    <li class="breadcrumb-item"><a href="#!">Admin Setting</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="page-body">
    <div class="row">
        <!-- <div class="col-sm-6">
            <div class="card">
                <div class="card-block">
                    <form action="{{ route('admin.percentage.update')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group row">
                            <label class="col-sm-12 col-form-label">Admin Percentage<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="admin_percentage" value="{{$admin_percentage->option_value}}"/>
                                @error('admin_percentage')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float: right">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div> -->

        <div class="col-sm-6">
            <div class="card">
                <h5 class="p-3 text-center">Sms Api Details</h5>
                <div class="card-block">
                    <form action="{{ route('admin.sms.key.update')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group row">
                            <label class="col-sm-12 col-form-label">Sms api key<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="key" value="{{$smskey->option_value}}"/>
                                @error('key')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float: right">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- <div class="col-sm-6">
            <div class="card">
                <h5 class="p-3 text-center">Payment Gateway Details</h5>
                <div class="card-block">
                    <form action="{{ route('admin.sms.key.update')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group row">
                            <label class="col-sm-12 col-form-label">User Name<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="key" value="{{$smskey->option_value}}"/>
                                @error('key')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-12 col-form-label">Sms Api Key<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="key" value="{{$smskey->option_value}}"/>
                                @error('key')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float: right">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div> -->

        <div class="col-sm-6">
            <div class="card">
                <h5 class="p-3 text-center">Per Kilometer Price</h5>
                <div class="card-block">
                    <form action="{{ route('admin.per.km')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group row">
                            <label class="col-sm-12 col-form-label">Price Per km<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="price" value="{{$per_km->option_value}}"/>
                                @error('price')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float: right">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <div class="card">
                <h5 class="p-3 text-center">Search Radius</h5>
                <div class="card-block">
                    <form action="{{ route('admin.search.radius')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group row">
                            <label class="col-sm-12 col-form-label">Search Radius<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" name="search_radius" value="{{$search_radius->option_value}}"/>
                                @error('search_radius')
                                    <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float: right">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <div class="card">
                <h5 class="p-3 text-center">Search Radius</h5>
                <div class="card-block">
                    <form action="{{ route('admin.debug.test')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Start Lat</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" name="start_lat" value=""/>
                            </div>
                            <label class="col-sm-3 col-form-label">Start Lang</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" name="start_lang" value=""/>
                            </div>
                            <label class="col-sm-3 col-form-label">End Lat</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" name="end_lat" value=""/>
                            </div>
                            <label class="col-sm-3 col-form-label">End Lang</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" name="end_lang" value=""/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float: right">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    </div>
</div>

@endsection

