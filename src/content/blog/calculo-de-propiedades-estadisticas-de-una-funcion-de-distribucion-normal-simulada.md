---
title: "Cálculo de propiedades estadísticas de una función de distribución normal simulada"
date: 2026-08-03
tags: ["Tarea", "R3_U1"]
description: "Cómo construí en Python seis funciones para calcular promedio, mediana, cuartiles, deciles, percentiles y percentiles extremos sobre un arreglo generado con NumPy que sigue una distribución normal."
draft: false
---

## Introducción

En el presente reto se aborda el análisis estadístico para la distribución normal, el cual sale de una función con ciertos parámetros especificados. 

La distribución normal es la que comúnmente se le conoce como forma de campana.

Esto quiere decir que los datos están distribuidos tendiendo al centro y que los datos más lejanos al centro, se hacen menos probables de que aparezcan (Minitab, 2024).

La gráfica de probabilidades normal, se utiliza para el análisis de datos donde su variable es continua (Universidad Nacional Autónoma de México, 2024).

Que la variable sea continua, quiere decir que no hay una interrupción, donde ningún valor de x carece de y y viceversa.

Su densidad de distribución, se caracteriza por la media y su desviación estándar. Radica su importancia en que se utiliza para conocer la tendencia de muchas medidas, como altura, peso, resultados de mediciones científicas, precipitación pluvial, por mencionar algunos casos.

## Desarrollo

Se utiliza la librería "Numpy", para crear los datos y para analizarlos.

### ¿Qué es Numpy?

Es un paquete fundamental para la computación científica en python (NumPy Developers, 2024).

Proporcionó un objeto matriz multidimensional, sus derivados y operaciones matemáticas, entre más cosas para elegir, según las operaciones que se estén realizando.

### Características

- Sus array tienen un tamaño fijo, es decir, si hay que modificarlo, numpy crea otro y elimina el anterior.
- Todos los elementos son del mismo tipo de dato.
- Facilita operaciones sobre grandes cantidades de datos.

### Simulación de la distribución normal

Para simular la distribución normal, se utilizará la siguiente formula:

```python
import numpy as np

np.random.seed(0)
listaNumeros = np.random.normal(loc=120, scale=10, size=1000)
```

