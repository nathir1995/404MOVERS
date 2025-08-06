@extends('admin.main.index')
@section('title','View Car')
@section('content')


<!--profile cover start-->
<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Ride Detail</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="{{ route('admin.rides.list')}}">View All Rides</a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Ride Detail</a>
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
                        <div class="col-lg-12 col-xl-12">
                            <div class="table-responsive">
                                <table class="table m-0">
                                    <tbody>
                                        <tr>
                                            <th scope="row">From</th>
                                            <td>{{ $ride->start_point_name}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">To</th>
                                            <td>{{ $ride->end_point_name }} </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Price</th>
                                            <td>IQD {{ $ride->price }}  </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Pickup Date</th>
                                            <td> {{$ride->pickup_date}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Pickup Time</th>
                                            <td> {{$ride->pickup_time}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Instant Booking</th>
                                            <td>@if($ride->instant_booking=='0') Yes @else No @endif</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Comfort Seat</th>
                                            <td>@if($ride->comfort_seat=='0') Yes @else No @endif</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">How many passenger</th>
                                            <td>{{ $ride->how_many_pessenger }}  </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Return Trip</th>
                                            <td>@if($ride->return_trip=='0') Yes @else No @endif</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Instruction</th>
                                            <td> {{$ride->instruction}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Preferences</th>
                                            <td>
                                                @if($ride->preference==0)
                                                    Male
                                                @elseif($ride->preference==1)
                                                    Female
                                                @elseif($ride->preference==2)
                                                    Both  
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Status</th>
                                            <td> @if($ride->status =='1') <span class="pcoded-badge label label-info ">Start</span> 
                                                @elseif($ride->status =='2') <span class="pcoded-badge label label-success ">Completed</span>
                                                @elseif($ride->status =='3') <span class="pcoded-badge label label-danger ">Cancel</span>
                                                @else <span class="pcoded-badge label label-warning">Not Start</span> @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Other Stops</th>
                                            <td>@if(!empty($ride->GetOtherLocation)) Yes @else No @endif</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Ride type</th>
                                            <td>@if(!empty($ride->ride_type) && $ride->ride_type==0) Passenger @else Parcel/Passenger @endif</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @if($ride->GetOtherLocation->count() > 1)
        <div class="col-sm-12">
            <div class="card">
                <div class="card-block">
                    <div class="row">
                        <div class="col-lg-12 col-xl-12"> 
                            <h5 style="text-align: center;padding:10px;">Other Stops Locations</h5>   
                            <ul class="list-group">
                                @forelse($ride->GetOtherLocation as $other_data)
                                 
                                        <li class="list-group-item mb-1 ">
                                            <div class="location-div">
                                                <i class="fa fa-circle-o"></i>
                                                <span>From</span>
                                                <span> : {{ $other_data->start_point_name}}</span>
                                            </div>
                                            <div class="location-div">
                                                <i class="fa fa-map-marker"></i>
                                                <span>To</span>
                                                <span> : {{ $other_data->end_point_name }} </span>
                                            </div>
                                            <div class="location-div">
                                                <i class="fa fa-money"></i>
                                                <span>Price</span>
                                            <span> : IQD {{ $other_data->price }}</span>
                                            </div>
                                        </li>
                                        {{-- @else
                                        <li class="list-group-item mb-1 ">
                                            <div class="location-div">
                                                <span>No Other Stop found</span>
                                            </div>
                                        </li>     --}}
                                  
                                       
                                @empty
                                    <li class="list-group-item mb-1 ">
                                        <p>No Other Stops Found</p>
                                    </li>
                                @endforelse
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endif 

        <div class="col-sm-12">
            <div class="card">
                <div class="card-block">
                    <div class="row">
                        <div class="col-lg-12 col-xl-12"> 
                            <h5 style="text-align: center;padding:10px;">Bookings on this ride</h5>   
                            <div class="dt-responsive table-responsive">
                                <table id="alt-pg-dt" class="table table-striped table-bordered nowrap" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>User Name</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Price</th>
                                            <th>Booked Seat</th>
                                            <th>Booking Type</th>
                                            <th>Booking Status</th>
                                            <th>Payment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                    @forelse ($booking as $booked_data)
                                        <tr>
                                            <td>{{$loop->iteration}}</td>
                                            <td>{{$booked_data->GetallBookedUser->first_name.' '.$booked_data->GetallBookedUser->last_name}}</td>
                                            <td>{{ substr($booked_data->start_point_name,0,20)}}..</td>
                                            <td>{{ substr($booked_data->end_point_name,0,20)}}..</td>
                                            <td> IQD {{ $booked_data->price}}</td>
                                            <td>{{$booked_data->booked_seat}}</td>
                                            <td>@if($booked_data->booking_type==0) Passenger @else Parcel @endif</td>
                                            <td>@if($booked_data->booking_status =='0') <span class="pcoded-badge label label-success ">Approve</span> 
                                                @elseif($booked_data->booking_status =='1') <span class="pcoded-badge label label-info">Pending</span>
                                                @elseif($booked_data->booking_status =='2') <span class="pcoded-badge label label-danger ">Cancel By User</span>
                                                @else <span class="pcoded-badge label label-warning">Reject By Rider</span> @endif
                                            </td>
                                            <td>@if($booked_data->payment_status =='0') <span class="pcoded-badge label label-warning ">Cancel</span> 
                                                @elseif($booked_data->payment_status =='1') <span class="pcoded-badge label label-success ">Success</span>    
                                                @else <span class="pcoded-badge label label-danger">Cancel</span> @endif
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>No Data Found</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
</div>
@endsection