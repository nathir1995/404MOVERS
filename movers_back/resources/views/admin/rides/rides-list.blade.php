@extends('admin.main.index')
@section('title','Rides List')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Rides List</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Rides List</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

{{-- <div class="page-body">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-block">
                    <form action="{{ route('admin.rides.list')}}" method="POST">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="col-md-3"> 
                                <label for="email" class="col-form-label">User Name</label>
                                <input type="text" class="form-control" name="first_name">
                                @error('first_name')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                            <div class="col-md-3"> 
                                <label for="email" class="col-form-label">Email </label>
                                <input type="text" class="form-control" name="email">
                                @error('email')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                            <div class="col-md-3"> 
                                <label for="email" class="col-form-label">Phone Number</label>
                                <input type="text" class="form-control" name="phone_number">
                                @error('phone_number')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                            <div class="col-md-3"> 
                                <button type="submit" class="btn btn-info filter-btn btn-block">Search</button>
                            </div>    
                        </div> 
                    </form>
                </div>
            </div> 
        </div>
    </div> 
</div>              --}}
                        
<div class="page-body">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-block">
                    <div class="dt-responsive table-responsive">
                        <table id="alt-pg-dt" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>User Name</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Ride Start Date</th>
                                <th>Status</th>
                                <th data-orderable="false">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                               
                            @forelse ($ride as $item)
                                <tr>
                                    <td>{{$loop->iteration}}</td>
                                    <td>{{$item->GetUserInfo->first_name.' '.$item->GetUserInfo->last_name}}</td>
                                    <td>{{ substr($item->start_point_name,0,20)}}..</td>
                                    <td>{{ substr($item->end_point_name,0,20)}}..</td>
                                    <td>{{ date('d-M-Y', strtotime($item->ride_start_time))}}</td>
                                    <td>@if($item->status =='1') <span class="pcoded-badge label label-info ">Start</span> 
                                        @elseif($item->status =='2') <span class="pcoded-badge label label-success ">Completed</span>
                                        @elseif($item->status =='3') <span class="pcoded-badge label label-danger ">Cancel</span>
                                        @else <span class="pcoded-badge label label-warning">Not Start</span> @endif</td>
                                    <td>
                                        <a href="{{route('admin.view.rides',[$item->id])}}" class="icon-btn btn-info "><i class="fa fa-eye"></i></a>
                                        {{-- <a href="http://127.0.0.1:8000/admin/users/edit-user-view/2" class="icon-btn btn-success"><i class="fa fa-pencil"></i></a>
                                        <a href="javascript:void(0);" class="icon-btn btn-danger delete_user" attr-id="2" data-toggle="modal" data-target="#delete"><i class="fa fa-trash"></i></a> --}}
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
                                    <td></td>
                                </tr>
                                
                            @endforelse
                              
                            
                            </tbody>
                          
                        </table>
                    </div>
                </div>
            </div>
            <!-- Zero config.table end -->
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
            <h6 class="text-center">Are You Sure For Change Page Status ?</h6>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
            <button type="button" id="change_status" class="btn btn-success" data-dismiss="modal" attr_user_id="" attr_user_status=''>Yes</button>
            </div>
        </div>
    </div>
</div>

<div id="deleteuser" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Delete Page</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            <h5 class="text-center">Are You Sure ?</h5>
            <p class="text-center">You won't be able to revert this!</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
            <button type="button" id="sure_delete" class="btn btn-danger" data-dismiss="modal" attr_user_id="" attr_row_id=''>Yes Delete it</button>
            </div>
        </div>
    </div>
</div>
@endsection
@section('admin')
<script>
    $('.delete_user').click(function(){
        var user_id = $(this).attr('attr-id');
        $('body').find('#sure_delete').attr('attr_user_id',user_id);
        $('body').find('#sure_delete').attr('attr_row_id',user_id);
    });
    
    $('#sure_delete').click(function(){
        var user_id = $(this).attr('attr_user_id');
        $.ajax({
            url: '{{route('admin.delete.page')}}',
            type: "POST",
            data :{_token:'{{csrf_token()}}',user_id},
            beforeSend: function(){
              $('.theme-loader').show();
            },
            success: function(response){
                if(response.success==true){
                    toastr.success(response.message);
                    $('.row_' + user_id).remove();
                }else{
                    toastr.error(response.message);
                }
            },

        });
    });


    $('.status').click(function(){
        var user_id = $(this).attr('attr-id');
        var status = $(this).attr('attr_status');
        $('body').find('#change_status').attr('attr_user_id',user_id);
        $('body').find('#change_status').attr('attr_user_status',status);
    });
    
    $('#change_status').click(function(){
        var page_id = $(this).attr('attr_user_id');
        var status = $(this).attr('attr_user_status');
        $.ajax({
            url: '{{route('admin.page.status')}}',
            type: "POST",
            data :{_token:'{{csrf_token()}}',page_id,status},
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



</script>
@endsection   