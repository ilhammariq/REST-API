// load page
$(document).ready(function () {
    alldata()

    $('#search-button').on('click', function () {
        search()
    })

    $('#search-input').on('keyup', function (e) {
        if (e.which == 13) {
            search()
        }
    })
})

var url = 'https://api.github.com/users'

//getalldata
function alldata() {
    $.ajax({
        dataType: 'json',
        type: 'get',
        url: url,
        success: function (result) {
            $.each(result, function (i, data) {
                $('#user-list').append(`
                    <div class="col-sm-3">
                    <div class="card mb-3">
                        <img src="`+ data.avatar_url + `" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-mb-2 text-dark text-center mb-3">`+ data.login + `</h5>
                        <center><a href="`+ data.html_url + `" class="card-link">See Detail</a><center>
                        </div>
                    </div>
                    </div>
                `)
            })
        }
    })

}

//search-button
function search() {
    if ($('#search-input').val() == '') {
        alldata()
        $('#result').html('')
        $('#user-list').html('')

    } else {
        $('#user-list').html('')
        $('#result').html('')
        var username = $('#search-input').val()
        $.ajax({
            dataType: 'json',
            url: url + '/' + username,
            success: function (data) {
                $('#result').append(`
                <div>Search result : <strong>`+ username + `</strong> </div>
                    `)
                $('#user-list').append(`
                <div class="col-sm-3">
                <div class="card mb-3">
                    <img src="`+ data.avatar_url + `" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-mb-2 text-dark text-center">`+ data.name + `</h5>
                    <p class="card-subtitle text-muted text-center mb-3">Followers `+ data.followers + `</p>
                    <center><a href="`+ data.html_url + `" class="card-link">See Detail</a><center>
                    </div>
                </div>
                </div>
                    `)
                $('#search-input').val('')
            },
            statusCode: {
                404: function () {
                    $('#result').append(`
                <div>Search result : <strong>`+ username + `</strong> </div>`)
                    $('#user-list').append(`
                        <div> <strong>Username Not Found</strong></div> `)
                    $('#search-input').val('')
                }
            }
        })
    }
}


