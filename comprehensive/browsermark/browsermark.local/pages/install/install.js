$(document).ready(function()
{
    // Calculate content minimum height
    $('#content').css('min-height', $(document).height() - 270 + 'px');

    // Disable database fields if database is set to no
    $("input[name='use_db']").change(function()
    {
        if ($(this).val() == 0)
        {
            $("input[name='db_host'], input[name='db_port'], input[name='db_name'], input[name='db_user'], input[name='db_pass'], input#db_con_test").attr("disabled", "disabled");
        }
        else
        {
            $("input[name='db_host'], input[name='db_port'], input[name='db_name'], input[name='db_user'], input[name='db_pass'], input#db_con_test").removeAttr('disabled');
        }
    });

    $('#db_con_test').click(function()
    {
        var host = $("input[name='db_host']").val();
        var port = $("input[name='db_port']").val();
        var name = $("input[name='db_name']").val();
        var user = $("input[name='db_user']").val();
        var pass = $("input[name='db_pass']").val();

        $.ajax({
          type: "POST",
          url: "/install/db_con",
          data: { db_host: host, db_port: port, db_name: name, db_user: user, db_pass: pass }
        }).done(function( msg ) {
          if (msg == '1')
          {
              $('span#db_con_result').removeClass('inverse-color');
              $('span#db_con_result').addClass('shock-color');
              $('span#db_con_result').html('Connection established');
          }
          else
          {
              $('span#db_con_result').removeClass('shock-color');
              $('span#db_con_result').addClass('inverse-color');
              $('span#db_con_result').html('Connection failed');
          }
        });

    });

});