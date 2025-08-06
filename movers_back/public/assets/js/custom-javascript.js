
$('#table1').DataTable();
$('#table2').DataTable();
$('#table3').DataTable();
$('#table4').DataTable();
$('#table5').DataTable();
$('#table6').DataTable();



$('a[data-toggle="tab"]').on('click', function (e) {
    //var activated_tab = e.target // activated tab
    var hrefTab=$(this).attr('href');
    //var previous_tab = e.relatedTarget // previous tab
    if(hrefTab === '#transaction') {
        $('#transaction').css('display', 'block');
        $('#notification').css('display', 'none');
        //$('#wallet_amount').css('display', 'none');
        $('#complaints').css('display', 'none');
        $('#number_rides').css('display', 'none');
        $('#verfication').css('display', 'none');
        $('#adminpay').css('display', 'none');
    
    }
    if(hrefTab === '#notification') {
        $('#transaction').css('display', 'none');
        $('#notification').css('display', 'block');
        //$('#wallet_amount').css('display', 'none');
        $('#complaints').css('display', 'none');
        $('#number_rides').css('display', 'none');
        $('#verfication').css('display', 'none');
        $('#adminpay').css('display', 'none');
    
    }
    if(hrefTab === '#adminpay') {
        $('#transaction').css('display', 'none');
        $('#notification').css('display', 'none');
        $('#adminpay').css('display', 'block');
        $('#complaints').css('display', 'none');
        $('#number_rides').css('display', 'none');
        $('#verfication').css('display', 'none');
    
    }

    // if(hrefTab === '#wallet_amount') {
    //     $('#transaction').css('display', 'none');
    //     $('#notification').css('display', 'none');
    //     $('#wallet_amount').css('display', 'block');
    //     $('#complaints').css('display', 'none');
    //     $('#number_rides').css('display', 'none');
    //     $('#verfication').css('display', 'none');
    
    // }

    if(hrefTab === '#wallet_amount') {
        $('#transaction').css('display', 'none');
        $('#notification').css('display', 'none');
       // $('#wallet_amount').css('display', 'block');
        $('#complaints').css('display', 'none');
        $('#number_rides').css('display', 'none');
        $('#verfication').css('display', 'none');
        $('#adminpay').css('display', 'none');
    
    }
    if(hrefTab === '#complaints') {
        $('#transaction').css('display', 'none');
        $('#notification').css('display', 'none');
        //$('#wallet_amount').css('display', 'none');
        $('#complaints').css('display', 'block');
        $('#number_rides').css('display', 'none');
        $('#verfication').css('display', 'none');
        $('#adminpay').css('display', 'none');
    }

    if(hrefTab === '#number_rides') {
        $('#transaction').css('display', 'none');
        $('#notification').css('display', 'none');
        //$('#wallet_amount').css('display', 'none');
        $('#complaints').css('display', 'none');
        $('#number_rides').css('display', 'block');
        $('#verfication').css('display', 'none');
        $('#adminpay').css('display', 'none');
    }

    if(hrefTab === '#verfication') {
        $('#transaction').css('display', 'none');
        $('#notification').css('display', 'none');
        //$('#wallet_amount').css('display', 'none');
        $('#complaints').css('display', 'none');
        $('#number_rides').css('display', 'none');
        $('#verfication').css('display', 'block');
        $('#adminpay').css('display', 'none');
    }
});



    
$(function(){
    $('[type="date"]').prop('max', function(){
        return new Date().toJSON().split('T')[0];
    });
});


