graficas de quesabes.org
===========

Escanea instancias de alaveteli y genera graficas de performancia de pedidos de informacion para los últimos 12 meses.

Basado en proyecto wombleton/foie-graphs para levantar datos de fyi.org.nz.

Como correrlo
=====

1. Clonar el repsitorio
1. Correrlo localmente (branch master). quesabes.org usa las siguientes opciones: `USER=gabelula REPO=quesabes-graphs TOKEN=secret_oauth_token ALAVETELI=https://quesabes.org npm start`
1. Actualizara archivos en el branch gh-pages del repositorio REPO.
1. Para actualizarlo automaticamente, tenemos un scheduler corriendo en uno de nuestros servidores.
