---
title: "El dilema del prisionero con sentencias condicionantes e iterativas"
date: 2026-07-25
tags: ["Artículo"]
description: "Cómo usé condicionantes e iterativas en Python para simular un torneo del dilema del prisionero y analizar su matriz de pagos."
draft: false
---

## Introducción

En este reporte abordo las sentencias iterativas y condicionantes a través de un ejercicio de teoría de juegos, específicamente el dilema del prisionero y el análisis de la matriz de este mismo tema.

Elegí este tema por un interés previo: ya lo había tocado como investigación, pero nunca lo había llevado a la práctica para intentar comprenderlo mejor. La razón de elegirlo fue que se puede abordar con condicionantes para las partes que conforman el juego, y si el dilema crece o se usa la variante de pagos a lo largo del juego —donde los juegos anteriores influyen en los posteriores— se vuelve más interesante y ahí pueden usarse sentencias condicionantes. Como plus, usé sentencias iterativas para la presentación en consola de la ejecución de los scripts.

## Desarrollo

Las sentencias condicionantes permiten que un programa tome decisiones, es decir, que ejecute un bloque de código u otro dependiendo de si se cumple o no una condición. En Python esto se logra con `if`, `elif` y `else`, donde `if` evalúa la condición principal, `elif` permite encadenar condiciones adicionales y `else` cubre cualquier otro caso no contemplado. Por su parte, las sentencias iterativas, como el ciclo `for`, permiten repetir un bloque de instrucciones un número determinado de veces o recorrer los elementos de una estructura de datos, algo indispensable cuando se necesita simular rondas de un juego o recorrer una matriz de pagos.

Para sustentar la parte teórica consulté bibliografía especializada en teoría de juegos, retomando la representación en forma normal del dilema del prisionero y la fundamentación del equilibrio de Nash. El dilema plantea que dos sospechosos son detenidos por separado: si ninguno confiesa, ambos reciben 1 mes de cárcel; si ambos confiesan, reciben 6 meses cada uno; y si solo uno confiesa, este queda libre mientras el otro recibe 9 meses. A partir de esta matriz de pagos también revisé la eliminación iterativa de estrategias estrictamente dominadas, y la idea de los juegos repetidos, donde el resultado de una ronda depende de lo ocurrido en las rondas anteriores.

```text
                    J2 Callarse   J2 Confesar
----------------------------------------------
J1 Callarse            1, 1          9, 0
J1 Confesar             0, 9          6, 6

(meses de prisión — menos es mejor)
```

Con esa base construí dos scripts en Python.

**Script 1: torneo del dilema del prisionero.** Simula un torneo entre cinco estrategias: Siempre Cooperar, Siempre Traicionar, Tit-for-Tat, Grudger y Aleatorio. Cada par se enfrenta durante 10 rondas y, mediante sentencias condicionantes, cada estrategia decide su jugada según el historial del oponente; al final, un ciclo iterativo recorre todos los enfrentamientos posibles y acumula los puntos para desplegar un ranking.

