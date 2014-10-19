jade-angular-maven-seed
=======================

A seed project that wires together Jade + AngularJS + Maven to build a WAR file for an entirely 'client-side' app.

Roadmap
--------
* grunt proxy example
** Allowing you to develop (with livereload) whilst communicating with your backend server
* Unit Tests
* Protractor Tests


Development
--------

To launch livereload server:
```bash
grunt serve
```

To preview minified app:
```bash
grunt serve:dist
```

To simply build the project:
```bash
grunt build
```

To test the project: (Coming Soon! No tests yet - Sorry!)
```bash
grunt test
```

Production
--------
To build the WAR run:
```bash
mvn clean install
```
This will:
* Clean (Obviously! :) )
* Install NodeJS
* Install NPM
* Install Grunt (Coming Soon!)
* Run Grunt
* Package WAR

Cobbled Together By
--------

* Dylan Watson - <lotsabackscatter@gmail.com>

License
--------

    Copyright 2014 Dylan Watson.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
