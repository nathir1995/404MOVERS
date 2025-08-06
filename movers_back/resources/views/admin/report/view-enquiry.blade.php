@extends('admin.main.index')
@section('title','Enquiry')
@section('content')


<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>View Enquiry</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
					<li class="breadcrumb-item"><a href="{{ route('admin.enquiry.list')}}">Enquiry List</a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">View Enquiry</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="page-body">
	<div class="row">
		<div class="col-lg-8">
			<!-- tab content start -->
			<div class="tab-content">
				<!-- tab panel personal start -->
				<div class="tab-pane active" id="personal" role="tabpanel">
					<!-- personal card start -->
					<div class="card">
						<div class="card-header">
							<h5 class="card-header-text">Enquiry</h5>
						</div>
						<div class="card-block">
							<div class="view-info">
								<div class="row">
									<div class="col-lg-12">
										<div class="general-info">
											<div class="row">
												<div class="col-lg-12 col-xl-12">
													<div class="table-responsive">
														<table class="table m-0">
															<tbody>
															
																<tr>
																	<th scope="row">User Name</th>
																	<td>{{$data->getEnquiryUser->first_name}}</td>
																</tr>
																
																<tr>
																	<th scope="row">Enquiry Reason</th>
																	<td>{{$data->getEnquiryReason->reason}}</td>
																</tr>
														
															
																<tr>
																	<th scope="row">Enquiry</th>
																	<td>{{$data->enquiry}}</td>
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
											</div>
											<!-- end of row -->
										</div>
										<!-- end of general info -->
									</div>
									<!-- end of col-lg-12 -->
								</div>
								<!-- end of row -->
							</div>
							<!-- end of view-info -->
						</div>
						<!-- end of card-block -->
					</div>
					<!-- personal card end-->
				</div>
				<!-- tab pane personal end -->
			</div>
			<!-- tab content end -->
		</div>
	</div>
</div>
@endsection

 