```python
## Script 1
## Ejemplo del juego del prisionero con pagos

import random

## Diccionario de Pagos:
PAGOS = {
    ("C", "C"): (3, 3),
    ("C", "T"): (0, 5),
    ("T", "C"): (5, 0),
    ("T", "T"): (1, 1),
}

## Estrategias

def siempre_cooperar(historial_jugador2):
    return "C"

def siempre_traicionar(historial_jugador2):
    return "T"

def tit_for_tat(historial_jugador2):
    if len(historial_jugador2) == 0:
        return "C"
    else:
        return historial_jugador2[-1]

def grudger(historial_jugador2):
    if "T" in historial_jugador2:
        return "T"
    else:
        return "C"

def aleatorio(historial_jugador2):
    return random.choice(["C", "T"])

estrategias = [
    (siempre_cooperar,   "Siempre Cooperar"),
    (siempre_traicionar, "Siempre Traicionar"),
    (tit_for_tat,        "Tit-for-Tat"),
    (grudger,            "Grudger"),
    (aleatorio,          "Aleatorio"),
]

## Simulación de rondas
def simular_juego(estrategia_jugador1, estrategia_jugador2, total_rondas):
    historial_jugador1 = []
    historial_jugador2 = []
    puntos_jugador1 = 0
    puntos_jugador2 = 0

    for numero_ronda in range (1, total_rondas + 1):

        jugada_jugador1 = estrategia_jugador1(historial_jugador2)
        jugada_jugador2 = estrategia_jugador2(historial_jugador1)

        pago_jugador1, pago_jugador2 = PAGOS[(jugada_jugador1, jugada_jugador2)]

        puntos_jugador1 += pago_jugador1
        puntos_jugador2 += pago_jugador2

        historial_jugador1.append(jugada_jugador1)
        historial_jugador2.append(jugada_jugador2)

        print(f" Ronda {numero_ronda}: J1={jugada_jugador1} J2={jugada_jugador2} | Puntos: {pago_jugador1} - {pago_jugador2}")
    return puntos_jugador1, puntos_jugador2

## Torneo automático

def ejecutar_torneo(total_rondas):

    print("=" * 50)
    print(" TORNEO DEL DILEMA DEL PRISIONERO")
    print(f" {total_rondas} rondas por enfrentamiento")
    print("=" * 50)

    puntos_totales= {}

    for funcion, nombre in estrategias:
        puntos_totales[nombre] = 0

    for i in range(len(estrategias)):
        for j in range(len(estrategias)):

            if i == j:
                continue

            funcion1, nombre1 = estrategias[i]
            funcion2, nombre2 = estrategias[j]

            print(f"\n  {nombre1} vs {nombre2}")
            p1, p2 = simular_juego(funcion1, funcion2, total_rondas)
            print(f"  Total: {nombre1}={p1} | {nombre2}={p2}")

            puntos_totales[nombre1] += p1
            puntos_totales[nombre2] += p2

    return puntos_totales


## Ranking final
def mostrar_ranking(resultados):

    print("\n" + "=" * 50)
    print("  RANKING FINAL")
    print("=" * 50)

    ranking = sorted(resultados.items(), key=lambda x: x[1], reverse=True)

    for posicion, (nombre, puntos) in enumerate(ranking, start=1):

        if posicion == 1:
            etiqueta = " GANADOR"
        elif posicion == len(ranking):
            etiqueta = " último lugar"
        else:
            etiqueta = ""

        print(f"  {posicion}. {nombre}: {puntos} puntos{etiqueta}")


## Arrancar el programa
resultados = ejecutar_torneo(10)
mostrar_ranking(resultados)
```

Así se ve en consola el resultado (un enfrentamiento de muestra y el ranking final del torneo completo):

```text
==================================================
 TORNEO DEL DILEMA DEL PRISIONERO
 10 rondas por enfrentamiento
==================================================

  Siempre Cooperar vs Siempre Traicionar
 Ronda 1: J1=C J2=T | Puntos: 0 - 5
 ...
 Ronda 10: J1=C J2=T | Puntos: 0 - 5
  Total: Siempre Cooperar=0 | Siempre Traicionar=50

  (... se repite el mismo formato para los 20 enfrentamientos del torneo ...)

==================================================
  RANKING FINAL
==================================================
  1. Siempre Traicionar: 216 puntos GANADOR
  2. Grudger: 192 puntos
  3. Tit-for-Tat: 182 puntos
  4. Aleatorio: 157 puntos
  5. Siempre Cooperar: 144 puntos último lugar
```

Siempre Traicionar ganó el torneo, seguido de Grudger y Tit-for-Tat; Siempre Cooperar quedó al final. Esto confirma lo esperado en la teoría: una estrategia egoísta rígida aprovecha a los cooperadores ingenuos, pero las estrategias con memoria, como Grudger y Tit-for-Tat, logran resultados competitivos al castigar la traición sin dejar de cooperar cuando es posible.

**Script 2: análisis de la matriz de pagos.** Analiza de forma estática la matriz clásica del dilema del prisionero (medida en meses de prisión, donde menos es mejor). A través de ciclos iterativos anidados recorre la matriz para determinar si existe una estrategia dominante para cada jugador y si hay uno o más equilibrios de Nash, apoyándose en condicionantes para comparar los pagos celda por celda.

