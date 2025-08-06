@extends('admin.main.index')
@section('title','Rider Payments')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Rider Payments List</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Rider Payments List</a>
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
                <div class="card-block">
                    <div class="dt-responsive table-responsive">
                        <table id="alt-pg-dt" class="table table-striped table-bordered nowrap" style="width:100%">
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Amount</th>
                                <th>Rider</th>
                                <th>Ride</th>
                                <th>Status</th>
                                {{-- <th>Created At</th> --}}
                                <th data-orderable="false">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                @forelse ($gettransaction as $item)
                                    <tr>
                                        <td>{{$loop->iteration}}</td>
                                        <td>IQD {{$item->total_amount}}</td>
                                        <td>{{$item->GetRideDataForTransaction->GetUserInfo->first_name.' '.$item->GetRideDataForTransaction->GetUserInfo->last_name}}</td>
                                        <td><a href="{{route('admin.view.rides',[$item->GetRideDataForTransaction->id])}}">{{ substr($item->GetRideDataForTransaction->start_point_name.' To '.$item->GetRideDataForTransaction->end_point_name,0,50)}}</a></td>
                           
                                        <td>
                                            @if($item->pay_to_rider=='0')
                                                <label class="label label-warning">Pending</label>
                                            @elseif($item->pay_to_rider=='1')
                                                <label class="label label-success">Success</label>
                                            
                                            @endif
                                        </td>
                                        {{-- <td>{{$item->created_at}}</td> --}}
                                        <td>  
                                            {{-- <a href="{{route('admin.view.transaction',$item->id)}}" class="icon-btn btn-info ">
                                                <i class="fa fa-eye"></i>
                                            </a> --}}
                                            @if($item->pay_to_rider=='0')
                                                <button class="btn btn-success btn-round pay-status" attr-id="{{$item->ride_id}}" data-toggle="modal" data-target="#myModal">Pay To Rider</button>
                                                @elseif($item->pay_to_rider=='1')
                                                <button class="btn btn-success btn-round" disabled>Paid</button>
                                            @endif
                                            
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
                <h4 class="modal-title">Pay To Rider</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            <h6 class="text-center">Are You Sure For Pay to rider ?</h6>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
            <button type="button" id="change_status" class="btn btn-success" data-dismiss="modal" attr_ride_id="">Yes</button>
            </div>
        </div>
    </div>
</div>


@endsection
@section('admin')
<script>
    $('.pay-status').click(function(){
        var ride_id = $(this).attr('attr-id');
        $('body').find('#change_status').attr('attr_ride_id',ride_id);
    });
    
    $('#change_status').click(function(){
        var ride_id = $(this).attr('attr_ride_id');
        $.ajax({
            url: '{{route('admin.pay.to.rider')}}',
            type: "POST",
            data :{_token:'{{csrf_token()}}',ride_id},
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