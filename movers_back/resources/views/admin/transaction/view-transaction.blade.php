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
                        <h4>Transaction</h4>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="page-header-breadcrumb">
                    <ul class="breadcrumb-title">
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                        </li>
						<li class="breadcrumb-item"><a href="{{ route('admin.transaction.list')}}">Transaction List</a>
                        </li>
                        <li class="breadcrumb-item"><a href="#!">Transaction Detail</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--profile cover end-->
    <div class="row">
        <div class="col-xl-6 col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5>Paid By</h5>
                </div>
                <div class="card-block" style="text-align: center;">
                    <img src="{{asset($getsingletransaction->GetTransactionUserData->avatar)}}">
                    <h6>{{$getsingletransaction->GetTransactionUserData->first_name.' '.$getsingletransaction->GetTransactionUserData->last_name}}</h6>
                    <h6>{{$getsingletransaction->GetTransactionUserData->email}}</h6>
                </div>
            </div>
        </div>
        <div class="col-xl-6 col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5>Paid To</h5>
                </div>
                <div class="card-block" style="text-align: center;">
                    <img src="{{Auth::user()->avatar}} ">
                    {{-- <h6>{{$getsingletransaction->GetRideDataForTransaction->GetUserInfo->first_name.' '.$getsingletransaction->GetRideDataForTransaction->GetUserInfo->last_name}}</h6>
                    <h6>{{$getsingletransaction->GetRideDataForTransaction->GetUserInfo->email}}</h6> --}}
                    <h6>{{auth()->user()->first_name}}</h6>
                    <h6>{{auth()->user()->email}}</h6>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 col-xl-12">    
            <div class="card" style="text-align: center;">
                <div class="card-header">
                    <h5>Transaction-Id : {{$getsingletransaction->transaction_id}}</h5>
                </div>
                <div class="card-block">
                    <h6>Amount : IQD {{$getsingletransaction->amount}}</h6>
                    <h6>Date   : {{$getsingletransaction->created_at}}</h6>
            
                    <h6>Status : 
                        @if($getsingletransaction->status=='0')
                        <label class="badge badge-lg bg-warning">Cancel</label>
                        @elseif($getsingletransaction->status=='1')
                        <label class="badge badge-lg bg-success">Success</label>
                        @elseif($getsingletransaction->status=='2')
                        <label class="badge badge-lg bg-danger">Failed</label>
                        @endif
                    </h6>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
