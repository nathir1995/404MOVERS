            <nav class="navbar header-navbar pcoded-header">
                <div class="navbar-wrapper">

                    <div class="navbar-logo" style="padding:0px 0px 0px 70px;">
                        <a class="mobile-menu" id="mobile-collapse" href="#!">
                            <i class="feather icon-menu"></i>
                        </a>

                        <a href="{{ route('admin.dashboard')}}">
                            @php $logo=get_logo(); @endphp
                            <img class="img-fluid" src="{{ Storage::url('app/public/'.$logo->option_value) }} " alt="Theme-Logo" style="height: 43px;">
                        </a>
                        <a class="mobile-options">
                            <i class="feather icon-more-horizontal"></i>
                        </a>
                    </div>

                    <div class="navbar-container container-fluid">
                        <ul class="nav-left">

                            <li>
                                <a href="#!" onclick="javascript:toggleFullScreen()">
                                    <i class="feather icon-maximize full-screen"></i>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav-right">

                            {{-- <li class="user-profile header-notification">
                                <div class="dropdown-primary dropdown">
                                    <div class="dropdown-toggle" data-toggle="dropdown">

                                        <span>@if(Session::has('locale')) @if(Session::get('locale')=='en') English @elseif(Session::get('locale')=='ar')  Arabic @else Krudish @endif @else Language  @endif</span>
                                        <i class="feather icon-chevron-down"></i>
                                    </div>
                                     <ul class="show-notification profile-notification dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">

                                        <li>
                                            <a href="{{ url('locale/en') }}">
                                                English
                                            </a>
                                        </li>
                                        <li>
                                            <a href="{{ url('locale/ar') }}">
                                                Arabic
                                            </a>
                                        </li>

                                        <li>
                                            <a href="{{ url('locale/kr') }}">
                                               Krudish
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>  --}}

                            <li class="header-notification">
                                <div class="dropdown-primary dropdown">
                                    <a href="{{ route('admin.notification')}}">
                                        <i class="feather icon-bell"></i>
                                        <span class="badge bg-c-pink">{{count_notification();}}</span>
                                    </a>
                                </div>
                            </li>
                            <li class="user-profile header-notification">
                                <div class="dropdown-primary dropdown">
                                    <div class="dropdown-toggle" data-toggle="dropdown">
                                        <img src="{{Auth::user()->avatar}} " class="img-radius" alt="User-Profile-Image">
                                        <span>{{Auth::user()->first_name}}</span>
                                        <span>{{Auth::user()->last_name}}</span>
                                        <i class="feather icon-chevron-down"></i>
                                    </div>
                                    <ul class="show-notification profile-notification dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">

                                        <li>
                                            <a href="{{ route('admin.profile')}}">
                                                <i class="feather icon-user"></i> Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="{{ route('admin.profile.setting')}}">
                                                <i class="feather icon-settings"></i> Profile Settings
                                            </a>
                                        </li>

                                        <li>
                                            <a href="{{ route('admin.logout')}}">
                                                <i class="feather icon-log-out"></i> Logout
                                            </a>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
