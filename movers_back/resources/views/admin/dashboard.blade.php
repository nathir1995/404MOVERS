@extends('admin.main.index')
@section('title','Dashboard')   
@section('content')
<div class="page-body">
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-block">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h4 class="text-c-yellow f-w-600">{{ $user_count}}</h4>
                                <h6 class="text-muted m-b-0">Number Of Users</h6>
                            </div>
                            <div class="col-4 text-right">
                                <i class="fa fa-user"></i>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-c-yellow">
                        <div class="row align-items-center">
                            <div class="col-9">
                                <p class="text-white m-b-0"><a href="{{route('user.list')}}">View</a></p>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-block">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h4 class="text-c-green f-w-600">{{$rating_count}}+</h4>
                                <h6 class="text-muted m-b-0">Number Of Rating</h6>
                            </div>
                            <div class="col-4 text-right">
                                <i class="fa fa-star"></i>    
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-c-green">
                        <div class="row align-items-center">
                            <div class="col-9">
                                <p class="text-white m-b-0"><a href="{{ route('admin.rating.list')}}">View</a></p>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-block">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h4 class="text-c-pink f-w-600">145</h4>
                                <h6 class="text-muted m-b-0">Total Earnings Of Carpool</h6>
                            </div>
                            <div class="col-4 text-right">
                                <i class="fa fa-money"></i>  
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-c-pink">
                        <div class="row align-items-center">
                            <div class="col-9">
                                <p class="text-white m-b-0"><a href="{{ route('admin.transaction.list')}}">View</a></p>
                            </div>
                   
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-block">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h4 class="text-c-blue f-w-600">500</h4>
                                <h6 class="text-muted m-b-0">Total Revenue Of Carpool</h6>
                            </div>
                            <div class="col-4 text-right">
                                <i class="fa fa-money"></i>  
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-c-blue">
                        <div class="row align-items-center">
                            <div class="col-9">
                                <p class="text-white m-b-0"><a href="{{ route('admin.transaction.list')}}">View</a></p>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-block">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h4 class="text-c-yellow f-w-600">{{$total_km}}</h4>
                                <h6 class="text-muted m-b-0">Total Kms BY Carpool</h6>
                            </div>
                            <div class="col-4 text-right">
                         
                                <i class="fa fa-car f-28"></i>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-c-yellow">
                        <div class="row align-items-center">
                            <div class="col-9">
                                <p class="text-white m-b-0"><a href="{{ route('admin.rides.list')}}">View</a></p>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>

          
            <!-- task, page, download counter  end -->

            <!--  sale analytics start -->
            {{-- <div class="col-md-12 col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h5>Bar chart</h5>
                        <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>

                    </div>
                    <div class="card-block">
                        <div id="morris-bar-chart"></div>
                    </div>
                </div>
            </div>
       
          
            <div class="col-md-12 col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h5>Bar chart</h5>
                        <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>

                    </div>
                    <div class="card-block">
                        <div id="morris-extra-area"></div>
                    </div>
                </div>
            </div> --}}
        </div>
    </div>                
   
@endsection

                           