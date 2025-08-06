@extends('admin.main.index')
@section('title','Edit Reason')
@section('content')
<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Edit Reason</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="{{ route('admin.reasons.list')}}">Reason List</a>
                        </li>
                    <li class="breadcrumb-item"><a href="#!">Edit Reason</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
              
<div class="page-body">
    <div class="row">
        <div class="col-sm-8">
            <div class="card">
                <div class="card-block">
                    <form action="{{ url('admin/report/reasons/submit-edit-reason/'.$data->id)}}" method="post" enctype="multipart/form-data">
                        @csrf
                 
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Reason <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="reason" value="{{$data->reason}}" placeholder="Enter Reason" />
                                @error('reason')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                            
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Reason Type <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <select name="reason_type" class="form-control">
                                    <option value="">Reason Type
                                    </option>
                                    {{-- <option value="1" {{$data->reason_type=='1' ? 'selected':''}}>Enquiry</option> --}}
                                    <option value="2" {{$data->reason_type=='2' ? 'selected':''}}>Complaint</option>
                                    <option value="3" {{$data->reason_type=='3' ? 'selected':''}}>Cancel</option>
                                </select>
                                @error('reason_type')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Status <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-9">
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="status" value="1" {{$data->status=='1' ? 'checked':''}} > Active
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="status" value="0" {{$data->status=='0' ? 'checked':''}}> Inactive
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-3"></div>
                            <div class="col-sm-9">
                                @error('status')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3"></label>
                            <div class="col-sm-9">
                                <button type="submit" class="btn btn-primary m-b-0">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- Number Validation card end -->
        </div>
    </div>
</div>
            
@endsection

