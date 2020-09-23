<!--
SPDX-FileCopyrightText: 2020 tech@factchecklab <tech@factchecklab.org>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

# Editorial Widgets

The editorial widgets are for embedding in the public website for submitting
information to the ditorial team. This projects calls the Editorial API.

## Features

* Calls Editorial API to query for fact check reports.
* Submit potential misinformation to the editorial team.


## Developing

### Requirements

* [Editorial API](https://gitlab.com/factchecklab/editorial-api)

### Getting started

First of all, create `.env` file which contains all the server settings. Copy
from `.env.example` as an example. Check that all backing services are running
beforehand.

```
$ yarn install
$ yarn dev
```

If you use Docker, the repository contains a Docker Compose file which
help you start the required services for you.

```
$ docker-compose run --rm api yarn install
$ docker-compose up app
```

The server listen at port 3000.

## Contributing

We welcome contributions to our projects! You can ask questions or [file a bug
report](https://gitlab.com/factchecklab/editorial/-/issues/new) by creating an
issue on GitLab. To contribute, fork this repository on
GitLab and create a merge request.

## Getting Help

If you have questions, [file an issue](https://gitlab.com/factchecklab/editorial/-/issues/new)
in our repository on GitLab, you can
also contact us at [tech@factchecklab.org](mailto:tech@factchecklab.org).

## Copyright & License

Copyright (c) 2020 tech@factchecklab.

The source code is licensed under Affero General Public License Version 3.
