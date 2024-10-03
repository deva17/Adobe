# deva

<!DOCTYPE html>
<html lang="en">

<head>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .pop {
            max-width: 60%;
        }

        .column {
            float: left;
            width: 33.33%;
            padding: 5px;
        }

        /* Clearfix (clear floats) */
        .row::after {
            content: "";
            clear: both;
            display: table;
        }

     .container
     {
         margin-top: 10%;
     }
    </style>
</head>


<body>

    <section class="popup">

<div class="container">
        <div class="row">
            <div class="column">
                <a><img src="img/img1.jpg" class="pop" alt="Sample Image 1"></a>
            </div>   
                <div class="column">
                    <a><img src="img/img2.jpg" class="pop" alt="jQuery Image Popup - CodeHim"></a>
                </div>
                    <div class="column">
                        <a><img src="img/img3.jpg" class="pop" alt="Sample Image 3"></a>
                    </div>
                        <div class="column">
                            <a><img src="img/img4.jpg" class="pop" alt="Sample Image 4"></a>
                        </div>
                            <div class="column">
                                <a><img src="img/img5.jpg" class="pop" alt="Sample Image 5"></a>
                            </div>
                            <div class="column">
                                <a><img src="img/img2.jpg" class="pop" alt="Sample Image 5"></a>
                            </div>
                        </div>
                    </div>
    </section>


    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <img src="" width="700">
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        $(document).ready(function () {
            $('.popup img').on('click', function () {
                $('#staticBackdrop').modal('show');
                $('#staticBackdrop .modal-body img').attr("src", $(event.target).attr("src"));

            });
        });
    </script>

</body>

</html>
