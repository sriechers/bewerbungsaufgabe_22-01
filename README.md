# CSS Layout Aufgaben

Die Lösungen der CSS Layout Aufgaben befinden sich im Ordner \_\_css-aufgaben.

## Antworten CSS Fragen

### Layout 1

Für das erste Layout habe ich Flex in Kombination mit Media Queries verwendet, um so die Anordnung der Elemente über die „flex-direction“ Eigenschaft steuern zu können. Diese habe ich in der Media Query von „column“ auf „row“ gewechselt.

### Layout 2

Das zweite Layout wurde mit Grid umgesetzt. Mithilfe der „grid-template-areas“ lassen sich die Elemente frei anordnen. Mittels Media Query wird das Grid erst ab einer Größe von 768px aktiv, um die Elemente auf mobilen Geräten übereinander stapeln zu können.

### Layout 3

Beim letzten Layout wird das Bild ab einer Größe von 768px mithilfe von Float im Textfluss platziert. Auf mobilen Geräten „wächst“ das Bild in der Breite mit.

## Styling mit Tailwind CSS vs. Sass

Beim Styling mit Tailwind CSS nutzt man sogenannte „Utility“ Klassen, also Helferklassen. Diese erlauben die schnelle Entwicklung von Komponenten und bieten den Vorteil, dass bereits im Markup ersichtlich wird welche CSS Eigenschaften ein Element besitzt. Dadurch verringert man die Gefahr unerwünschte Nebeneffekte im Code zu erzeugen, welche durch die Kaskadierung des CSS ausgelöst werden. Nutzt man Tailwind mit PostCSS lassen sich außerdem ungenutzte Utilityklassen aus dem CSS Bündel entfernen. Ein Nachteil von Tailwind ist das unübersichtliche Markup, welches durch die Helferklassen entsteht.

Sass ist ein CSS Preprozessor. Das bedeutet, dass er die CSS Sprache um Konstrukte, wie Schleifen, Variablen, Maps und Ähnliches erweitert. Diese werden mittels Compiler in normales CSS umgewandelt. Im Gegensatz zu Tailwind bietet Sass dabei sehr viel Freiheit. So lassen sich auch komplexe Elemente mit vielen verschieden Zuständen einfach deklarieren. Jedoch kann diese Freiheit auch zu Problemen führen. Da Sass keine strikten Regeln bei der Erstellung vorgibt, kann es bei einem Team von Entwicklern schnell zu doppelten CSS Deklarationen kommen, die die CSS Bündelgröße unnötig vergrößern und unerwünschte Nebeneffekte auslösen.

## CSS Box-Modell

Das CSS Box-Modell definiert, wie Elemente im Browser dargestellt werden bzw. welchen Platz sie benötigen. Neben der Größe und Höhe werden auch das Padding und Borders zu der endgültigen Größe eines Elements hinzuaddiert. Dieses Standardverhalten lässt sich jedoch mit der CSS Eigenschaft „box-sizing“ manipulieren. Wird der Wert von box-sizing auf „border-box“ gesetzt, rendert der Browser das Element immer so breit und hoch, wie in den Eigenschaften definiert. Das Padding und die Borders werden also nicht noch einmal extra zu der Größe hinzuaddiert. Margins werden immer zusätzlich zu der eigentlichen Elementgröße hinzugerechnet.

### Beispiel

```css
.selector {
  height: 100px;
  width: 100px;
  margin: 10px;
  padding: 20px;
}
```

#### Standardverhalten

100px Höhe + 20px Padding (oben) + 20px Padding (unten), 10px Margin (oben) + 10px Margin (unten) = 140px Höhe und 20px Margins[^1]

#### Mit box-sizing: border-box

100px Höhe inklusive 20px Padding (oben) + 20px Padding (unten), 10px Margin (oben) + 10px Margin (unten) = 100px Höhe und 20px Margin[^1]

[^1]: Das gleiche gilt natürlich auch für die Breite des Elements.