```python
## Script 2
## Analizador de matrices de pagos
## Dilema del prisionero (menos es mejor)

matriz = [
    [(1,1), (9,0)],
    [(0,9), (6,6)],
]

## Estrategias
estrategia_jugador1 = ["Callarse", "Confesar"]
estrategia_jugador2 = ["Callarse", "Confesar"]


## Dibujar matriz

def mostrar_matriz():

    print("\n" + "=" * 45)
    print("  MATRIZ DE PAGOS (meses de prisión)")
    print("  Menos meses = mejor resultado")
    print("=" * 45)

    print(f"\n{'':20} {'J2 Callarse':>12} {'J2 Confesar':>12}")
    print("-" * 45)

    for i in range(len(matriz)):
        fila = estrategia_jugador1[i]
        print(f"  J1 {fila:<16}", end="")

        for j in range(len(matriz[i])):
            celda = matriz[i][j]
            print(f"  {str(celda):>12}", end="")

        print()

## Buscar estrategia dominante

def encontrar_dominante():

    print("\n" + "=" * 45)
    print("  ESTRATEGIA DOMINANTE")
    print("=" * 45)

    ## Buscar estrategia dominante del Jugador 1
    for i in range(len(matriz)):
        es_dominante = True

        for k in range(len(matriz)):
            if i == k:
                continue

            for j in range(len(matriz[i])):
                pago_i = matriz[i][j][0]
                pago_k = matriz[k][j][0]

                if pago_i > pago_k:
                    es_dominante = False

        if es_dominante:
            print(f"\n  Jugador 1: '{estrategia_jugador1[i]}' es dominante")
            print(f"  Siempre le da menos meses sin importar")
            print(f"  lo que haga el Jugador 2")
        else:
            print(f"\n  Jugador 1: '{estrategia_jugador1[i]}' no es dominante")

    ## Buscar estrategia dominante del Jugador 2
    for j in range(len(matriz[0])):
        es_dominante = True

        for k in range(len(matriz[0])):
            if j == k:
                continue

            for i in range(len(matriz)):
                pago_j = matriz[i][j][1]
                pago_k = matriz[i][k][1]

                if pago_j > pago_k:
                    es_dominante = False

        if es_dominante:
            print(f"\n  Jugador 2: '{estrategia_jugador2[j]}' es dominante")
            print(f"  Siempre le da menos meses sin importar")
            print(f"  lo que haga el Jugador 1")
        else:
            print(f"\n  Jugador 2: '{estrategia_jugador2[j]}' no es dominante")

## Equilibrio de Nash

def encontrar_nash():

    print("\n" + "=" * 45)
    print("  EQUILIBRIO DE NASH")
    print("=" * 45)

    equilibrios = []

    ## Recorrer cada celda de la matriz
    for i in range(len(matriz)):
        for j in range(len(matriz[i])):

            pago_jugador1 = matriz[i][j][0]
            pago_jugador2 = matriz[i][j][1]

            ## ¿Es la mejor respuesta para Jugador 1?
            ## Busca el mínimo en la columna j
            mejor_jugador1 = True
            for k in range(len(matriz)):
                if matriz[k][j][0] < pago_jugador1:
                    mejor_jugador1 = False

            ## ¿Es la mejor respuesta para Jugador 2?
            ## Busca el mínimo en la fila i
            mejor_jugador2 = True
            for k in range(len(matriz[i])):
                if matriz[i][k][1] < pago_jugador2:
                    mejor_jugador2 = False

            ## Si es mejor para ambos es Equilibrio de Nash
            if mejor_jugador1 and mejor_jugador2:
                equilibrios.append((i, j))
                print(f"\n  Equilibrio de Nash encontrado:")
                print(f"  Jugador 1: {estrategia_jugador1[i]}")
                print(f"  Jugador 2: {estrategia_jugador2[j]}")
                print(f"  Resultado: J1={pago_jugador1} meses | J2={pago_jugador2} meses")

    ## ¿Cuántos equilibrios hay?
    if len(equilibrios) == 0:
        print("\n  No existe Equilibrio de Nash")
    elif len(equilibrios) == 1:
        print("\n  Existe exactamente un Equilibrio de Nash")
    else:
        print(f"\n  Existen {len(equilibrios)} Equilibrios de Nash")

## Flujo principal

def analisis_completo():

    print("=" * 45)
    print("  ANALIZADOR DE TEORÍA DE JUEGOS")
    print("  Dilema del Prisionero")
    print("=" * 45)

    ## Mostrar la matriz
    mostrar_matriz()

    ## Encontrar estrategia dominante
    encontrar_dominante()

    ## Encontrar Equilibrio de Nash
    encontrar_nash()

    ## Análisis final
    print("\n" + "=" * 45)
    print("  CONCLUSIÓN DEL ANÁLISIS")
    print("=" * 45)

    print("\n  En este juego ambos jugadores tienen")
    print("  como estrategia dominante: Confesar.")
    print()
    print("  Aunque si ambos se callaran obtendrían")
    print("  solo 1 mes de prisión cada uno,")
    print("  la lógica individual los lleva a")
    print("  confesar y obtener 6 meses cada uno.")
    print()
    print("  Eso es la paradoja del Dilema")
    print("  del Prisionero.")


## Arrancar el programa

analisis_completo()

print("\n  Fin del programa.")
```

