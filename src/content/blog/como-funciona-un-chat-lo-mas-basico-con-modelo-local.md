---
title: "Cómo funciona un chat: lo más básico con un modelo local"
date: 2026-10-27
tags: ["agentes ia", "python", "desarrollo"]
description: "Mi primer paso para aprender a hacer agentes: llamar a un modelo local con Python y la librería de ollama, y observar hasta dónde llega el solo llamarle."
draft: false
---

## Agente básico

Acabo de hacer, con ayuda de Claude y la librería de ollama, un bot de chat en consola. Estuvo sencillo, usamos la librería de ollama.

Mi endpoint para hablarle al modelo y el nombre del modelo van en un archivo `.env`. Aquí pongo valores de ejemplo, como en un `.env.example`; cada quien pone los suyos:

```text
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

Hay que recordar que primero hay que hacer el entorno. Dentro de la carpeta del proyecto se ejecuta:

```bash
python3 -m venv venv
```

y para entrar:

```bash
source venv/bin/activate
```

Con el entorno activo instalo las librerías:

```bash
pip install ollama python-dotenv
```

Los archivos de Python van en la raíz del proyecto, al lado del `venv`, no dentro de él. El `venv` es solo donde viven las librerías.

## La configuración

En `config.py` leo las variables del `.env` para poder importarlas desde otro archivo:

```python
import os
from dotenv import load_dotenv

load_dotenv()

ollama_host = os.getenv("OLLAMA_HOST")
ollama_model = os.getenv("OLLAMA_MODEL")
```

## El código

Primero importamos `ollama`, que es la librería que se va a utilizar, luego importamos la configuración.

`client` es para instanciar el cliente tal cual con `ollama.Client`, recibe la URL de tu API.

`response` es para instanciar `client.chat`, donde `model` es tu modelo y `messages` es el rol y lo que le estamos enviando en el contenido. Esto lo imprimimos, para después hablarle por consola y ya está.

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

Se corre con `python basic_agent.py` desde la raíz del proyecto.

## Dos errores en el camino

**Mayúsculas.** Probé la configuración con `config.OLLAMA_HOST` y me salió `AttributeError`, porque en `config.py` las variables estaban en minúsculas. Python distingue entre ambas, así que hay que usar el nombre exacto con el que se definió.

**La coma en lugar de dos corchetes.** Escribí `response["message", "content"]` y me dio `KeyError: ('message', 'content')`. Con la coma Python arma una tupla y la usa como una sola llave, que no existe. Para entrar a un diccionario dentro de otro se encadenan los corchetes: `response["message"]["content"]`.

## Hasta dónde llega

Este tipo de interacciones, hasta ahí llega la interacción: no guarda nada, solo una efímera contestación y ya. Esto solo es la práctica para poder observar hasta dónde llega el solo llamarle.

Para que se comporte como un agente hay que integrar memoria y tool calling. Por ahora todo bien hasta aquí.
