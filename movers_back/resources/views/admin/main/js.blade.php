<script type="text/javascript" src="{{ asset('bower_components/jquery/js/jquery.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('bower_components/jquery-ui/js/jquery-ui.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('bower_components/popper.js/js/popper.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('bower_components/bootstrap/js/bootstrap.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('bower_components/jquery-slimscroll/js/jquery.slimscroll.js')}}"></script>
<script type="text/javascript" src="{{ asset('bower_components/modernizr/js/modernizr.js')}}"></script>
<script type="text/javascript" src="{{ asset('bower_components/modernizr/js/css-scrollbars.js')}}"></script>
 <!-- i18next.min.js -->
<script src="{{ asset('bower_components/chartist/js/chartist.js')}}"></script>
<script src="{{ asset('assets/pages/chart/chartlist/js/chartist-plugin-threshold.js')}}"></script>
<script src="{{ asset('bower_components/raphael/js/raphael.min.js')}}"></script>
<script src="{{ asset('bower_components/morris.js/js/morris.js')}}"></script>
<!-- data-table js -->
<script src="{{ asset('bower_components/datatables.net/js/jquery.dataTables.min.js')}}"></script>
<script src="{{ asset('bower_components/datatables.net-buttons/js/dataTables.buttons.min.js')}}"></script>

<script src="{{ asset('bower_components/datatables.net-buttons/js/buttons.html5.min.js')}}"></script>
<script src="{{ asset('bower_components/datatables.net-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
<script src="{{ asset('bower_components/datatables.net-responsive/js/dataTables.responsive.min.js')}}"></script>
<script src="{{ asset('bower_components/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js')}}"></script>

<script src="{{ asset('assets/pages/data-table/js/data-table-custom.js')}}"></script>

<script src="{{ asset('assets/pages/chart/morris/morris-custom-chart.js')}}"></script>
<script src="{{ asset('assets/js/pcoded.min.js')}}"></script>
<script src="{{ asset('assets/js/jquery.mCustomScrollbar.concat.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/js/script.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/pages/prism/custom-prism.js')}}"></script>
<script src="{{ asset('assets/js/custom-javascript.js')}}"></script>


<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>

<script>
    function changestatus(id,status,url){
        var id = id;
        var url = url;
        var status = status;
        $.ajax({
            url: url,
            type: "POST",
            data :{_token:'{{csrf_token()}}',id,status},
            beforeSend: function(){
              $('.theme-loader').show();
            },
            success: function(response){
                if(response.success==true){
                    location.reload();
                }
                else{
                    toastr.error(response.message);
                }
            },
        });
    }

    function delete_data(id,url){
        var id = id;
        var url = url;
        $.ajax({
            url: url,
            type: "POST",
            data :{_token:'{{csrf_token()}}',id},
            beforeSend: function(){
              $('.theme-loader').show();
            },
            success: function(response){
                if(response.success==true){
                    location.reload();
                }
                else{
                    toastr.error(response.message);
                }
            },
        });
    }

</script>


@if(Session::get('locale')=='en' || Session::get('locale')=='')
<script src="{{ asset('assets/js/vartical-layout.min.js')}}"></script>
@else
<script src="{{ asset('assets/js/menu/menu-rtl.js')}}"></script>
@endif

<script>
$('#summernote').summernote({
    placeholder: 'Please Enter Description',
    tabsize: 2,
    height: 120
    });
</script>

<script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBHicDkk1q58KPlb8HlkRqu4k1m2IriOQc",
      authDomain: "wayyak-9d303.firebaseapp.com",
      projectId: "wayyak-9d303",
      storageBucket: "wayyak-9d303.appspot.com",
      messagingSenderId: "857505224587",
      appId: "1:857505224587:web:0bf9b1fd2968f9e0a5418e",
      measurementId: "G-RK67F8C5EP"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  </script>

    @toastr_js
    @toastr_render
@yield('admin')
