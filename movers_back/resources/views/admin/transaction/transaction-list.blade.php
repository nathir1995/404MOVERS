@extends('admin.main.index')
@section('title','Transaction List')
@section('content')

<div class="page-header">
    <div class="row align-items-end">
        <div class="col-lg-8">
            <div class="page-header-title">
                <div class="d-inline">
                    <h4>Transactions List</h4>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="page-header-breadcrumb">
                <ul class="breadcrumb-title">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.dashboard')}}"> <i class="feather icon-home"></i> </a>
                    </li>
                    <li class="breadcrumb-item"><a href="#!">Transactions List</a>
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
                                <th>Transaction Id</th>
                                <th>Amount</th>
                                <th>Paid By</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th data-orderable="false">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                @forelse ($gettransaction as $item)
                                    <tr>
                                        <td>{{$loop->iteration}}</td>
                                        <td>{{$item->transaction_id}}</td>
                                        <td>IQD {{$item->amount}}</td>
                                        <td>{{$item->GetTransactionUserData->first_name.' '.$item->GetTransactionUserData->last_name}}</td>
                           
                                        <td>
                                            @if($item->status=='0')
                                                <label class="label label-warning">Cancel</label>
                                            @elseif($item->status=='1')
                                                <label class="label label-success">Success</label>
                                            @elseif($item->status=='2')
                                                <label class="label label-danger">Failed</label>
                                            @endif
                                        </td>
                                        <td>{{$item->created_at}}</td>
                                        <td>  
                                            <a href="{{route('admin.view.transaction',$item->id)}}" class="icon-btn btn-info ">
                                                <i class="fa fa-eye"></i>
                                            </a>
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



@endsection