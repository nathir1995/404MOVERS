@extends('admin.main.index')
@section('title','Update Offer')
@section('content')

<div class="page-body">
    <!--profile cover start-->
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-8">
                <div class="page-header-title">
                    <div class="d-inline">
                        <h4>Offer Detail</h4>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="page-header-breadcrumb">
                    <ul class="breadcrumb-title">
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                        </li>
						<li class="breadcrumb-item"><a href="{{ route('admin.offers.list')}}">Offers List</a>
                        </li>
                        <li class="breadcrumb-item"><a href="#!">Offer Details</a>
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
                    <h5 class="card-header-text">About {{$offer_info->title }}</h5>
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
                                                    <th scope="row">Title</th>
                                                    <td>{{$offer_info->title}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Description</th>
                                                    <td>{{$offer_info->description}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Status</th>
                                                    <td>
                                                        @if($offer_info->status=='1')
                                                            <button class="btn btn-success btn-round status" attr-id="{{$offer_info->id}}" attr_status='0' data-toggle="modal" data-target="#changestatus">Pending</button>
                                                        @elseif ($offer_info->status=='2')
                                                            <button class="btn btn-success btn-round status" attr-id="{{$offer_info->id}}" attr_status='0' data-toggle="modal" data-target="#changestatus">Approved</button>
                                                        @elseif ($offer_info->status=='3')
                                                            <button class="btn btn-success btn-round status" attr-id="{{$offer_info->id}}" attr_status='0' data-toggle="modal" data-target="#changestatus">Finished</button>
                                                        @else
                                                            <button class="btn btn-danger btn-round status" attr-id="{{$offer_info->id}}" attr_status='1' data-toggle="modal" data-target="#changestatus">Canceled</button>
                                                        @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Created At</th>
                                                    <td>
                                                        {{ date('d-M-Y', strtotime($offer_info->created_at)) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Offer Image</th>
                                                    <td>
                                                        <img src="{{ Storage::url('app/public/' . $offer_info->image) }} " class="img-radius profile-info" alt="Offer-Image">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
</div>
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
