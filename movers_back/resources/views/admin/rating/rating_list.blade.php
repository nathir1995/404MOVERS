@extends('admin.main.index')
@section('title','Rating & Reviews')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Ratings List</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Ratings List</a>
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
                        <table id="rating" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Rating To</th>
                                <th>Rating From</th>
                                <th>Review</th>
                                <th>Status</th>
                                <th data-orderable="false">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                @forelse ($data as $item)
                                <tr>
                                    <td>{{$loop->iteration}}</td>
                                    <td>{{ $item->getReceiver->first_name}}</td>
                                    <td>{{ $item->getGiver->first_name}}</td>
                                    <td>{{ $item->description}}</td>
                                    <td>
                                        @if($item->status=='1')
                                            <button class="btn btn-success btn-round status" attr-id="{{$item->id}}" attr_status='0' data-toggle="modal" data-target="#changestatus">Active</button>
                                        @else
                                            <button class="btn btn-danger btn-round status" attr-id="{{$item->id}}" attr_status='1' data-toggle="modal" data-target="#changestatus">In Active</button>
                                        @endif
                                    </td>
                                    <td>
                                        <a href="{{ route('admin.view.rating',[$item->id])}}" class="icon-btn btn-info ">
                                            <i class="fa fa-eye"></i>
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
                                    <td>No data found</td>
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
   
$('#rating').DataTable({
    "columnDefs": [
    { "orderable": false, "targets": [5] },
  
    ]
});

$(document).on('click','.delete_user',function(){
        var id = $(this).attr('attr-id');
        var url = '{{route('admin.delete.rating')}}';
        $('body').find('#sure-delete').attr('row-id',id);
        $('body').find('#sure-delete').attr('route-url',url);
    });
    
    $('#sure-delete').click(function(){
        var id = $(this).attr('row-id');
        var url = $(this).attr('route-url');
        delete_data(id,url);

    });

    $(document).on('click','.status',function(){
        var id = $(this).attr('attr-id');
        var status = $(this).attr('attr_status');
        var url = '{{route('admin.rating.status')}}';
        $('body').find('#change_status').attr('current_id',id);
        $('body').find('#change_status').attr('new_status',status);
        $('body').find('#change_status').attr('url',url);
    });
    
    $('#change_status').click(function(){
        var id = $(this).attr('current_id');
        var status = $(this).attr('new_status');
        var url = $(this).attr('url');;
        changestatus(id,status,url);
    });
</script>
@endsection   