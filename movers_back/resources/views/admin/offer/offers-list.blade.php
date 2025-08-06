@extends('admin.main.index')
@section('title','Offers List')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Offers List</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Offers List</a>
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
                    <a href="{{ route('admin.add.offer')}}" class="btn btn-mat btn-info"><i class="fa fa-plus"></i>Add Offer</a>
                </div>
                <div class="card-block">
                    <div class="dt-responsive table-responsive">
                        <table id="simpletable" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created at</th>
                                <th>Updated at</th>
                                <th data-orderable="false">Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                @forelse($data as $info)
                                <tr class="row_{{$info->id}}">
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $info->title}}</td>
                                    <td>{{ $info->description}}</td>
                                    <td>{{ $info->created_at}}</td>
                                    <td>{{ $info->updated_at}}</td>
                                    <td>
                                        @if($info->status=='1')
                                            <button class="btn btn-success btn-round status" attr-id="{{$info->id}}" attr_status='2' data-toggle="modal" data-target="#changestatus">Pending</button>
                                        @elseif ($info->status=='2')
                                            <button class="btn btn-success btn-round status" attr-id="{{$info->id}}" attr_status='3' data-toggle="modal" data-target="#changestatus">Approved</button>
                                        @elseif ($info->status=='3')
                                            <button class="btn btn-success btn-round status" attr-id="{{$info->id}}" attr_status='0' data-toggle="modal" data-target="#changestatus">Finished</button>
                                        @else
                                            <button class="btn btn-danger btn-round status" attr-id="{{$info->id}}" attr_status='2' data-toggle="modal" data-target="#changestatus">Canceled</button>
                                        @endif
                                    </td>
                                    <td>
                                        <a href="{{route('offer.view',[$info->id])}}" class="icon-btn btn-info "><i class="fa fa-eye"></i></a>
                                        <a href="{{ route('edit.offer',[$info->id])}}" class="icon-btn btn-success"><i class="fa fa-pencil"></i></a>
                                        <a href="javascript:void(0);" class="icon-btn btn-danger delete_user" attr-id="{{$info->id}}" data-toggle="modal" data-target="#delete"><i class="fa fa-trash"></i></a>
                                    </td>
                                </tr>
                                @empty
                                <tr>
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

    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-block">
                    <form action="{{ route('user.send.notification')}}" method="post" enctype="multipart/form-data">
                        @csrf
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
@section('admin')
<script>
$('#simpletable').DataTable({
    "columnDefs": [
    { "orderable": false, "targets": 6 },

    ]
});
    $(document).on('click','.delete_user',function(){
        var id = $(this).attr('attr-id');
        var url =  '{{route('admin.delete.offer')}}';
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
        var url = '{{route('admin.change.offer.status')}}';
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
