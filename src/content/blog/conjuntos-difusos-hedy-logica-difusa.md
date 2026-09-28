---
title: "Conjuntos difusos: Hedy como sistema de lógica difusa"
date: 2026-09-26
tags: ["Tarea", "R2_U1"]
description: "Cómo modelé la decisión de publicar de Hedy, mi agente de blog, como un sistema de lógica difusa con variables lingüísticas y funciones de membresía."
draft: false
---

## Introducción

Para poder comprender la lógica difusa, hay que compararla con la lógica clásica. Una de las características más palpables es que la lógica clásica es determinística, es decir, es sí o es no. Mientras que la lógica difusa da pie a la progresión, existen los decimales por así decirlo.

En el esquema de abajo se puede observar la diferencia entre ambas lógicas para el concepto "alto" (adaptado de Ramírez Márquez, 2000, p. 40):

```text
 VISIÓN DE LA LÓGICA DIFUSA          VISIÓN DE LA LÓGICA CLÁSICA

 1 |              ____ "ALTO"        1 |          +------- "ALTO"
   |           .-'                     |          |
   |         .'                        |          |
   |       .'                          |          |
 0 |____.-'         "NO ALTO"        0 |__________|        "NO ALTO"
   +------------------------           +----------+-------------
               1.80   ALTURA (m)                 1.80   ALTURA (m)
```

La lógica difusa permite representar el conocimiento "común", que es mayormente del tipo lingüístico cualitativo y no cuantitativo; es un lenguaje matemático que a través de la teoría de conjuntos difusos se expresa en términos comprensibles en lenguaje natural (Ramírez Márquez, 2000).

Según Ramírez Márquez (2000), la lógica difusa fue investigada por primera vez en 1965, en la Universidad de Berkeley, por el ingeniero Lotfi A. Zadeh. Introduce el concepto "Fuzzy set", en el cual reside la idea de que los elementos sobre los que se construye el pensamiento humano no son números, sino etiquetas lingüísticas.

### Sistema de inferencia

Un sistema de inferencia difuso se compone principalmente de los siguientes elementos (Estudiando Ingeniería, 2020):

- **Fuzzificación:** convierte los valores numéricos de entrada en grados de pertenencia mediante funciones de membresía.
- **Base de reglas:** conjunto de reglas del tipo SI–ENTONCES que relacionan las variables de entrada con las de salida y definen el comportamiento del sistema. Su forma general es `A → B`, que se lee: SI *x* es *A* ENTONCES *y* es *B*.
- **Motor de inferencia:** evalúa las reglas para obtener una conclusión difusa.
- **Defuzzificación:** transforma el resultado difuso en un valor numérico concreto.

La *función de membresía* asigna a cada elemento del universo de discurso un grado de pertenencia en el intervalo [0, 1] (Estudiando Ingeniería, 2020). Las más comunes son la triangular, la trapezoidal, la gaussiana y la sigmoidal (Ramírez Márquez, 2000, p. 42):

```text
 (a) Triangular        (b) Trapezoidal       (c) Gaussiana         (d) Sigmoidal

 1 |     /\            1 |    ____           1 |     _             1 |         ___
   |    /  \             |   /    \            |   /   \             |       /
   |   /    \            |  /      \           |  /     \            |      /
 0 |__/      \__       0 |_/        \_       0 |_/       \_        0 |___./
   0    50   100         0    50   100         0    50   100         0    50   100
```

### Variables lingüísticas

La variable lingüística es la asignación de los valores para el análisis del comportamiento; estas pueden ser inventadas, se les asigna el valor que se desee, siempre y cuando sea lógico. Se representa mediante la tupla `(x, T(x), X, M)`, cuyos componentes son los siguientes (Hackeando Tec, 2015):

