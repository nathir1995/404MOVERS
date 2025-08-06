@extends('admin.main.index')
@section('title','View Notifications')
@section('content')   

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Notification </h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
           
                    <li class="breadcrumb-item"><a href="#!">View Notification</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="page-body">
    <div class="card">
        <div class="card-block">
            <table id="dataTable" class="table table-striped table-bordered table-hover">
                <tbody>
                    <tr>
                        <th> User Name:</th>
                        <td><a href="{{ route('user.view',$notify_data->getUserInfoForNotification->id)}}">{{$notify_data->getUserInfoForNotification->first_name.' '.$notify_data->getUserInfoForNotification->last_name}}</a></td>
                    </tr>
                    <tr>
                        <th>Notification</th>
                        <td>{{$notify_data->notification}}</td>
                    </tr>
                    <tr>
                        <th> Created At:</th>
                        <td>{{ date('d-M-Y h:i A',strtotime($notify_data->created_at))}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>     
</div>
@endsection        