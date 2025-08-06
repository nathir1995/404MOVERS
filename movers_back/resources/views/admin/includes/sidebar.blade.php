                    <nav class="pcoded-navbar">
                        <div class="pcoded-inner-navbar main-menu">
                            <ul class="pcoded-item pcoded-left-item">
                                <li class="{{ (Request::is('admin/dashboard') ? 'active' : '') }}">
                                    <a href="{{ route('admin.dashboard')}}">
                                        <span class="pcoded-micon"><i class="feather icon-home"></i></span>
                                        <span class="pcoded-mtext">Dashboard</span>
                                    </a>
                                </li>
                                <li class="pcoded-hasmenu {{ (Request::is('admin/users/*') ? 'pcoded-trigger' : '') }}">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="feather icon-users"></i></span>
                                        <span class="pcoded-mtext">User Manager</span>
                                    </a>
                                    <ul class="pcoded-submenu ">
                                        <li class=" {{ (Request::is('admin/users/*') ? 'active' : '') }}">
                                            <a href="{{ route('user.list')}}">
                                                <span class="pcoded-mtext">Users List</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="pcoded-hasmenu {{ (Request::is('admin/report/*') || Request::is('admin/report/reasons/*')  ? 'pcoded-trigger' : '') }}">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="fa fa-commenting-o"></i></span>
                                        <span class="pcoded-mtext">Report Manager</span>
                                    </a>
                                    <ul class="pcoded-submenu ">
                                        {{-- <li class=" {{ (Request::is('admin/report/enquiry/*') || Request::is('admin/report/enquiry') ? 'active' : '') }}">
                                            <a href="{{ route('admin.enquiry.list')}}">
                                                <span class="pcoded-mtext">Enquiry</span>
                                            </a>
                                        </li> --}}
                                        <li class=" {{ (Request::is('admin/report/complaint/*') || Request::is('admin/report/complaint') ? 'active' : '') }}">
                                            <a href="{{ route('admin.complaint.list')}}">
                                                <span class="pcoded-mtext">Complaint</span>
                                            </a>
                                        </li>
                                        <li class=" {{ (Request::is('admin/report/cancel/*') || Request::is('admin/report/cancel') ? 'active' : '') }}">
                                            <a href="{{ route('admin.cancel.rides')}}">
                                                <span class="pcoded-mtext">Rides Cancel</span>
                                            </a>
                                        </li>
                                        <li class=" {{ (Request::is('admin/report/reasons') ||  Request::is('admin/report/reasons/*') ? 'active' : '') }}">
                                            <a href="{{ route('admin.reasons.list')}}">
                                                <span class="pcoded-mtext">Reasons</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="{{ (Request::is('admin/rating/*') ? 'active' : '') }}">
                                    <a href="{{ route('admin.rating.list')}}">
                                        <span class="pcoded-micon"><i class="fa fa-star-o"></i></span>
                                        <span class="pcoded-mtext">Review and Rating</span>
                                    </a>
                                </li>


                                <li class="pcoded-hasmenu {{ (Request::is('admin/transaction/*') ? 'pcoded-trigger' : '') }}">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="fa fa-dollar"></i></span>
                                        <span class="pcoded-mtext">Transaction History</span>
                                    </a>
                                    <ul class="pcoded-submenu ">
                                        <li class=" {{ (Request::is('admin/transaction/transaction-list') ||
                                        Request::is('admin/transaction/view-transaction') ? 'active' : '') }}">
                                            <a href="{{ route('admin.transaction.list')}}">
                                                <span class="pcoded-mtext">Transaction List</span>
                                            </a>
                                        </li>
                                        <li class=" {{ (
                                        Request::is('admin/transaction/rider-transaction') ? 'active' : '') }}">
                                            <a href="{{ route('admin.view.rider.transaction')}}">
                                                <span class="pcoded-mtext">Pending Ride Payments</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="pcoded-hasmenu {{ (Request::is('admin/cms/*') ? 'pcoded-trigger' : '') }}">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="feather icon-sidebar"></i></span>
                                        <span class="pcoded-mtext">CMS Pages</span>
                                    </a>
                                    <ul class="pcoded-submenu ">
                                        <li class=" {{ (Request::is('admin/cms/pages/*') ? 'active' : '') }}">
                                            <a href="{{ route('admin.cms.list')}}">
                                                <span class="pcoded-mtext">Pages List</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="pcoded-hasmenu {{ (Request::is('admin/setting/*') ? 'pcoded-trigger' : '') }}">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="feather icon-settings"></i></span>
                                        <span class="pcoded-mtext">Admin Setting</span>
                                    </a>
                                    <ul class="pcoded-submenu ">
                                        <li class=" {{ (Request::is('admin/setting/logo-favicon') ? 'active' : '') }}">
                                            <a href="{{ route('admin.setting.site')}}">
                                                <span class="pcoded-mtext">Logo Setting</span>
                                            </a>
                                        </li>
                                        <li class=" {{ (Request::is('admin/setting/admin-setting') ? 'active' : '') }}">
                                            <a href="{{ route('admin.setting')}}">
                                                <span class="pcoded-mtext">Admin Setting</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="pcoded-hasmenu {{ (Request::is('admin/rides/*') ? 'pcoded-trigger' : '') }}">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="feather icon-user"></i></span>
                                        <span class="pcoded-mtext">Ride Manager</span>
                                    </a>
                                    <ul class="pcoded-submenu ">
                                        <li class=" {{ (Request::is('admin/rides/users/rides-list') ? 'active' : '') }}">
                                            <a href="{{ route('admin.rides.list')}}">
                                                <span class="pcoded-mtext">Rides List</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="{{ (Request::is('admin/offers') ? 'active' : '') }}">
                                    <a href="{{ route('admin.offers.list')}}">
                                        <span class="pcoded-micon"><i class="feather icon-home"></i></span>
                                        <span class="pcoded-mtext">Offers</span>
                                    </a>
                                </li>

                                {{-- <li class="pcoded-hasmenu {{ (Request::is('admin/cost/*') ? 'pcoded-trigger' : '') }}">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="fa fa-money"></i></span>
                                        <span class="pcoded-mtext">Cost Manager</span>
                                    </a>
                                    <ul class="pcoded-submenu ">
                                        <li class="{{ (Request::is('admin/cost/get-cost-list') ? 'active' : '') }}">
                                            <a href="{{ route('admin.cost.list')}}">
                                                <span class="pcoded-mtext">Cost List</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li> --}}

                                {{--<li class="pcoded-hasmenu {{ (Request::is('admin/earning/*') ? 'pcoded-trigger' : '') }}">
                                    <a href="javascript:void(0)">
                                        <span class="pcoded-micon"><i class="fa fa-dollar"></i></span>
                                        <span class="pcoded-mtext">Earning Manager</span>
                                    </a>
                                    <ul class="pcoded-submenu ">
                                        <li class="{{ (Request::is('admin/earning/get-earning-list') ? 'active' : '') }}">
                                            <a href="{{ route('admin.earning.list')}}">
                                                <span class="pcoded-mtext">Earning List</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>--}}

                            </ul>
                        </div>
                    </nav>
