import Vue from 'vue'
import VueApollo from 'vue-apollo'
import 'cross-fetch/polyfill'

import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'

Vue.use(VueApollo)

export default (ctx, inject) => {
  const { app, beforeNuxtRender } = ctx

  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: [] // no types provided
        }
      }
    })
  })

  if (!process.server) {
    cache.restore(window.__NUXT__ ? window.__NUXT__.apollo.defaultClient : null)
  }

  const httpEndpoint = process.env.GRAPHQL_HTTP_ENDPOINT
  const browserHttpEndpoint = process.env.GRAPHQL_BROWSER_HTTP_ENDPOINT

  const httpLink = createUploadLink({
    uri:
      process.client && browserHttpEndpoint ? browserHttpEndpoint : httpEndpoint
  })

  const authLink = setContext((_, { headers }) => {
    // NOTE(cheungpat): Modify request headers as needed.
    return {
      headers: {
        ...headers
      }
    }
  })

  // Create apollo client
  const client = new ApolloClient({
    cache,
    ...(process.server
      ? {
          // Set this on the server to optimize queries when SSR
          ssrMode: true
        }
      : {
          // This will temporary disable query force-fetching
          ssrForceFetchDelay: 100
        }),
    link: authLink.concat(httpLink),
    connectToDevTools: process.env.NODE_ENV !== 'production'
  })

  const apolloProvider = new VueApollo({
    defaultClient: client,
    defaultOptions: { $query: { fetchPolicy: 'cache-and-network' } },

    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        '%cError',
        'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      )
    }
  })

  // Allow access to the provider in the context
  app.apolloProvider = apolloProvider

  if (process.server) {
    const ApolloSSR = require('vue-apollo/ssr')
    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.apollo = ApolloSSR.getStates(apolloProvider)
      // Clear apollo client cache after each request
      // Issues: https://github.com/nuxt-community/apollo-module/issues/273
      //         https://github.com/nuxt-community/apollo-module/issues/251
      Object.keys(apolloProvider.clients).forEach((clientName) => {
        const client = apolloProvider.clients[clientName]
        client.cache.reset()
      })
    })
  }
}
