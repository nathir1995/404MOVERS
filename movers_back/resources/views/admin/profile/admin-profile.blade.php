@extends('admin.main.index')
@section('title','Admin Profile')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Admin Profile</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Admin Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="page-body">
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header">
					<h5 class="card-header-text">About Admin</h5>
				</div>
				<div class="card-block">
					<div class="view-info">
						
						<div class="row">
							<div class="col-lg-12 col-xl-6">
								<div class="table-responsive">
									<table class="table m-0">
										<tbody>
										
											<tr>
												<th scope="row">First Name</th>
												<td>{{$user_info->first_name}}</td>
											</tr>
											<tr>
												<th scope="row">Last Name</th>
												<td>{{$user_info->last_name}}</td>
											</tr>
											<tr>
												<th scope="row">Gender</th>
												<td>@if ($user_info->gender=='1') Male @elseif($user_info->gender=='2') Female @endif</td>
											</tr>
									
											<tr>
												<th scope="row">Address</th>
												<td>{{$user_info->address}}</td>
											</tr>
											<tr>
												<th scope="row">Email</th>
												<td>{{$user_info->email}}</td>
											</tr>
											<tr>
												<th scope="row">Date Of Birth</th>
												<td>{{$user_info->dob}}</td>
											</tr>
											
										</tbody>
									</table>
								</div>
							</div>
							<!-- end of table col-lg-6 -->
							<div class="col-lg-12 col-xl-6">
								<div class="table-responsive">
									<table class="table">
										<tbody>
											<tr>
												<th scope="row">Mobile Number</th>
												<td>{{$user_info->contact_code}} {{$user_info->phone_number}}</td>
											</tr>
											<tr>
												<th scope="row">Profile Image</th>
												<td>   
													<img src="{{Auth::user()->avatar }} " class="img-radius" alt="User-Profile-Image">
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<!-- end of table col-lg-6 -->
						</div>
					</div>
					<!-- end of view-info -->
				</div>
				<!-- end of card-block -->
			</div>
		</div>
	</div>
</div>
@endsection

