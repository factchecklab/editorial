<!--
SPDX-FileCopyrightText: 2020 tech@factchecklab <tech@factchecklab.org>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script>
export default {
  middleware({ app, redirect }) {
    return redirect('https://www.factchecklab.org')
  }
}
</script>
