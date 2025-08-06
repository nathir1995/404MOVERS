@extends('admin.main.index')
@section('title','User Profile')
@section('content')

<div class="page-body">
    <!--profile cover start-->
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-8">
                <div class="page-header-title">
                    <div class="d-inline">
                        <h4>Users Detail</h4>
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
                        <li class="breadcrumb-item"><a href="#!">Users Detail</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--profile cover end-->
    <div class="row">
        <div class="col-lg-12">
            <!-- tab content start -->
            <div class="card">
                <div class="card-header">
                    <h5 class="card-header-text">About {{$user_info->name }}</h5>
                </div>
                <div class="card-block">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row">
                                <div class="col-lg-12 col-xl-12">
                                    <div class="table-responsive">
                                        <table class="table m-0">
                                            <tbody>

                                                <tr>
                                                    <th scope="row">First Name</th>
                                                    <td>{{$user_info->first_name}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Last Name</th>
                                                    <td>{{$user_info->last_name}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Gender</th>
                                                    <td>@if ($user_info->gender=='0') Male @elseif($user_info->gender=='1' ) Female @endif</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Address</th>
                                                    <td>{{$user_info->address}}</td>
                                                </tr>

                                                <tr>
                                                    <th scope="row">Date Of Birth</th>
                                                    <td>
                                                        {{ $user_info->dob }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Email</th>
                                                    <td>{{$user_info->email}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Mobile Number</th>
                                                    <td>{{$user_info->contact_code}} {{$user_info->phone_number}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Status</th>
                                                    <td>
                                                        @if ($user_info->status=='1') <label class="badge bg-success">Active</label>  @elseif($user_info->status=='0' )<label class="badge bg-danger">In Active</label> @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Created At</th>
                                                    <td>
                                                        {{ date('d-M-Y', strtotime($user_info->created_at)) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Profile Image</th>
                                                    <td>
                                                        <img src="{{ Storage::url('app/public/' . $user_info->avatar) }} " class="img-radius profile-info" alt="User-Profile-Image">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!-- end of table col-lg-6 -->
                                {{-- <div class="col-lg-6 col-xl-6">
                                    <div class="table-responsive-info">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Address</th>
                                                    <td>{{$user_info->address}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Email</th>
                                                    <td>{{$user_info->email}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Mobile Number</th>
                                                    <td>{{$user_info->phone_number}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Status</th>
                                                    <td>
                                                        @if ($user_info->status=='1') <label class="badge bg-success">Active</label>  @elseif($user_info->status=='0' )<label class="badge bg-danger">In Active</label> @endif
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> --}}
                                <!-- end of table col-lg-6 -->
                            </div>
                                <!-- end of row -->
                        </div>
                        <!-- end of col-lg-12 -->
                    </div>
                </div>
                <!-- end of card-block -->
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-2 col-xl-2 card">

            <ul class="nav nav-tabs md-tabs tabs-left b-none" role="tablist">
                <li class="nav-item"> <a class="nav-link @if(Session::get('tab')=='') active @endif " data-toggle="tab" href="#transaction" role="tab">Transaction</a>
                    <div class="slide"></div>
                </li>
                <li class="nav-item"> <a class="nav-link @if(Session::get('tab')=='#adminpay') active @endif " data-toggle="tab" href="#adminpay" role="tab">Receive From Admin</a>
                    <div class="slide"></div>
                </li>
                <li class="nav-item"> <a class="nav-link @if(Session::get('tab')=='#notification') active  @endif" data-toggle="tab" href="#notification" role="tab">Notification</a>
                    <div class="slide"></div>
                </li>
                {{-- <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#wallet_amount" role="tab">Wallets Amount</a>
                    <div class="slide"></div>
                </li> --}}
                <li class="nav-item"> <a class="nav-link " data-toggle="tab" href="#number_rides" role="tab">Number Of Rides</a>
                    <div class="slide"></div>
                </li>
                <li class="nav-item"> <a class="nav-link @if(Session::get('tab')=='#complaints') active  @endif"  data-toggle="tab" href="#complaints" role="tab">Complaints</a>
                    <div class="slide"></div>
                </li>

                <li class="nav-item"> <a class="nav-link @if(Session::get('tab')=='#verfication') active @endif" data-toggle="tab" href="#verfication" role="tab">Car Verification</a>
                    <div class="slide"></div>
                </li>
            </ul>
        </div>
        <div class="col-lg-10 col-xl-10">
            <div class="tab-content card-block">
                <div class="tab-pane @if(Session::get('tab')=='') active @endif" id="transaction" role="tabpanel">
                    <div class="dt-responsive table-responsive">
                        <table id="table1" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>User Name</th>
                                    <th>Payment Mode</th>
                                    <th>Transaction ID</th>
                                    <th>Payment Status</th>
                                    <th data-orderable="false">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($getusertransaction as $transactiondata)
                                <tr>
                                    <td>{{ $loop->iteration}}</td>
                                    <td>{{$transactiondata->GetTransactionUserData->first_name.' '.$transactiondata->GetTransactionUserData->last_name}}</td>
                                    <td>Online</td>
                                    <td>{{$transactiondata->transaction_id}}</td>
                                    <td>
                                        @if($transactiondata->status=='0')
                                            <label class="label label-warning">Cancel</label>
                                        @elseif($transactiondata->status=='1')
                                            <label class="label label-success">Success</label>
                                        @elseif($transactiondata->status=='2')
                                            <label class="label label-danger">Failed</label>
                                        @endif
                                    </td>
                                    <td>
                                        <a href="{{route('admin.view.transaction',[$transactiondata->id])}}" class="icon-btn btn-info "><i class="fa fa-eye"></i></a>
                                        {{-- <a href="javascript:void(0);" class="icon-btn btn-danger delete_user"><i class="fa fa-trash"></i> --}}
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>No Data Found</td>
                                    <td></td>
                                    <td></td>
                                </tr>

                                @endforelse


                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="tab-pane  @if(Session::get('tab')=='#adminpay') active  @endif" id="adminpay" role="tabpanel">
                    <div class="card">
                        <h5 class="p-3 text-center">Charge Wallet</h5>
                        <div class="card-block">
                            <form action="{{ route('charge.wallet.manual')}}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="form-group row">
                                    <input type="hidden" class="form-control" name="user_id" value="{{$user_info->id}}"/>
                                    <label class="col-sm-12 col-form-label">Amount<span class="mandatoryicon">*</span></label>
                                    <div class="col-sm-12">
                                        <input type="text" class="form-control" name="amount" value="0"/>
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
                    <div class="dt-responsive table-responsive">
                        <table id="table3" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Ride</th>
                                    <th>Rider Name</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($adminPaytransaction as $admintransaction)
                                    <tr>
                                        <td>{{$loop->iteration}}</td>
                                        <td>{{substr(($admintransaction->GetRideDataForTransaction->start_point_name ?? ' ') .' '.($admintransaction->GetRideDataForTransaction->end_point_name ?? ' '),0,50)}}</td>
                                        <td>{{$admintransaction->GetTransactionRiderData->first_name.' '.$admintransaction->GetTransactionRiderData->last_name}}</td>
                                        <td>{{$admintransaction->total_amount}}</td>
                                        <td> @if($admintransaction->pay_to_rider=='0')
                                                <label class="label label-warning">Pending</label>
                                            @elseif($admintransaction->pay_to_rider=='1')
                                                <label class="label label-success">Success</label>
                                            @endif
                                        </td>

                                    </tr>
                                @empty
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>No Data Found</td>
                                        <td></td>
                                        <td>                                                                                                                                                                            </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="tab-pane  @if(Session::get('tab')=='#notification') active  @endif" id="notification" role="tabpanel">
                    <div class="dt-responsive table-responsive">
                        <table id="table2" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>User Name</th>
                                    <th>Send Date</th>
                                    <th>Notification</th>
                                    <th data-orderable="false">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($notifications as $notify)
                                    <tr>
                                        <td>{{$loop->iteration}}</td>
                                        <td>{{$notify->getUserInfoForNotification->first_name.' '.$notify->getUserInfoForNotification->last_name}}</td>
                                        <td>{{ date('M-d-y h:i',strtotime($notify->created_at))}}</td>
                                        <td>{{ substr($notify->notification,0,50)}}</td>
                                        <td>
                                            <a href="{{ route('user.receive.notification',[$notify->id])}}" class="icon-btn btn-info "><i class="fa fa-eye"></i></a>
                                            <a href="javascript:void(0);" class="icon-btn btn-danger delete" data-id="{{$notify->id}}" data-toggle="modal" data-url='{{ route('user.delete.notification')}}' data-target="#delete"><i class="fa fa-trash"></i>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>No Data Found</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                {{-- <div class="tab-pane" id="wallet_amount" role="tabpanel">
                    <div class="dt-responsive table-responsive">
                        <table id="table3"class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>S.no </th>
                                    <th>User Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Payment Status</th>
                                    <th data-orderable="false">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Jhon Doe</td>
                                    <td>IQD 10 </td>
                                    <td>2012/10/13</td>
                                    <td>Live</td>
                                    <td>
                                        <a href="javascript:void(0);" class="icon-btn btn-info "><i class="fa fa-eye"></i></a>
                                        <a href="javascript:void(0);" class="icon-btn btn-danger delete_user"><i class="fa fa-trash"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jhon Doe</td>
                                    <td>IQD 15 </td>
                                    <td>2012/10/13</td>
                                    <td>Live</td>
                                    <td>
                                        <a href="javascript:void(0);" class="icon-btn btn-info "><i class="fa fa-eye"></i></a>
                                        <a href="javascript:void(0);" class="icon-btn btn-danger delete_user"><i class="fa fa-trash"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> --}}

                <div class="tab-pane " id="number_rides" role="tabpanel">
                    <div class="dt-responsive table-responsive">
                        <table id="table4" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>User Name</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th data-orderable="false">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($rides as $ride_data)
                                    <tr>
                                        <td>{{$loop->iteration}}</td>
                                        <td>{{ $ride_data->GetUserInfo->first_name." ".$ride_data->GetUserInfo->last_name }}</td>
                                        <td>{{ substr($ride_data->start_point_name,0,30)}}..</td>
                                        <td>{{ substr($ride_data->end_point_name,0,30)}}..</td>
                                        <td> <a href="{{route('admin.view.rides',[$ride_data->id])}}" class="icon-btn btn-info "><i class="fa fa-eye"></i></a>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>No Data Found</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="tab-pane  @if(Session::get('tab')=='#complaints') active  @endif" id="complaints" role="tabpanel">
                    <div class="dt-responsive table-responsive">
                        <table id="table5" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>User Name</th>
                                    <th>Complaint</th>
                                    <th>Complaint Status</th>
                                    <th data-orderable="false">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($complaint as $comp_value)
                                    <tr>
                                        <td>{{ $loop->iteration;}}</td>
                                        <td>{{ $comp_value->getComplaintUser->first_name.' '.$comp_value->getComplaintUser->last_name}}</td>
                                        <td>{{ $comp_value->complaints}}</td>
                                        <td>@if ($comp_value->status== 1)
                                                <label class="badge bg-info">New</label>
                                            @elseif($comp_value->status== 2)
                                                <label class="badge bg-warning">Read</label>
                                            @else
                                                <label class="badge bg-success">Resolved</label>

                                            @endif
                                        </td>
                                        <td>
                                            <a href="javascript:void(0);" class="icon-btn btn-info reply_user" attr-id="{{$comp_value->id}}"  data-toggle="modal" data-target="#reply_emquiry"><i class="fa fa-reply"></i></a>
                                            <a href="javascript:void(0);" class="icon-btn btn-danger delete" data-id="{{$comp_value->id}}" data-toggle="modal" data-url='{{ route('admin.delete.user.complaint')}}' data-target="#delete"><i class="fa fa-trash"></i></a>
                                        </td>
                                    </tr>

                                @empty
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>No Data Found </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="tab-pane @if(Session::get('tab')=='#verfication') active  @endif" id="verfication" role="tabpanel" >
                    <div class="dt-responsive table-responsive">
                        <table id="table6" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Car Name</th>
                                    <th>Color</th>
                                    <th>No Of Document</th>
                                    <th>Primary Car</th>
                                    <th>Is Verified</th>
                                    <th>Status</th>
                                    <th data-orderable="false">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($user_car as $item)
                                <tr>
                                    <td>{{ $loop->iteration; }}</td>
                                    <td>{{ $item->car_name }}</td>
                                    <td>{{ $item->car_color}}</td>
                                        @php
                                            $doc_count = $item->getCarDocument;
                                            $count = 0;
                                            foreach ($doc_count as $key => $value) {
                                                $count++;
                                            }

                                         if(!empty($item->driving_license)){
                                            $count_value = $count+1;
                                         }else{
                                            $count_value = $count;
                                         }

                                        @endphp
                                    <td>{{ $count_value;}}</td>
                                    <td>
                                        @if($item->primary_car==0)
                                            Primary Car
                                        @else
                                            Not Primary
                                        @endif
                                    </td>
                                    <td>
                                        @if($item->is_verified==1)
                                            <button class="btn btn-success btn-round verified" attr-id="{{$item->id}}" attr_status='0' data-toggle="modal" data-target="#verification">Verified</button>
                                        @else
                                            <button class="btn btn-danger btn-round verified" attr-id="{{$item->id}}" attr_status='1' data-toggle="modal" data-target="#verification">Pending</button>
                                        @endif
                                    </td>
                                    <td>
                                        @if($item->status=='1')
                                            <button class="btn btn-success btn-round status" attr-id="{{$item->id}}" attr_status='0' data-toggle="modal" data-target="#myModal">Active</button>
                                        @else
                                            <button class="btn btn-danger btn-round status" attr-id="{{$item->id}}" attr_status='1' data-toggle="modal" data-target="#myModal">In Active</button>
                                        @endif
                                    </td>
                                    <td>
                                        <a href="{{route('admin.view.car',[$item->id])}}" target="_blank" class="icon-btn btn-info "><i class="fa fa-eye"></i></a>
                                        <a href="javascript:void(0);" class="icon-btn btn-danger delete" data-id="{{$item->id}}" data-toggle="modal" data-url='{{ route('admin.delete.car')}}' data-target="#delete"><i class="fa fa-trash"></i></a>
                                    </td>
                                </tr>

                                @empty
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>No Data Found </td>
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

<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Change Status</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            <h6 class="text-center">Are You Sure For Change Status ?</h6>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
            <button type="button" id="change_status" class="btn btn-success" data-dismiss="modal" attr_user_id="" attr_user_status='' active-attr=''>Yes</button>
            </div>
        </div>
    </div>
</div>

<div id="verification" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Change Status</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            <h6 class="text-center">Are You Sure For Change Verification Status ?</h6>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
            <button type="button" id="change_verification" class="btn btn-success" data-dismiss="modal" attr_verify_id="" attr_verify_status='' active-attr=''>Yes</button>
            </div>
        </div>
    </div>
</div>

<div id="delete" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Delete</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            <h5 class="text-center">Are You Sure ?</h5>
            <p class="text-center">You won't be able to revert this!</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
            <button type="button" id="sure_delete" class="btn btn-danger" delete-tab="" delete-url="" data-dismiss="modal" attr_delete_id="" attr_row_id=''>Yes Delete it</button>
            </div>
        </div>
    </div>
</div>
<div id="reply_emquiry" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Reply</h4></h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input type="text" class="form-control form-control-primary" id="title" name="title" placeholder="Title">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control form-control-primary" id="summary" name="summary" placeholder="Summary">
                </div>
                <div class="form-group">
                    <textarea  class="form-control form-control-primary" id="description" name="description" placeholder="Description"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" id="sure_reply" class="btn btn-success" data-dismiss="modal" attr-reply-tab='#complaints' attr_reply_id="">Sent</button>
            </div>
        </div>
    </div>
</div>
@php session()->forget('tab'); @endphp
@endsection
@section('admin')
<script>

    $(document).on('click','.delete',function(){
        var id = $(this).attr('data-id');
        var url = $(this).attr('data-url');
        var active = $('.tabs-left li a.active').attr('href');

        $('body').find('#sure_delete').attr('attr_delete_id',id);
        $('body').find('#sure_delete').attr('delete-url',url);
        $('body').find('#sure_delete').attr('delete-tab',active);
    });

    $('#sure_delete').click(function(){
        var id = $(this).attr('attr_delete_id');
        var urls = $(this).attr('delete-url');
        var deletetab = $(this).attr('delete-tab');
        $.ajax({
            url: urls,
            type: "POST",
            data :{_token:'{{csrf_token()}}',id,deletetab},
            beforeSend: function(){

              $('.theme-loader').show();
            },
            success: function(response){
                if(response.success==true){
                    toastr.success(response.message);
                    location.reload();
                }
                else{
                    toastr.error(response.message);
                }
            },

        });
    });

    $(document).on('click','.status',function(){
        var active = $('.tabs-left li a.active').attr('href');
        var user_id = $(this).attr('attr-id');
        var status = $(this).attr('attr_status');
        $('body').find('#change_status').attr('attr_user_id',user_id);
        $('body').find('#change_status').attr('attr_user_status',status);
        $('body').find('#change_status').attr('active-attr',active);
    });

    $('#change_status').click(function(){
        var user_id = $(this).attr('attr_user_id');
        var status = $(this).attr('attr_user_status');
        var active_tab = $(this).attr('active-attr');
        $.ajax({
            url: '{{route('admin.car.status')}}',
            type: "POST",
            data :{_token:'{{csrf_token()}}',user_id,status, active_tab},
            beforeSend: function(){
              $('.theme-loader').show();
            },
            success: function(response){
                if(response.success==true){
                   toastr.success(response.message);
                   location.reload();
                }
                else{
                    toastr.error(response.message);
                }
            },
        });
    });


    $(document).on('click','.verified',function(){
        var active = $('.tabs-left li a.active').attr('href');
        var id = $(this).attr('attr-id');
        var status = $(this).attr('attr_status');
        $('body').find('#change_verification').attr('attr_verify_id',id);
        $('body').find('#change_verification').attr('attr_verify_status',status);
        $('body').find('#change_verification').attr('active-attr',active);
    });

    $('#change_verification').click(function(){

        var id = $(this).attr('attr_verify_id');
        var status = $(this).attr('attr_verify_status');
        var active_tab = $(this).attr('active-attr');

        $.ajax({
            url: '{{route('admin.verified.status')}}',
            type: "POST",
            data :{_token:'{{csrf_token()}}',id,status, active_tab},
            beforeSend: function(){
              $('.theme-loader').show();
            },
            success: function(response){
                if(response.success==true){
                   toastr.success(response.message);
                    location.reload();
                }
                else{
                    toastr.error(response.message);
                }
            },
        });
    });

     $(document).on('click','.reply_user',function(){
        var id = $(this).attr('attr-id');
        $('body').find('#sure_reply').attr('attr_reply_id',id);
        $('#title').val('');
        $('#summary').val('');
        $('#description').val('');
    });

    $('#sure_reply').click(function(){
        var title = $('#title').val();
        var summary = $('#summary').val();
        var description = $('#description').val();
        var id = $(this).attr('attr_reply_id');
        var tab = $(this).attr('attr-reply-tab');
        $.ajax({
            url: '{{route('admin.reply.user.complaint')}}',
            type: "POST",
            data :{_token:'{{csrf_token()}}',id,title,summary,description,tab},
            beforeSend: function(){
              $('.theme-loader').show();
            },
            success: function(response){
                console.log(response);
                if(response.success==true){
                    toastr.success(response.message);
                    setTimeout(function(){
                    window.location.reload();
                    }, 5000);
                }
                else{
                    toastr.error(response.message);
                }
            },
        });
    });


</script>
@endsection
