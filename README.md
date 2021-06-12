# LernProgramm

Diese Lernprogramm ermöglicht dem Nutzer sein Wissen in den Bereichen Mathematik, IT und Allgemeines auf die Probe zu stellen.
Es wurde im Rahmen eines Belegs im Modul Internettechnologien I der HTW Dresden angefertigt.

## Features

* PWA
* asynchrones Nachladen von einer Web-Quiz-Engine über eine Rest Schnittstelle mittels Ajax
* Service Worker für das Cache-Handling und Offline-Nutzung
* responsive Design mittels Media Queries

## Tools

* Browser: Google Chrome mit Entwickler-Tools
* IDE: PHPStorm

## Relevantes

Die Funktion zum asynchronen Nachladen von Fragen mittels Ajax war ursprünglich so geplant, dass felxibel unterschiedliche Anzahlen von Antwortmöglichkeiten sowie Anzahlen von Antworten möglich sind. Leider nahm der Webserver die Syntax aus der Beschreibung der Web-Quiz-Engine nicht an.

Z.B. Erstellen einer Aufgabe mit mehreren richtigen Antworten:
curl --user s80541@htw-dresden.de:secret -X POST -H "Content-Type: application/json" -d '{"title":"Allgemein", "text“:“Welche Städte liegen in Frankreich“, "options": ["Bordoux", "Paris", "Turin", "Mailand"], "answer": [0,1]}' https://irene.informatik.htw-dresden.de:8888/api/quizzes

Fehlermeldung:
{"timestamp":"2021-06-12T13:54:36.633+0000","status":400,"error":"Bad Request","message":"JSON parse error: Unexpected character ('o' (code 111)): was expecting a colon to separate field name and value; nested exception is com.fasterxml.jackson.core.JsonParseException: Unexpected character ('o' (code 111)): was expecting a colon to separate field name and value\n at [Source: (PushbackInputStream); line: 1, column: 77]","path":"/api/quizzes"}%    

Aus diesem Grund baut die Funktion für die Fragen vom Server die Antwort-Buttons dynamisch auf im Gegensatz zu der Funktion für die lokal gespeicherten Fragen.

## Vorschläge zur Verbesserung

* weitere Syntaxhinweise für die curl-Befehle für Aufgaben mit mehreren richtigen Antworten
* Anlegen von Benutzer-Accounts zur Speicherung von Lernständen

## Quellen

* https://colorhunt.co/palette/179373; 20.05.2021; 14:17 Uhr
* https://katex.org/; 20.05.2021; 17:10 Uhr
* https://uxwing.com/innovation-icon/; 05.06.2021; 11:45 Uhr
* https://karrierebibel.de/allgemeinwissen/; 05.06.2021; 21:01 Uhr