<figure class="hist-figure">
<style>
.hist-figure {
  --hist-surface: #fcfcfb;
  --hist-text-primary: #0b0b0b;
  --hist-text-muted: #898781;
  --hist-grid: #e1e0d9;
  --hist-axis: #c3c2b7;
  --hist-bar: #2a78d6;
  --hist-bar-hover: #1c5cab;
  margin: 1.5em 0;
  padding: 0;
}
@media (prefers-color-scheme: dark) {
  :root:where(:not([data-theme="light"])) .hist-figure {
    --hist-surface: #1a1a19;
    --hist-text-primary: #ffffff;
    --hist-text-muted: #898781;
    --hist-grid: #2c2c2a;
    --hist-axis: #383835;
    --hist-bar: #3987e5;
    --hist-bar-hover: #86b6ef;
  }
}
:root[data-theme="dark"] .hist-figure {
  --hist-surface: #1a1a19;
  --hist-text-primary: #ffffff;
  --hist-text-muted: #898781;
  --hist-grid: #2c2c2a;
  --hist-axis: #383835;
  --hist-bar: #3987e5;
  --hist-bar-hover: #86b6ef;
}
.hist-figure .hist-svg {
  width: 100%;
  height: auto;
  background: var(--hist-surface);
  border-radius: 8px;
  overflow: visible;
}
.hist-figure .hist-grid { stroke: var(--hist-grid); stroke-width: 1; }
.hist-figure .hist-axis { stroke: var(--hist-axis); stroke-width: 1; }
.hist-figure .hist-axislabel {
  fill: var(--hist-text-muted);
  font-size: 11px;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
.hist-figure .hist-bar {
  fill: var(--hist-bar);
  transition: fill 0.15s ease;
  cursor: pointer;
}
.hist-figure .hist-bar:hover,
.hist-figure .hist-bar:focus {
  fill: var(--hist-bar-hover);
  outline: none;
}
.hist-figure figcaption {
  font-size: 0.85em;
  color: var(--hist-text-muted);
  text-align: center;
  margin-top: 0.5em;
}
</style>
<svg class="hist-svg" viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hist-title hist-desc">
<title id="hist-title">Histograma de 1,000 valores generados por una distribución normal simulada</title>
<desc id="hist-desc">Distribución con forma de campana centrada cerca de 120, generada con np.random.normal(loc=120, scale=10, size=1000).</desc>
<line class="hist-grid" x1="44" y1="306.00" x2="704" y2="306.00" />
<text class="hist-axislabel" x="36" y="309.00" text-anchor="end">0</text>
<line class="hist-grid" x1="44" y1="158.04" x2="704" y2="158.04" />
<text class="hist-axislabel" x="36" y="161.04" text-anchor="end">50</text>
<line class="hist-grid" x1="44" y1="10.08" x2="704" y2="10.08" />
<text class="hist-axislabel" x="36" y="13.08" text-anchor="end">100</text>
<line class="hist-axis" x1="44" y1="306" x2="704" y2="306" />
<rect class="hist-bar" tabindex="0" x="45.00" y="300.08" width="23.38" height="5.92" rx="2"><title>89.5 – 91.8: 2 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="70.38" y="294.16" width="23.38" height="11.84" rx="2"><title>91.8 – 94.0: 4 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="95.77" y="297.12" width="23.38" height="8.88" rx="2"><title>94.0 – 96.2: 3 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="121.15" y="279.37" width="23.38" height="26.63" rx="2"><title>96.2 – 98.5: 9 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="146.54" y="273.45" width="23.38" height="32.55" rx="2"><title>98.5 – 100.7: 11 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="171.92" y="270.49" width="23.38" height="35.51" rx="2"><title>100.7 – 102.9: 12 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="197.31" y="217.22" width="23.38" height="88.78" rx="2"><title>102.9 – 105.2: 30 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="222.69" y="199.47" width="23.38" height="106.53" rx="2"><title>105.2 – 107.4: 36 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="248.08" y="172.84" width="23.38" height="133.16" rx="2"><title>107.4 – 109.6: 45 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="273.46" y="119.57" width="23.38" height="186.43" rx="2"><title>109.6 – 111.9: 63 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="298.85" y="78.14" width="23.38" height="227.86" rx="2"><title>111.9 – 114.1: 77 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="324.23" y="48.55" width="23.38" height="257.45" rx="2"><title>114.1 – 116.3: 87 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="349.62" y="60.39" width="23.38" height="245.61" rx="2"><title>116.3 – 118.6: 83 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="375.00" y="16.00" width="23.38" height="290.00" rx="2"><title>118.6 – 120.8: 98 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="400.38" y="69.27" width="23.38" height="236.73" rx="2"><title>120.8 – 123.0: 80 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="425.77" y="30.80" width="23.38" height="275.20" rx="2"><title>123.0 – 125.3: 93 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="451.15" y="149.16" width="23.38" height="156.84" rx="2"><title>125.3 – 127.5: 53 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="476.54" y="101.82" width="23.38" height="204.18" rx="2"><title>127.5 – 129.7: 69 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="501.92" y="187.63" width="23.38" height="118.37" rx="2"><title>129.7 – 132.0: 40 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="527.31" y="211.31" width="23.38" height="94.69" rx="2"><title>132.0 – 134.2: 32 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="552.69" y="246.82" width="23.38" height="59.18" rx="2"><title>134.2 – 136.4: 20 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="578.08" y="249.78" width="23.38" height="56.22" rx="2"><title>136.4 – 138.7: 19 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="603.46" y="261.61" width="23.38" height="44.39" rx="2"><title>138.7 – 140.9: 15 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="628.85" y="276.41" width="23.38" height="29.59" rx="2"><title>140.9 – 143.1: 10 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="654.23" y="288.24" width="23.38" height="17.76" rx="2"><title>143.1 – 145.4: 6 valores</title></rect>
<rect class="hist-bar" tabindex="0" x="679.62" y="297.12" width="23.38" height="8.88" rx="2"><title>145.4 – 147.6: 3 valores</title></rect>
<text class="hist-axislabel" x="44" y="330" text-anchor="start">90</text>
<text class="hist-axislabel" x="385" y="330" text-anchor="middle">media ≈ 120</text>
<text class="hist-axislabel" x="704" y="330" text-anchor="end">148</text>
</svg>
<figcaption>Histograma de los 1,000 valores generados por <code>listaNumeros</code></figcaption>
</figure>

Como se puede observar, la función genera datos que son propios de una distribución normal, al tener su forma de campana.

Teniendo estos datos se analiza con la librería "numpy", para conocer el valor de sus propiedades. Se compone de "loc", "scale" y "size".

La palabra "loc", es la media, o sea el centro de la distribución, que se explica más adelante. En cuanto a "scale", se refiere a que tan separados van a estar los valores y "size", la cantidad de datos que se van a generar.

El objetivo de funciones como esta, es que los datos se comporten de una forma "natural".

## Análisis a los datos obtenidos

### Promedio

El promedio se calcula sumando un grupo de números pertenecientes al mismo muestreo o conjunto, posteriormente se divide entre el recuento de este mismo grupo de números.

En numpy la palabra reservada "mean", calcula el promedio, recibiendo los datos (Microsoft Support, 2024).

```python
def promedio(datos):
    return float(np.mean(datos))
```

Promedio: 119.54743292509804

### Mediana

La mediana es el medio de un grupo de números.

En numpy existe la palabra reservada "median", que calcula la misma.

```python
def mediana(datos):
    return float(np.median(datos))
```

Mediana: 119.41971965200372

### Cuartiles

Son tres elementos de un conjunto de datos ordenados que dividen el conjunto en partes iguales (Universo Fórmulas, 2024).

En numpy hay una palabra reservada llamada "percentil" para calcular esto. Para que sea un cuartil, hay que dividir los datos en 4 partes iguales, deben ser los parámetros ingresados de 25, 50 y 75, para llamar a la función en la librería.

```python
def cuartiles(datos):
    return list(np.percentile(datos, [25, 50, 75]))
```

Cuartiles (25,50,75): [113.0157994064013, 119.41971965200372, 126.06950601888398]

### Deciles

Son similar a los cuartiles, pero estos dividen la distribución en 10 partes.

En la misma función de "percentil", hay que pasarle otra llamada "arange", de la misma librería, como hay que dividir en 10 partes, a este se le pasa el 10, que es el primer número de la secuencia y esta incluido, 100, que es el objetivo de la secuencia, pero esta excluido y 10 que es la magnitud del paso (Universidad de Valencia, 2024).

```python
def deciles(datos):
    return list(np.percentile(datos, np.arange(10, 100, 10)))
```

Deciles (10..90): [107.00857674641988, 111.38210453735763, 114.56283374582962, 116.88278037557092, 119.41971965200372, 121.97121356415258, 124.29764695316696, 127.88396791360115, 132.31593551100462]

### Percentil

Es lo mismo, pero divide para cualquier percentil, en este ejemplo, se eligió el 41.

```python
def percentil(datos, p):
    return float(np.percentile(datos, p))
```

Percentil 41 (ejemplo): 117.05721695424052

### Percentiles extremos

Se calcula el valor de los extremos y se devuelve el valor percentil, en el caso del ejemplo son el 2 y el 98.

Una característica de los percentiles extremos, es que se toma el menor a 3 o 5 % y el mayor a 95 %, por eso la elección de los valores antes mencionados.

```python
def percentiles_extremos(datos):
    return (float(np.percentile(datos, 2)), float(np.percentile(datos, 98)))
```

Percentil 2 (extremo inferior): 99.52223158702927
Percentil 98 (extremo superior): 140.21912547482287

## Conclusión

La definición de la función de distribución normal, fue fascinante, el saber que existe tantas cosas donde aplicar su función, también se descubrió que existe la posibilidad de que aparente ser una función normal, pero no serlo.

El uso de funciones normales para analizar un comportamiento, muchas veces puede prever aspectos de suma importancia como podría haber sido en la pandemia del covid, para poder medir los picos de contagios o enfermos en los hospitales, esto para tomar medidas necesarias y deberían de cambiar las tendencias, moviéndose la media en si para poder saber hacía que acciones ayudan a reducir de estar en un pico de infectados, ahora a un pico de personas sanas, donde los infectados, sean los que más se alejan de la media.

Con este ejemplo se quiere decir, que no solo se sabe, sino que da posibilidad a tomar acción.

Este ejemplo fue drástico, pero puede ser utilizada también en cosas cotidianas, como compras, ventas, tendencias en precios, incluso actividades sin fines más que meramente de desarrollo personal, como el correr. Tal vez el tiempo en que se corre y que cantidad de kilómetros se recorren. Esto y un sin número de cosas posibles.

Como se hizo explicación en el cuerpo del documento, la función "normal", de la librería, genera un grupo de datos con las características que se le especifiquen en "loc", "scale" y "size" respectivamente.

Donde "loc", es para la media, "scale" para que tan alejados de la media va a ser común estar y "size" cuantos números se esperan. En si estos parámetros son la esencia del análisis, sin ellos, no habría que analizar, a su vez, pueden obtenerse de forma empírica con encuestas o analizando data acumulada de conjuntos específicos en la vida real.

La palabra "mean", es para calcular el promedio y es muy específica, solo calcula el promedio.

A su vez "median", calcula la mediana.

Otra palabra reservada bastante interesante es "percentil", que en el documento se explica que hace, pero es para el cálculo de los percentiles especificados.

Aquí ya no se profundizó más en su explicación, porque está en el cuerpo del documento donde se utiliza las funciones, ahí enriquece más la explicación y demostración.

Agradezco el reto.

## Anexo. Código fuente completo (main.py)

A continuación se presenta el código completo del script `main.py`, del cual se extrajeron las funciones y resultados mostrados a lo largo de este documento.

```python
## Función para generar el arreglo y calcular medidas estadísticas

import numpy as np

# Genera un arreglo de 1,000 números con distribución normal (media 120, desviación estándar 10)
np.random.seed(0)
listaNumeros = np.random.normal(loc=120, scale=10, size=1000)

print(listaNumeros)

# Calcula el promedio (media aritmética) del arreglo
def promedio(datos):
    return float(np.mean(datos))

# Calcula la mediana (valor central) del arreglo
def mediana(datos):
    return float(np.median(datos))

# Calcula los cuartiles (percentiles 25, 50 y 75), que dividen los datos en 4 partes iguales
def cuartiles(datos):
    return list(np.percentile(datos, [25, 50, 75]))

# Calcula los deciles (percentiles 10 al 90), que dividen los datos en 10 partes iguales
def deciles(datos):
    return list(np.percentile(datos, np.arange(10, 100, 10)))

# Calcula cualquier percentil p indicado por el usuario
def percentil(datos, p):
    return float(np.percentile(datos, p))

# Calcula los percentiles extremos (2 y 98), útiles para identificar valores atípicos
def percentiles_extremos(datos):
    return (float(np.percentile(datos, 2)), float(np.percentile(datos, 98)))

if __name__ == '__main__':
    print('Promedio:', promedio(listaNumeros))
    print('Mediana:', mediana(listaNumeros))
    print('Cuartiles (25,50,75):', cuartiles(listaNumeros))
    print('Deciles (10..90):', deciles(listaNumeros))
    print('Percentil 41 (ejemplo):', percentil(listaNumeros, 41))
    extremos = percentiles_extremos(listaNumeros)
    print('Percentil 2 (extremo inferior):', extremos[0])
    print('Percentil 98 (extremo superior):', extremos[1])
```

## Referencias

- NumPy Developers. (2024). *What is NumPy?*. [https://numpy.org/doc/stable/user/whatisnumpy.html](https://numpy.org/doc/stable/user/whatisnumpy.html)
- Minitab. (2024). *¿Qué es la distribución normal?*. [https://support.minitab.com/es-mx/minitab/help-and-how-to/statistics/basic-statistics/supporting-topics/normality/what-is-the-normal-distribution/](https://support.minitab.com/es-mx/minitab/help-and-how-to/statistics/basic-statistics/supporting-topics/normality/what-is-the-normal-distribution/)
- Universo Fórmulas. (2024). *Cuartiles*. [https://www.universoformulas.com/estadistica/descriptiva/cuartiles/](https://www.universoformulas.com/estadistica/descriptiva/cuartiles/)
- Universidad de Valencia. (2024). *Deciles y cuartiles*. [https://www.uv.es/webgid/Descriptiva/23_deciles_y_cuartiles.html](https://www.uv.es/webgid/Descriptiva/23_deciles_y_cuartiles.html)
