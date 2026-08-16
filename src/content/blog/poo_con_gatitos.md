
---
title: "Programación orientada a objetos con gatitos"
date: 2026-08-16
tags: ["clase", "python"]
description: "Te enseño la programación orientada a objetos con gatitos y haciendo que interactuen entre ellos."
draft: false
---

## Introducción
Alguna vez habrás escuchado de la programación orientada a objetos y que es muy utilizada en el mundo de la programación. En este artículo te enseño a utilizarla, para que comiences a hacer un poquito de practica, si no tienes experiencia con otra cosa, pues no hace falta, lo que si es necesario es que tengas un poquito de noción de programación, donde escribir código y tu python instalado.

Te recomeindo VSCODE que es lo que utilizo y tiene la particularidad de que puede correr el código con un botoncito, personalmente he estado probando lo "JUPYTER Notebooks" y me han gustado bastante, porque es muy sencillo hacer explicaciones, pero de verdad que con puro ".py" es posible.

## ¿Qué es la programación orientada a objetos?
Es literalmente pensar y escribir en el código acorde a crear un objeto que tenga determinados atributos.

Ejemplo:
Si creamos un objeto llamado "Gato", entonces vamos a tener sus características, que minimamente, son nombre y color. 

Este mismo gatito podría tener más atributos como dueño, donde vive, que puede y que no hacer, etc...

## Clases
Una clase en python nos sirve para crear objetos y puede crearse de la siguiente manera:

```python
class Gato:
    pass
```
Este es el tipo de clase más sencillo, simplemente existe, pero no hace nada en si, más que estar ahí.

Para poder llamar a esta clase, sería de la siguiente manera:

```python
mi_gatito_miau_miau=Gato()
```
## Atributos
Existen tipos de atributos, de clase y de instancia.

Instancia: Particulares de cada gatito, cada vez que se instancian, es lo que cambia y varia entre los objetos creados con esta clase.

Clase: Aquello para todas las clases permanece constante. 

Aquí creamos los atributos para el gatito con atributos de instancia:

``` python
class Gato:
    ## __init__ es para crear al objeto
    def __init__(self, nombre, color):
        print(f"Creando gatito {nombre}, {color}")
    ## Atributos de Instancia
        self.nombre = nombre
        self.color = color

cochinilla = Gato("Cochinilla", "blanco, negro y naranja")
```

En consola se vería así: 
```
Creando gatito Cochinilla, blanco, negro y naranja
```

A continuación vamos a agregar atributos de clase, recuerda que es lo que se conserva para todas las clases.
``` python
class Gato:
    ## Atributo de clase
    especie = "mamífero"
    ## __init__ es para crear al objeto
    def __init__(self, nombre, color):
        print(f"Creando gatito {nombre}, {color}")
    ## Atributos de instancia
        self.nombre = nombre
        self.color = color

print(f"los gatitos son de la especie {cochinilla.especie}")

```
Así se vería en consola:
```
los gatitos son de la especie mamifero
```

## Métodos

Los métodos son lo que puede hacer o no tu clase.

Por ejemplo, si queremos que el gatito maulle o que rasguñe o algo por el estilo, bueno aquí se programa.
``` python
class Gato:

    ## Atributos de clase
    especie = "mamífero"

    ## __init__ es para crear al objeto
    def __init__(self, nombre, color):
        print(f"Creando gatito {nombre}, {color}")
    
        self.nombre = nombre
        self.color = color
    ## Métodos del gatito
    def maulla(self):
        print("Miau, miau")

    def camina(self, pasos):
        print(f"Camina {pasos} pasos")

    def araño(self, nombre_aranador, nombre_aranado):
        print(f"{nombre_aranador} araño a {nombre_aranado}")

cochinilla.camina(10)
cochinilla.araño(cochinilla.nombre, pantera.nombre)
```
```
Camina 10 pasos
Cochinilla araño a Panterita
```

## Hacer a tus gatitos

Para hacer a tus gatitos, antes que cualquier cosa, debes de instanciarlos. Lo correcto, para que funcione todo lo que te mostré arriba, es crear a los gatitos, como se muestra a continuación:

``` python
class Gato:

    ## Atributos de clase
    especie = "mamífero"

    ## __init__ es para crear al objeto
    def __init__(self, nombre, color):
        print(f"Creando gatito {nombre}, {color}")
    
        self.nombre = nombre
        self.color = color
    ## Métodos del gatito
    def maulla(self):
        print("Miau, miau")

    def camina(self, pasos):
        print(f"Camina {pasos} pasos")

    def araño(self, nombre_aranador, nombre_aranado):
        print(f"{nombre_aranador} araño a {nombre_aranado}")

## aquí se crean a los gatitos
cochinilla=Gato("Cochinilla", "blanco, negro y naranja")
pantera=Gato("Panterita", "negro")

## Aquí interactuan los gatitos
cochinilla.camina(10)
cochinilla.araño(cochinilla.nombre, pantera.nombre)
```

## Conclusión
Hasta aquí la creación e interacción con gatitos de código, si te fijas es muy interesante, poco a poco puede ir creciendo la interacción o lo que le vayas agregando al código para poder hacer muchas cosas increíbles, creo que así es como funciona pokemon, pero lo ire descubriendo, saludos y comparte el blog.

## Ver en Youtube la explicación
https://youtu.be/JkQeCt4T7-M

## Referencias
- El Libro De Python. (2026). *Programación Orientada a Objetos*. [https://ellibrodepython.com/programacion-orientada-a-objetos-python](https://ellibrodepython.com/programacion-orientada-a-objetos-python)