Así se ve en consola el resultado del script 2:

```text
=============================================
  ANALIZADOR DE TEORÍA DE JUEGOS
  Dilema del Prisionero
=============================================

=============================================
  MATRIZ DE PAGOS (meses de prisión)
  Menos meses = mejor resultado
=============================================

                      J2 Callarse  J2 Confesar
---------------------------------------------
  J1 Callarse                (1, 1)        (9, 0)
  J1 Confesar                (0, 9)        (6, 6)

=============================================
  ESTRATEGIA DOMINANTE
=============================================

  Jugador 1: 'Callarse' no es dominante

  Jugador 1: 'Confesar' es dominante
  Siempre le da menos meses sin importar
  lo que haga el Jugador 2

  Jugador 2: 'Callarse' no es dominante

  Jugador 2: 'Confesar' es dominante
  Siempre le da menos meses sin importar
  lo que haga el Jugador 1

=============================================
  EQUILIBRIO DE NASH
=============================================

  Equilibrio de Nash encontrado:
  Jugador 1: Confesar
  Jugador 2: Confesar
  Resultado: J1=6 meses | J2=6 meses

  Existe exactamente un Equilibrio de Nash

=============================================
  CONCLUSIÓN DEL ANÁLISIS
=============================================

  En este juego ambos jugadores tienen
  como estrategia dominante: Confesar.

  Aunque si ambos se callaran obtendrían
  solo 1 mes de prisión cada uno,
  la lógica individual los lleva a
  confesar y obtener 6 meses cada uno.

  Eso es la paradoja del Dilema
  del Prisionero.

  Fin del programa.
```

"Confesar" resulta dominante para ambos jugadores, ya que siempre otorga menos meses de cárcel sin importar la decisión del contrario. Por eso el único Equilibrio de Nash de la matriz se ubica donde ambos confiesan, aun cuando callar los dos hubiera significado solo 1 mes de prisión para cada uno.

## Conclusión

Presentó un reto, sí, el realizar un tema semi-complejo para ejemplificar las condicionantes y funciones iterativas, pero de verdad que fue de mucha satisfacción. Existen otros ejercicios como el de un cajero automático o análisis de tablas con temática de una tienda, pero este resultó más atractivo.

Agregué el eslabón relacionado a la aleatoriedad para darle un poquito de autonomía al ejercicio, para intentar simular que no siempre se llegará al mismo resultado, sobre todo para el script 1, ya que el script 2 analiza a la misma matriz siempre.

Con varias ejecuciones noté que lo único cambiante en el script 1 eran los últimos dos renglones de los resultados, quiere decir que se llegan a resultados similares con las mismas estrategias. Pero, ¿qué sucederá si extendemos el ejercicio con una variante y diversificamos las estrategias? Da mucho en qué pensar, pero ya será para otra práctica.

## Referencias

- Hinojosa Gutiérrez, Á. (2015). *Python paso a paso*. RA-MA Editorial. [https://elibro.net/es/ereader/bibliotecauveg/107213](https://elibro.net/es/ereader/bibliotecauveg/107213)
- Gibbons, R. (2011). *Un primer curso de teoría de juegos*. Antoni Bosch editor. [https://elibro.net/es/ereader/bibliotecauveg/85172](https://elibro.net/es/ereader/bibliotecauveg/85172)
- El Pythonista. (2026). *If, elif y else en Python: guía de condicionales*. [https://elpythonista.com/if-elif-y-else-en-python-guia-de-condicionales-2026-ejemplos](https://elpythonista.com/if-elif-y-else-en-python-guia-de-condicionales-2026-ejemplos)