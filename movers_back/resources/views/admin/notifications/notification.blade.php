@extends('admin.main.index')
@section('title','Admin Notifications')
@section('content')
<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Notifications </h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
           
                    <li class="breadcrumb-item"><a href="#!">Notifications List</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="page-body">  
    <div class="row">
        <div class="col-md-12">
            <ul class="list-group">
                @forelse ($notifications as $item)
                    @if($item->read==0)
                        <li class="list-group-item  mb-1 ">
                            <a href="{{ route('view.notification',[$item->id])}}"> 
                                <p class="noti-content">{{ $item->notification}}</p>
                            </a>
                            <span class="date-style">{{ date('d-M-Y h:i A',strtotime($item->created_at))}}</span>
                            <a href="javascript:void(0)" class="read-align" attr-id="{{ $item->id }}">Mark As Read</a>
                        </li>
                    @elseif($item->read==1)
                        <li class="list-group-item mb-1">
                            <a href="{{ route('view.notification',[$item->id])}}">
                                <p class="noti-content">{{ $item->notification}}</p>
                            </a>  
                            <span class="date-style">{{ date('d-M-Y h:i A',strtotime($item->created_at))}}</span>
                        </li>
                    @endif
                   
                    @empty
                        <li class="list-group-item mb-1 ">
                            <p>No Notifications found</p>
                        </li>
                    @endforelse

                <?php echo $notifications->links('pagination::bootstrap-4'); ?>
                  
            </ul>
        </div>
    </div>            
</div>
@endsection

@section('admin')

<script>
    $(document).on('click','.read-align',function(){
        var id = $(this).attr('attr-id');
        $.ajax({
            url  :'{{route('change.notification.status')}}',
            type : 'POST',
            data :{_token:'{{csrf_token()}}',id},
            success:function(response){
                if(response.success==true){
                    toastr.success(response.message);
                    setTimeout(function(){
                    window.location.reload();
                    }, 4000);
                }
                else{
                    toastr.error(response.message);
                }
            },
        })
    });
</script>
@endsection