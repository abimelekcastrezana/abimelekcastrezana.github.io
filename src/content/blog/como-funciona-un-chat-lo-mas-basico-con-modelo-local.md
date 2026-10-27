---
title: "Cómo funciona un chat: lo más básico con un modelo local"
date: 2026-10-27
tags: ["agentes ia", "python", "ollama"]
description: "Mi primer paso para aprender a hacer agentes: llamar a un modelo local con Python y la librería de ollama, y entender hasta dónde llega una sola llamada."
draft: false
---

## Introducción

Quiero aprender a hacer agentes de IA, y la forma más honesta de empezar es por lo más básico: hablarle a un modelo desde código. Hoy, con ayuda de Claude y la librería de `ollama`, armé un bot de chat en consola. Estuvo sencillo, y justamente por eso vale la pena entender qué hace cada línea.

Estas son mis notas de ese día:

![Primera página de mis notas: entorno virtual, endpoint del modelo y el código](/blog/como-funciona-un-chat-lo-mas-basico/como_funciona_un_chat_ia_pag1.jpeg)

![Segunda página de mis notas: la línea del print y la conclusión](/blog/como-funciona-un-chat-lo-mas-basico/como_funciona_un_chat_ia_pag2.jpeg)

## Preparar el entorno

Primero hay que crear un entorno virtual dentro de la carpeta del proyecto y activarlo:

```bash
python3 -m venv venv
source venv/bin/activate
```

El `venv` es solo el lugar donde viven las librerías instaladas. Los archivos de Python van en la raíz del proyecto, al lado del `venv`, no dentro de él. Con el entorno activo instalo lo necesario:

```bash
pip install ollama python-dotenv
```

La estructura queda así:

```text
basic-agent/
├── venv/
├── .env
├── config.py
└── basic_agent.py
```

## La configuración

Mi modelo corre en un servidor propio con Ollama, así que necesito dos datos: la dirección del endpoint y el nombre del modelo. Esos datos van en un archivo `.env` en la raíz del proyecto, que nunca se sube a git:

```text
OLLAMA_HOST=http://mi-servidor:11434
OLLAMA_MODEL=qwen3.5:9b
```

Los valores de arriba son un ejemplo; cada quien pone su endpoint y su modelo. Luego, `config.py` los lee y los deja listos para importar desde cualquier otro archivo:

```python
import os
from dotenv import load_dotenv

load_dotenv()

ollama_host = os.getenv("OLLAMA_HOST")
ollama_model = os.getenv("OLLAMA_MODEL")
```

En Python no existe un `export`: todo lo que se define a nivel de módulo ya se puede importar desde otro archivo. Y hay que cuidar las mayúsculas, porque `ollama_host` y `OLLAMA_HOST` son nombres distintos. El nombre entre comillas es el de la variable en el `.env`; el nombre sin comillas es el de la variable de Python, y ese lo elijo yo.

## El código del bot

```python
import ollama
from config import ollama_host, ollama_model

client = ollama.Client(host=ollama_host)
response = client.chat(
    model=ollama_model,
    messages=[{"role": "user", "content": "Descríbeme un día bonito"}],
)

print(response["message"]["content"])
```

Paso a paso:

1. Importo `ollama`, que es la librería que voy a usar, y luego mi configuración.
2. `client` instancia el cliente con `ollama.Client`; recibe la URL de mi API.
3. `response` es la llamada a `client.chat`. Ahí `model` es mi modelo y `messages` es una lista con el rol (`user`) y el contenido de lo que le estoy enviando.
4. Imprimo la respuesta. Corro el archivo con `python basic_agent.py` y ya le hablé al modelo por consola.

## Dos errores que me encontré

**Mayúsculas.** Al probar la configuración con `config.OLLAMA_HOST` me salió `AttributeError`, porque en `config.py` las variables estaban en minúsculas. Python distingue ambas, así que hay que usar el nombre exacto con el que se definió.

**La coma en lugar de dos corchetes.** Escribí `response["message", "content"]` y me dio `KeyError: ('message', 'content')`. Con la coma Python arma una tupla y la usa como una sola llave, que no existe. Para entrar a un diccionario dentro de otro se encadenan los corchetes: `response["message"]["content"]`. La librería también permite `response.message.content`.

## Hasta dónde llega esto

Este tipo de interacción hasta ahí llega: no guarda nada. Es una contestación efímera y ya. Cada llamada empieza de cero y el modelo no recuerda lo que se dijo antes. Esto solo es la práctica para observar hasta dónde llega el simple hecho de llamarle.

Para que se comporte como un agente hay que integrar **memoria** y **tool calling**. La memoria es guardar el historial de mensajes y reenviarlo en cada llamada; el tool calling es darle al modelo funciones que pueda pedir que se ejecuten. Por ahora todo bien hasta aquí, y ese es el siguiente paso.
