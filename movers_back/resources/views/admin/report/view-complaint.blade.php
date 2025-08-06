@extends('admin.main.index')
@section('title','Complaint')
@section('content')


<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>View Complaint</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
					<li class="breadcrumb-item"><a href="{{ route('admin.complaint.list')}}">Complaint List</a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">View Complaint</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="page-body">
	<div class="row">
		<div class="col-lg-8">
			<div class="card">
				<div class="card-header">
					<h5 class="card-header-text">Complaint</h5>
				</div>
				<div class="card-block">
					<div class="view-info">
						<div class="row">
							<div class="col-lg-12 col-xl-12">
								<div class="table-responsive">
									<table class="table m-0">
										<tbody>
											<tr>
												<th scope="row">Ride</th>
												<td>
													<a href="{{route('admin.view.rides',[$data->getRideInformation->id])}}" class="text-primary" >{{$data->getRideInformation->start_point_name. ' -> '.$data->getRideInformation->end_point_name}}
													</a>	
												</td>
											</tr>
											<tr>
												<th scope="row">User Name</th>
												<td>{{$data->getComplaintUser->first_name}}</td>
											</tr>
											<tr>
												<th scope="row">Complaint Reason</th>
												<td>{{$data->getComplaintReason->reason}}</td>
											</tr>
											<tr>
												<th scope="row">Complaint</th>
												<td>{{$data->complaints}}</td>
											</tr>
											<tr>
												<th scope="row">Status</th>
												<td>
													@if ($data->status=='1')
														<label class="badge bg-info">New</label>  
													@elseif($data->status=='2' )
														<label class="badge bg-warning">Read</label> 
													@else
														<label class="badge bg-success">Resolved</label>
													@endif
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
										<!-- end of table col-lg-6 -->
								
							<!-- end of col-lg-12 -->
						</div>
						<!-- end of row -->
					</div>
					<!-- end of view-info -->
				</div>
				<!-- end of card-block -->
			</div>
		
		</div>
	</div>
</div>
@endsection

