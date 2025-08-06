<!DOCTYPE html>
<html lang="en">

<head>
    <title>Reset Password</title>
 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="#">
    <meta name="keywords" content="Admin , Responsive, Landing, Bootstrap, App, Template, Mobile, iOS, Android, apple, creative app">
    <meta name="author" content="#">
    <!-- Favicon icon -->
    @php $value = get_fevicon();@endphp
    <link rel="icon" href="{{ asset('storage/'.$value->option_value)}}" type="image/x-icon">
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
    
                    <form class="md-float-material form-material" method="POST" action="{{ route('admin.submit.new.password')}}">
                        @csrf
                        
                        <div class="text-center">
                            @php $logo=get_logo(); @endphp
                            <img src="{{ asset('storage/'.$logo->option_value) }}" alt="logo.png">
                        </div>
                        <div class="auth-box card">
                            <div class="card-block">
                                <div class="row m-b-20">
                                    <div class="col-md-12">
                                        <h3 class="text-left">Recover your password</h3>
                                    </div>
                                </div>
                                
                                <div class="form-group form-primary">
                                    <input type="password" name="password" class="form-control password_change" required="" placeholder="Enter New Password">
                                    <span class="new-password-icon show_password"><i class="fa fa-eye"></i></span>
                                    <span class="new-password-icon hide_password"><i class="fa fa-eye-slash"></i></span>
                                    <input type="hidden" name="reset_token" value="{{$code}}">
                                    <span class="form-bar"></span>
                                    @error('password')
                                    <span class="error_message">{{$message}}</span>
                                    @enderror
                                </div>
                                <div class="form-group form-primary">
                                    <input type="password" name="confirm_password" class="form-control confirm_password_change" required="" placeholder="Enter Confirm Password">
                                    <span class="confirm-password-icon confirm_show_password"><i class="fa fa-eye"></i></span>
                                    <span class="confirm-password-icon confirm_hide_password"><i class="fa fa-eye-slash"></i></span>
                                    <span class="form-bar"></span>
                                    @error('confirm_password')
                                    <span class="error_message">{{$message}}</span>
                                    @enderror
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <button type="submit" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">Reset Password</button>
                                    </div>
                                </div>
                                <p class="f-w-600 text-right">Back to <a href="{{route('admin.login')}}">Login.</a></p>
                           
                            </div>
                        </div>
                    </form>
                    <!-- Authentication card end -->
                </div>
                <!-- end of col-sm-12 -->
            </div>
            <!-- end of row -->
        </div>
        <!-- end of container-fluid -->
    </section>
    <!-- Warning Section Starts -->
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
            $('.confirm_show_password').show();
            $('.confirm_hide_password').hide();
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
        $('.confirm_show_password').click(function(){
            $('.confirm_show_password').hide();
            $('.confirm_hide_password').show();
            $(".confirm_password_change").prop("type", "text");

        });
        $('.confirm_hide_password').click(function(){
            $('.confirm_show_password').show();
            $('.confirm_hide_password').hide();
            $(".confirm_password_change").prop("type", "password");
        });

    </script>
    @toastr_js
    @toastr_render
</body>

</html>