- **x:** nombre de la variable, por ejemplo, *altura*.
- **T(x):** conjunto de valores lingüísticos que puede tomar la variable, por ejemplo, *bajo*, *mediano* y *alto*.
- **X:** universo de discurso, es decir, el rango de valores numéricos al que pertenece la variable, por ejemplo, de 0 a 2.5 m.
- **M:** regla semántica que asocia cada término lingüístico con su significado, esto es, con un conjunto difuso definido sobre *X*.

## Desarrollo: Hedy como sistema de lógica difusa

### Descripción del proceso

Hedy es un agente que investiga un tema dado y escribe un blog para hedy.blog. Por lo que sigue la convencionalidad de la base de reglas de la condicional en la lógica difusa revisada en la introducción, SI–ENTONCES. Actualmente se ejecuta cada 48 horas, sin importar si vale la pena, sin revisar si existe una publicación anterior o si ya se publicó ese tema.

### Justificación

La decisión de publicar no es determinista, admite ciertos grados. Centrándonos en los temas, por ejemplo, no es lo mismo un tema "apenas interesante" a un tema "muy interesante"; tampoco es lo mismo publicar hace 24 horas que hace 90 horas. Con la lógica clásica tendríamos que fijar umbrales exactos. Si las horas son 47 o 49, producirían un opuesto, aunque la situación sea casi la misma. La lógica difusa nos permitirá combinar ambos factores de manera gradual, como si una persona estuviera decidiendo si es momento de escribir.

### Variables lingüísticas de Hedy

**1. Tiempo desde la última publicación.** Mide cuántas horas han pasado desde la última publicación.

- **x:** tiempo desde la última publicación.
- **T(x):** {*reciente*, *moderado*, *atrasado*}
- **X:** 0 a 96 horas
- **M:**
  - reciente: de 0 a 36 h (plenamente reciente hasta las 24 h)
  - moderado: de 24 a 72 h (máximo en 48 h)
  - atrasado: de 60 a 96 h (plenamente atrasado desde las 72 h)

```text
 μ(x)
 1 |__reciente__        moderado        ____atrasado___
   |            \          /\          /
   |             \        /  \        /
   |              \      /    \      /
 0 |_______________\____/______\____/__________________
   0          24   36  48      60  72                96
                Tiempo desde la última publicación (horas)
```

**2. Interés del tema investigado.** Mide qué tan interesante resultó el tema investigado, según la autoevaluación de Hedy.

- **x:** interés del tema.
- **T(x):** {*bajo*, *medio*, *alto*}
- **X:** 0 a 10
- **M:**
  - bajo: de 0 a 5 (plenamente bajo hasta 3)
  - medio: de 3 a 7 (máximo en 5)
  - alto: de 5 a 10 (plenamente alto desde 7)

```text
 μ(x)
 1 |____bajo____       medio       _______alto_______
   |            \        /\        /
   |             \      /  \      /
   |              \    /    \    /
 0 |_______________\__/______\__/____________________
   0            3     5      7                     10
                Interés del tema (escala de 0 a 10)
```

**3. Prioridad de publicar hoy.** Mide qué tan conveniente es que Hedy escriba hoy; es la variable de salida del sistema.

- **x:** prioridad de publicar.
- **T(x):** {*baja*, *media*, *alta*}
- **X:** 0 a 100
- **M:**
  - baja: de 0 a 40 (plenamente baja hasta 20)
  - media: de 20 a 80 (máximo en 50)
  - alta: de 60 a 100 (plenamente alta desde 80)

```text
 μ(x)
 1 |__baja__           media            ____alta____
   |        \           /\             /
   |         \         /  \           /
   |          \       /    \         /
 0 |___________\_____/______\_______/________________
   0       20   40      50     60  80             100
                Prioridad de publicar (índice de 0 a 100)
```

### Sistema de lógica difusa

Las etapas de un sistema de inferencia difuso son las siguientes (adaptado de *Lógica difusa y sistemas de control*, s.f., p. 15):

