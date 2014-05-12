/*
Esta pagina se encarga de registrar un usuario en la base de datos
*/
var onDeviceReady=function()
{

};
		document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);
var verificarCorreo=false;
var continuarProceso=false;
$(document).ready(
    function()
    {
        $("#aceptar").click(
            function(e)
            {
                e.preventDefault();
                bPopUpClosed();
                if(verificarCorreo)
                    $("#txtEmail").focus();    
                if(continuarProceso)
                    redirigir("login.html");
                
            }
        );
        $("#btnRegistrar").click(
            function(e)
            {
                e.preventDefault();
                //Obtengo los datos
                var nombres,apellidos,nick,email,pass;
                nombres=$("#txtNombres").val();
                //apellidos=$("#txtApellidos").val();
                apellidos="";
                nick=$("#txtNick").val();
                email=$("#txtEmail").val();
                //pass=$("#txtPass").val();
                pass=$("#txtClave").val();
                console.log("pass:"+pass);
                
                   if(nombres  && nick && email && pass)
                    {
                        if(validarEmail(email))
                        {
                            registrar(nombres,apellidos,nick,email,pass);
                        }else{
                            verificarCorreo=true;
                            bPopUpOpen("<p>Verifica el correo que digitaste</p>","aceptar");
                        }
                    }else{
                        bPopUpOpen("<p>Ningun campo puede estar vacio</p>","aceptar");
                    } 
                
                
                
            });
        $("#btnLogin").click(
            function(e)
            {
                e.preventDefault();
                redirigir("login.html");
            }
        );
    });

function registrar(nombres,apellidos,nick,email,pass)
{
    //bPopUpOpen("<p>Registrandote</p><br/><div align='center'><img src='images/loading.gif' width='50px' height='50px' /></div>","");
    bPopUpOpenCargando("");
    var url=url_base+"users/add.xml";
    var datos={
        nombres:nombres,
        apellidos:apellidos,
        nick:nick,
        email:email,
        password:pass,
        idioma:idioma
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    var id=$("datos",xml).text();
                    console.log("id: "+parseInt(id));
                    if(parseInt(id)>0)
                    {
                        continuarProceso=true;
                        bPopUpOpen("<p> Hemos enviado una confirmacion de registro a tu correo electrónico.<br> Por favor sigue las instrucciones para finalizar el proceso</p>","aceptar");
                        
                        //crearVariableSesion("idUsuario",id);
                        //redirigir("7.html");
                        
                    }else if(parseInt(id)==-1)
                    {
                    }else if(parseInt(id)==-2)
                    {
                        bPopUpOpen("<p>Ya existe un usuario registrado con ese email, intenta de nuevo","aceptar");
                    }
                    
                }else
                {
                    bPopUpOpen("<p>No es posible conectarse al servidor por problemas de comunicacion</p>","aceptar");
                }
                 
             });
}