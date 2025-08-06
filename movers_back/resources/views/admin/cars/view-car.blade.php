@extends('admin.main.index')
@section('title','View Car')
@section('content')

<style>
    .img-block img {
        border-radius: 10px;
    }
</style>
<!--profile cover start-->
<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Car Detail</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="{{ route('user.view',[$data->getCarUser->id])}}">View User</a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Car Detail</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
    <!--profile cover end-->
<div class="page-body">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-block">
                    <div class="row">
                        <div class="col-lg-8 col-xl-8">
                            <div class="table-responsive">
                                <table class="table m-0">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Car Name</th>
                                            <td>{{ $data->car_name}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Car Color </th>
                                            <td>{{ $data->car_color }} </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Car Model</th>
                                            <td>{{ $data->car_model }}  </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Car Verified Status</th>
                                            <td>  @if ($data->is_verified=='1') <label class="badge bg-success">Approved</label>  @elseif($data->is_verified=='0' )<label class="badge bg-danger">Pending</label> @endif</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Passenger</th>
                                            <td>{{ $data->total_seat }}  </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Car Number</th>
                                            <td>{{ $data->car_number }}  </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Driving Licence</th>
                                            <td style="border-bottom: 1px solid #e9ecef;"><a href="{{ Storage::url('app/public/' . $data->driving_license) }}"><i class="fa fa-file" style="font-size: 40px;"></i></a></td>
                                        </tr>

                                        <tr>
                                            <th>Car Documents</th>

                                            @foreach ($data->getCarDocument as $k=>$item)

                                                    <td>
                                                        <a href="{{ Storage::url('app/public/' . $item->document) }}" class="btn btn-inverse" target="_blank">
                                                            Document {{$k+1}} <i class="fa fa-file"></i>
                                                        </a>
                                                    </td>

                                            @endforeach
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-4 col-xl-4">
                            <div class="img-block">
                                <img class="img-fluid img-radius" src="{{ Storage::url('app/public/' . $data->car_img)}}">
                            </div>
                        </div>

                    {{--     <div class="col-lg-12 col-xs-12">
                            <h5 class="m-3">Car Documents</h5>
                            <div class="row">
                                @foreach ($data->getCarDocument as $k=>$item)
                                    <div class="col-md-2">
                                        <a href="{{ asset('storage/'.$item->document) }}" class="btn btn-inverse" target="_blank"> Document {{$k+1}} <i class="fa fa-file"></i></a>
                                    </div>
                                @endforeach
                            </div>
                        </div>  --}}
                    </div>
                </div>
            </div>
        </div>
     </div>

     <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-block">
                    <form action="{{ route('user.send.notification')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <input type="hidden" class="form-control" name="car_id" value="{{ $data->id }}" />
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Title <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="title" value="{{ old('title')}}" placeholder="Enter Notification Title" />
                                @error('title')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Description <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="description" value="{{ old('description')}}" placeholder="Enter Notification Description" />
                                @error('description')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float: right;">Send Notification</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
