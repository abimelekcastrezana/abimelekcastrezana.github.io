
---
title: "Como Claude y yo resolvimos un bug de 3 meses en día y medio en mi trabajo"
date: 2026-09-16
tags: ["trabajo", "desarrollo", "agentes ia"]
description: "Te platico como tomamos un tema real en mi trabajo y lo solucionamos con agentes de IA."
draft: false
---

## Introducción
El día de antier y ayer, estabamos trabajando y ocurrió algo muy interesante.
Sucede que teníamos el problema que en un proyecto del trabajo, llamemosle "archivos" por decir algo, 
numero uno, siempre nos duplicaba unos registros; numero 2, se desconectaba y daba error 500; numero 3, este en si no lo conocía, pero Claudia lo encontró, 
resulta que el registro de una fecha en la db estaba insertando silenciosamente "00-00-00" y eso es malo para el flujo del servicio; numero cuatro, un webhook, que es 
un programa que son unos ojitos que espera eventos donde le pongas a observar, en nuestro caso de tres archivos, el tercero no lo veía y por ende no mandaba a procesarlo
en el backend, lo cual hacía que quedara la información incompleta.

## Desarrollo
Estos temas los solucionamos con ayuda de un agente, lo interesante fue el como puse al "agente in the loop".

Así es como funciona el sistema (Backend):

```
   SMB                    servicio                   SFTP
┌────────┐   ┌─────────────────────────────┐   ┌────────────────┐
│ Cargar │──▶│   validar   │   procesar     │──▶│ enviar │ recibir│
└────────┘   └─────────────────────────────┘   └────────────────┘
                              ▲                          │
                              │                          ▼
                              │                    ┌────────────┐
                              └────────────────────│  Webhook   │
                                                    └────────────┘
                (el Webhook observa "recibir" y avisa al servicio para procesar)
```

En este sistema tan simple llevabamos meses con esta falla. Así que se me ocurrió invitar a Claudia a la fiesta de desarrollo y pedirle apoyo.

Aquí la conecté con el servidor de desarrollo y a su vez con SMB y el SFTP mediante un bastión, ya que el server de desarrollo solo es el que tiene acceso a estos
servidores de almacenamiento de archivos, todo desde mi entorno local, para no tener que instalar un agente IA en el server.

Le pedí que reproduciera el error para que tuviera más contexto y por si veía cosas que nosotros no, lo cual hizo y encontro el bug silencioso del registro de fechas.
A su vez nos comentó que el error de que no se procesará el tercer archivo, era tema externo al repositorio de trabajo, se relacionaba con el webhook, que es los ojitos
que le avisan al backend que llego algo en la carpeta de recibir y le dicen al servicio que procese.

Nuestra reparación fue sumamente interesante, limpia y quirúrjica, para no ser invasivos con el código ya construido. Siempre manteniendo "human in the loop".

Hacer esto permitió arreglar estos bugs de meses a día y medio, en mi equipo estamos muy contentos del desempeño.

## Conclusión
Hay que apoyarnos de estas nuevas herramientas, sin nuestro conocimiento en arquitectura y código, solo sería un chat que arregla una cosa y rompe otra, pero integrarla
como parte del equipo nos convirtió a todos en agentes de cambio.