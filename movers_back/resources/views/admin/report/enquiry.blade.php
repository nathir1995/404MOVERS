@extends('admin.main.index')
@section('title','Enquiry List')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Enquiry List</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Enquiry List</a>
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
                <div class="card-header">
                    <!-- <h5>Zero Configuration</h5>
                    <span>DataTables has most features enabled by default, so all you need to do to use it with your own ables is to call the construction function: $().DataTable();.</span> -->
                <div class="card-block">
                    <div class="dt-responsive table-responsive">
                        <table id="alt-pg-dt" class="table table-striped table-bordered nowrap">
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>User Name</th>
                                <th>Enquiry</th>
                                <th>Enquiry Status</th>
                                <th data-orderable="false">Action</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                                @forelse ($data as $item)
                                    <tr class="row_{{$item->id}}">
                                        <td>{{ $loop->iteration}}</td>
                                        <td>{{ $item->getEnquiryUser->first_name}}</td>
                                        <td>{{ $item->enquiry }}</td>
                                        <td>@if ($item->status== 1)
                                                <label class="badge bg-info">New</label>
                                            @elseif($item->status== 2)
                                                <label class="badge bg-warning">Read</label>
                                            @else
                                                <label class="badge bg-success">Resolved</label>
                                            
                                            @endif
                                        </td>
                                        <td>
                                            <a href="{{ route('admin.enquiry.view',[$item->id])}}" class="icon-btn btn-primary "><i class="fa fa-eye"></i></a>   
                                            <a href="javascript:void(0);" class="icon-btn btn-info reply_user" attr-id="{{$item->id}}"  data-toggle="modal" data-target="#reply_emquiry">
                                                <i class="fa fa-reply"></i>
                                            </a>
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
                <button type="button" id="sure_reply" class="btn btn-success" data-dismiss="modal" attr_reply_id="">Sent</button>
            </div>
        </div>
    </div>
</div>
@endsection
@section('admin')
<script>

    $(document).on('click','.delete_user',function(){
        var id = $(this).attr('attr-id');
        var url = '{{route('admin.delete.enquiry')}}';
        $('body').find('#sure-delete').attr('row-id',id);
        $('body').find('#sure-delete').attr('route-url',url);
    });
    
    $('#sure-delete').click(function(){
        var id = $(this).attr('row-id');
        var url = $(this).attr('route-url');
        delete_data(id,url);

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
        $.ajax({
            url: '{{route('admin.enquiry.reply')}}',
            type: "POST",
            data :{_token:'{{csrf_token()}}',id,title,summary,description},
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