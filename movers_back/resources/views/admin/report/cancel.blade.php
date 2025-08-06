@extends('admin.main.index')
@section('title','Cancel Rides List')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Cancel Rides</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Cancel Rides</a>
                    </li>
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
                    <div class="dt-responsive table-responsive">
                        <table id="alt-pg-dt" class="table table-striped table-bordered nowrap">
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>User Name</th>
                                <th>Cancel Reason</th>
                                <th>Description</th>
                                <th>Ride</th>
                                <th data-orderable="false">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                @forelse ($cancel as $item)
                                <tr class="row_{{$item->id}}">
                                    <td>{{ $loop->iteration}}</td>
                                    <td>{{ $item->getCanceluser->first_name}}</td>
                                    <td>{{ $item->getCancelReason->reason}}</td>
                                    <td>{{ $item->cancel_reason}}</td>
                                    <td>
                                        <a href="{{route('admin.view.rides',[$item->getCancelRideInformation->id])}}" class="text-primary">
                                            {{ $item->getCancelRideInformation->start_point_name}}
                                        </a>
                                    </td>
                                    <td>
                                        <a href="javascript:void(0);" class="icon-btn btn-danger delete_user" attr-id="{{$item->id}}" data-toggle="modal" data-target="#delete">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>    
                            @empty
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>No data Found</td>
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


@endsection
@section('admin')
<script>

    $(document).on('click','.delete_user',function(){
        var id = $(this).attr('attr-id');
        var url = '{{route('admin.delete.cancel.reason')}}';
        $('body').find('#sure-delete').attr('row-id',id);
        $('body').find('#sure-delete').attr('route-url',url);
    });
    
    $('#sure-delete').click(function(){
        var id = $(this).attr('row-id');
        var url = $(this).attr('route-url');
        delete_data(id,url);

    });

</script>
@endsection   