| Etapa | Comentario |
|-------|------------|
| Dato de entrada | Dato proveniente del sensor que mide la variable del proceso; puede presentar ruido y desviaciones con respecto al valor real. |
| Fuzzificación | Se convierte un número en valores correspondientes a las funciones de membresía a las que pertenece. |
| Evaluación de reglas | Las reglas definen la estrategia de control o conocimiento; se realizan operaciones entre los conjuntos. |
| Inferencia | Se determina el conjunto de salida de cada regla. |
| Agregado | Se obtiene la función de membresía de la variable de salida a partir de alguna operación entre todos los conjuntos de salida de la etapa de inferencia. |
| Defuzzificación | Definida la función de membresía de la salida, se determina cuál dato es el más representativo del conjunto de salida total. |
| Dato de salida | Es la variable que tomará el actuador para modificar el estado del proceso. |

Basado en las etapas anteriormente presentadas, se elaboró el diagrama para el caso de Hedy:

![Diagrama del sistema de lógica difusa de Hedy](/blog/hedy_diagrama.jpg)

[Ver diagrama del sistema en Canva](https://canva.link/5f3a0iwrqcts2c3)

## Conclusión

La lógica difusa puede aplicarse en el entorno educativo para medir el nivel de aprendizaje efectivo del estudiante, con proyectos o repetición espaciada. A su vez, sí es muy importante que los alumnos asistan a las clases grupales en vivo, porque así pueden dar a conocer las incertidumbres; por ejemplo, que el profesor vea que a Juanita se le está dificultando, por lo que la agrega al grupo de *dudas*, en vez de asignarle un número *x*, porque exactamente no sabemos qué nivel de duda tenga. Los estudiantes con mejor comprensión podrían asignarse en *comprendido*, o los que comprenden más o menos, en uno intermedio de *falta repasar*. Así ya se les puede dar una mejor atención y podría mejorar el nivel académico y el aprendizaje efectivo.

En el entorno laboral, he logrado identificar que no hay un conocimiento homogéneo aunque sea el mismo puesto de la vacante. Las tareas se asignan a todos por igual y muchas veces, aunque exista la denominación de nivel de experiencia, no se utiliza. Una propuesta podría ser que en las tareas se indique *junior*, *mid* o *senior*. Así podría mejorarse el trabajo tanto en tiempo como en calidad. Muchas veces un *junior* que tiene que entregar en 2 días algo fácil para un *senior* se tarda una semana, por lo que ahí está una vulnerabilidad en la gestión.

Como trabajo futuro, este modelo podría implementarse en código y analizarse, simulando el comportamiento de los datos reales.

## Referencias

- Estudiando Ingeniería. (27 de agosto de 2020). *¿Qué es la lógica difusa? Funciones de membresía, reglas y control difuso | Parte 1* [Video]. YouTube. [https://www.youtube.com/watch?v=4uyTQtU_JEY](https://www.youtube.com/watch?v=4uyTQtU_JEY)
- Hackeando Tec. (28 de agosto de 2015). *Lógica difusa - 3.2.1 Razonamiento difuso (variable lingüística)* [Video]. YouTube. [https://www.youtube.com/watch?v=hjsDioVoIG4](https://www.youtube.com/watch?v=hjsDioVoIG4)
- *Lógica difusa y sistemas de control*. (s.f.). [https://cayetanoguerra.github.io/ia/logicadifusa/Logica%20difusa%20y%20sistemas%20de%20control.pdf](https://cayetanoguerra.github.io/ia/logicadifusa/Logica%20difusa%20y%20sistemas%20de%20control.pdf)
- Ramírez Márquez, M. (2000). *Aplicación de los métodos de la lógica difusa al proyecto y construcción de puentes* [Tesis doctoral, Universitat Politècnica de Catalunya]. TDX. [https://www.tdx.cat/bitstream/handle/10803/6887/04Rpp04de11.pdf](https://www.tdx.cat/bitstream/handle/10803/6887/04Rpp04de11.pdf)
