@extends('admin.main.index')
@section('title','Rating & Review')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Rating & Review</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
					<li class="breadcrumb-item"><a href="{{ route('admin.rating.list')}}">Rating List</a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">View Rating & Review </a>
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
					<h5 class="card-header-text">Rider Review</h5>
				</div>
				<div class="card-block">
					<div class="view-info">
						<div class="row">	
							<div class="col-lg-12 col-xl-12">
								<div class="table-responsive">
									<table class="table m-0">
										<tbody>
											{{-- <tr>
												<th scope="row">Ride Details</th>
												<td>Jaiput to Delhi</td>	
											</tr> --}}
											<tr>
												<th scope="row">From</th>
												<td>{{$data->getGiver->first_name}}</td>
											</tr>
											<tr>
												<th scope="row">To</th>
												<td>{{$data->getReceiver->last_name}}</td>
											</tr>
										
											<tr>
												<th scope="row">Rating</th>
												<td>@for($i=0;	$i < 5 ; $i++)
														@if($i < $data->rating)
															<span class="fa fa-star starfill"></span>
														@else
															<span class="fa fa-star"></span>
														@endif

													@endfor
												</td>
											</tr>
											<tr>
												<th scope="row">Description</th>
												<td>{{$data->description}}</td>
											</tr>
											<tr>
												<th scope="row">Status</th>
												<td>
													@if ($data->status=='1') <label class="badge bg-success">Active</label>  @elseif($data->status=='0' )<label class="badge bg-danger">In Active</label> @endif
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
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

  