@extends('admin.main.index')
@section('title','Add Page')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Add Page</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="{{ route('admin.cms.list')}}">Pages List</a>
                        </li>
                    <li class="breadcrumb-item"><a href="#!">Add Page</a></li>
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
                    <form action="{{ route('admin.cms.submit.page')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Page Title<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="title" value="{{ old('title')}}" placeholder="Enter Page Title" />
                                @error('title')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                            
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Page Content In English<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-10">
                                <textarea id="summernote" name="content" >{{ old('content')}}
                                </textarea>
                                @error('content')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Page Content In Arabic<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-10">
                                <textarea id="summernote" name="content_ar" >{{ old('content_ar')}}
                                </textarea>
                                @error('content_ar')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Page Content In Kurdish<span class="mandatoryicon">*</span></label>
                            <div class="col-sm-10">
                                <textarea id="summernote" name="content_ku" >{{ old('content_ku')}}
                                </textarea>
                                @error('content_ku')
                                <span class="error_message">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Status <span class="mandatoryicon">*</span></label>
                            <div class="col-sm-10">
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="status" value="1" {{old('status')=='1' ? 'checked':''}} > Active
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="status" value="0" {{old('status')=='0' ? 'checked':''}}> Inactive
                                    </label>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        @error('status')
                                            <span class="error_message">{{$message}}</span>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-b-0" style="float:right;">Submit</button>
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

