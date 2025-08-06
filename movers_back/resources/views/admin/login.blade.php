<!DOCTYPE html>
<html lang="en">

<head>
    <title>Login</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="#">
    <meta name="keywords" content="Admin , Responsive, Landing, Bootstrap, App, Template, Mobile, iOS, Android, apple, creative app">
    <meta name="author" content="#">
    <!-- Favicon icon -->
    @php $value = get_fevicon(); @endphp
    <link rel="icon" href="{{ Storage::url('app/public/' . $value->option_value) }}" type="image/x-icon">
    <!-- Google font--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,800" rel="stylesheet">
    <!-- Required Fremwork -->
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/css/bootstrap.min.css')}}">
    <!-- themify-icons line icon -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/icon/themify-icons/themify-icons.css')}}">
    <!-- ico font -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/icon/icofont/css/icofont.css')}}">
    <!-- Style.css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/style.css')}}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/custom-style.css')}}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/icon/font-awesome/css/font-awesome.min.css')}}">
    @toastr_css

</head>

<body class="fix-menu">
    <!-- Pre-loader start -->
<div class="theme-loader">
    <div class="ball-scale">
        <div class='contain'>
            <div class="ring"><div class="frame"></div></div>
            <div class="ring"><div class="frame"></div></div>
            <div class="ring"><div class="frame"></div></div>
            <div class="ring"><div class="frame"></div></div>
            <div class="ring"><div class="frame"></div></div>
            <div class="ring"><div class="frame"></div></div>
            <div class="ring"><div class="frame"></div></div>
            <div class="ring"><div class="frame"></div></div>
            <div class="ring"><div class="frame"></div></div>
            <div class="ring"><div class="frame"></div></div>
        </div>
    </div>
</div>


    <!-- Pre-loader end -->
    <section class="login-block">
        <!-- Container-fluid starts -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <!-- Authentication card start -->
                    <form class="md-float-material form-material" method="POST" action="{{ route('admin.login.check')}}">
                        @csrf
                        <div class="text-center">
                            @php $logo=get_logo(); @endphp
                            <img src="{{ Storage::url('app/public/' . $logo->option_value) }}" alt="logo.png">
                        </div>
                        <div class="auth-box card">
                            <div class="card-block">
                                <div class="row m-b-20">
                                    <div class="col-md-12">
                                        <h3 class="text-center txt-primary">Sign In</h3>
                                    </div>
                                </div>
                                @php
                                    $email = '';
                                    $password ='';
                                    if((!empty($_COOKIE['email']) ?? '')&& !empty($_COOKIE['password']??'')){
                                        $login_email = $_COOKIE['email'];
                                        $login_pass  = $_COOKIE['password'];
                                        $is_remember = "checked='checked'";
                                    }else{
                                        $login_email = '';
                                        $login_pass  = '';
                                        $is_remember = '';
                                    }

                                @endphp
                                <p class="text-muted text-center p-b-5">Sign in with your regular account</p>
                                <div class="form-group form-primary">
                                    <input type="text" name="email" class="form-control"  placeholder="Enter Email Address" value="{{$login_email}}">
                                    <span class="form-bar"></span>
                                    @error('email')
                                        <span class="error_message">{{$message}}</span>
                                    @enderror
                                </div>
                                <div class="form-group form-primary">
                                    <input type="password" name="password" class="form-control password_change"  placeholder="Password" value="{{$login_pass}}">
                                    <span class="password-icon show_password"><i class="fa fa-eye"></i></span>
                                    <span class="password-icon hide_password"><i class="fa fa-eye-slash"></i></span>
                                    <span class="form-bar"></span>
                                    @error('password')
                                        <span class="error_message">{{$message}}</span>
                                    @enderror
                                </div>
                                <div class="row m-t-25 text-left">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="border-checkbox-section">
                                                    <div class="border-checkbox-group border-checkbox-group-primary">
                                                    <input class="border-checkbox" type="checkbox" id="checkbox1" name="remember_me" value="true" {{$is_remember}}>
                                                        <label class="border-checkbox-label" for="checkbox1">Remember Me</label>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <a href="{{route('admin.forget.password')}}" class="text-right f-w-600"> Forgot Password?</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row m-t-30">
                                    <div class="col-md-12">
                                        <button type="submit" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">LOGIN</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                        <!-- end of form -->
                    </div>
                    <!-- Authentication card end -->
                </div>
                <!-- end of col-sm-12 -->
            </div>
            <!-- end of row -->
    </section>
    <script type="text/javascript" src="{{ asset('bower_components/jquery/js/jquery.min.js')}}"></script>
    <script type="text/javascript" src="{{ asset('bower_components/jquery-ui/js/jquery-ui.min.js')}}"></script>
    <script type="text/javascript" src="{{ asset('bower_components/popper.js/js/popper.min.js')}}"></script>
    <script type="text/javascript" src="{{ asset('bower_components/bootstrap/js/bootstrap.min.js')}}"></script>
    <!-- jquery slimscroll js -->
    <script type="text/javascript" src="{{ asset('bower_components/jquery-slimscroll/js/jquery.slimscroll.js')}}"></script>
    <!-- modernizr js -->
    <script type="text/javascript" src="{{ asset('bower_components/modernizr/js/modernizr.js')}}"></script>
    <script type="text/javascript" src="{{ asset('bower_components/modernizr/js/css-scrollbars.js')}}"></script>
    <!-- i18next.min.js -->
    <script type="text/javascript" src="{{ asset('bower_components/i18next/js/i18next.min.js')}}"></script>
    <script type="text/javascript" src="{{ asset('bower_components/i18next-xhr-backend/js/i18nextXHRBackend.min.js')}}"></script>
    <script type="text/javascript" src="{{ asset('bower_components/i18next-browser-languagedetector/js/i18nextBrowserLanguageDetector.min.js')}}"></script>
    <script type="text/javascript" src="{{ asset('bower_components/jquery-i18next/js/jquery-i18next.min.js')}}"></script>
    <script type="text/javascript" src="{{ asset('assets/js/common-pages.js')}}"></script>
    <script>
        $(document).ready(function(){
            $('.show_password').show();
            $('.hide_password').hide();
        });

        $('.show_password').click(function(){
            $('.show_password').hide();
            $('.hide_password').show();
            $(".password_change").prop("type", "text");
        });

        $('.hide_password').click(function(){
            $('.show_password').show();
            $('.hide_password').hide();
            $(".password_change").prop("type", "password");
        });

    </script>
    @toastr_js
    @toastr_render
</body>
</html>

