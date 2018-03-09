$(document).ready(function() {
    $('#coach-list').DataTable({
        "order": [ 2, "asc" ],
        "pageLength": "100",
    });
});

function saveOrder(pageid, order) {
    var url = '/admin/setsort';

    $.ajax({
        type: 'GET',
        url: url + '/' + pageid + '/' + order,
        data: '',
        async: true,
        success: function ( data ) {
            var response = $.parseJSON(data);
            console.log(response);
            if(typeof response.error != 'undefined') {
                alert(response.error);
            } else {
                console.log(response.Message);
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

$(".moveup").click(function(){
    /* take a snapshot of what's where */
    var this_page_id = $(this).closest('tr').children('td:first').text();
    var this_order = $(this).closest('tr').children('td:nth-child(3)').text();
    var prev_page_id = $(this).closest('tr').prev().children('td:first').text();
    var prev_order = $(this).closest('tr').prev().children('td:nth-child(3)').text();
    
    /* set the display values - the database values will actually be set later */
    $(this).closest('tr').children('td:nth-child(3)').text(prev_order);
    $(this).closest('tr').prev().children('td:nth-child(3)').text(this_order);

    /* actually move the row now */
    $(this).parents('tr').prev().before($(this).parents("tr"));

    /* now save the page movement to the database */
    saveOrder(this_page_id, prev_order);
    saveOrder(prev_page_id, this_order);
    
});

$(".movedown").click(function(){

    var this_page_id = $(this).closest('tr').children('td:first').text();
    var this_order = $(this).closest('tr').children('td:nth-child(3)').text();
    var next_page_id = $(this).closest('tr').next().children('td:first').text();
    var next_order = $(this).closest('tr').next().children('td:nth-child(3)').text();

    $(this).closest('tr').children('td:nth-child(3)').text(next_order);
    $(this).closest('tr').prev().children('td:nth-child(3)').text(this_order);

    $(this).parents("tr").next().after($(this).parents("tr"));

    /* now save the page movement to the database */
    saveOrder(this_page_id, next_order);
    saveOrder(next_page_id, this_order);
});