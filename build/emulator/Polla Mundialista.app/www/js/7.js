/* Se encarga de obtener informacion del usuario en la polla, como el puntaje, la posicion*/
var idBet;
var bien=false
var onDeviceReady=function()
{
    /*console.log("Di clic en premium");
                e.preventDefault();
                oneTouchPurchase();*/
};
        document.addEventListener("deviceready",onDeviceReady,false);
$(document).ready(
    function()
    {
        $("#aceptar").click(
            function(e)
            {
                bPopUpClosed();
            }
            );

        $("#btnPremiun").click(
            function(e)
            {
                console.log("Di clic en premium");
                e.preventDefault();
                oneTouchPurchase();
            }
        );
        $("#aceptar").click(
            function(e)
            {
                bPopUpClosed();
                if(bien)
                    redirigir("2.html");
            }
        );
    }
);


function oneTouchPurchase() { 
//  Do the actual purchase
// Parameter 1 – ID of Product being purchased
// Parameter 2 – quantity of product being purchased
// Parameter 3 – Function to call upon successful purchase
//  Parameter 4 – Function to call upon failed purchase
OneTouch.buy("Premun",1,paymentSuccess,paymentFail); 
}
function paymentFail (evt){
//Add code here for what to do if the payment is unsuccessful.
//On failure an object is returned containing success (will be false), 
//product, and message properties
AppMobi.notification.alert('Purchase of ' + evt.product + ' failed. Please try later. ','Purchase Not Successful','OK');
}
function paymentSuccess(product){
//Add code here for what to do if the payment is successful!
//On success a single parameter (product ID) is returned.
AppMobi.notification.alert('Congratulations on your purchase of ' +product,'Purchase Was Successful','Awesome!');
var url=url_base+"user/premium";
data={
    idUsuario=getIdUsuario()
};
ajax(url,data,function(xml)
{
    var dato=$("dato",xml).text();
    if(dato==1)
    {
        bien=true;
        bPopUpOpen("Actualizacion realizara con exito","aceptar");
    }else{
        bPopUpOpen("Ocurrio un erro","aceptar");
    }
});
}