@php $value = get_fevicon();@endphp
    <link rel="icon" href="{{ Storage::url('app/public/'.$value->option_value)}}" type="image/x-icon">
<!-- Google font-->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,800" rel="stylesheet">
<!-- Required Fremwork -->
<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/css/bootstrap.min.css')}}">
<!-- themify-icons line icon -->
<link rel="stylesheet" type="text/css" href="{{ asset('assets/icon/themify-icons/themify-icons.css')}}">
<!-- ico font -->
<link rel="stylesheet" type="text/css" href="{{ asset('assets/icon/icofont/css/icofont.css')}}">
<!-- feather Awesome -->
<link rel="stylesheet" type="text/css" href="{{ asset('assets/icon/feather/css/feather.css')}}">
<!-- Syntax highlighter Prism css -->
<link rel="stylesheet" type="text/css" href="{{ asset('assets/pages/prism/prism.css')}}">
<!-- Style.css -->
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/style.css')}}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/custom-style.css')}}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/jquery.mCustomScrollbar.css')}}">
<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/datatables.net-bs4/css/dataTables.bootstrap4.min.css')}}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/pages/data-table/css/buttons.dataTables.min.css')}}">
<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css')}}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/icon/font-awesome/css/font-awesome.min.css')}}">
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
@toastr_css

