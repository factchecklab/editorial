<i18n lang="yaml">
en:
  navigation_bar:
    title: Maat Reseponse
    manage_reports: Manage Reports
    manage_topics: Manage Topics
  labels:
    to_admin:
      Admin
    to_public:
      Back to Public
zh-HK:
  navigation_bar:
    title: Maat Reseponse
    manage_reports: 管理報告
    manage_topics: 管理主題
  labels:
    to_admin:
      前往管理頁面
    to_public:
      返回公眾頁面
</i18n>
<template>
  <v-app-bar app dark color="primary">
    <v-toolbar-title>
      <v-btn :to="localePath('index')" text>
        {{ $t('navigation_bar.title') }}
      </v-btn>
    </v-toolbar-title>

    <v-spacer />

    <v-btn v-if="isAdmin" :to="localePath({ name: 'index' })">
      {{ $t('labels.to_public') }}
    </v-btn>
    <v-btn v-else :to="localePath({ name: 'admin' })">
      {{ $t('labels.to_admin') }}
    </v-btn>

    <v-menu right>
      <template v-slot:activator="{ on: menu }">
        <v-btn icon v-on="menu">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          :active="$i18n.locale === 'en'"
          :to="switchLocalePath('en')"
        >
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item
          :active="$i18n.locale === 'zh-HK'"
          :to="switchLocalePath('zh-HK')"
        >
          <v-list-item-title>中文</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <template v-if="isAdmin" v-slot:extension>
      <v-tabs grow show-arrows>
        <v-tab :to="localePath('admin-reports')">
          {{ $t('navigation_bar.manage_reports') }}
        </v-tab>
        <v-tab :to="localePath('admin-topics')">
          {{ $t('navigation_bar.manage_topics') }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isAdmin() {
      // TODO(cheungpat): This looks complicated, but we may switch to
      // using different layout for each kind of pages later.
      return this.$route.matched.some(
        ({ path }) =>
          path.startsWith('/admin/') ||
          path === '/admin' ||
          path.startsWith('/en/admin/') ||
          path === '/en/admin'
      )
    }
  }
}
</script>
