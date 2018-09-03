$(function() {
    $('.inputs').on('keyup', function() {
            $('.nav').show();
            console.log($(this).val())
        })
        // $.ajax({
        //     url: 'api/ss',
        // })
})