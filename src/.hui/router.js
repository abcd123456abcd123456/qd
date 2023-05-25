import { initRouter, initRouterLayout } from '@hsui/core'

export default initRouter(
  [
    {
      path: '/',
      component: initRouterLayout((layout) => {
        return import('@/layouts/' + layout + '.vue')
      }),
      children: [
        {
          name: 'index',
          path: '',
          component: Index,
        },
        {
          name: 'account-index',
          path: 'account',
          component: AccountIndex,
        },
        {
          name: 'liquidation-index',
          path: 'liquidation',
          component: LiquidationIndex,
        },
        {
          name: 'account-account',
          path: 'account/account',
          component: AccountAccount,
        },
        {
          name: 'product-id',
          path: 'product/id',
          component: ProductId,
        },
        {
          name: 'product-list',
          path: 'product/list',
          component: ProductList,
        },
        {
          name: 'trade-business',
          path: 'trade/business',
          component: TradeBusiness,
        },
        {
          name: 'trade-purchase',
          path: 'trade/purchase',
          component: TradePurchase,
        },
        {
          name: 'trade-redeem',
          path: 'trade/redeem',
          component: TradeRedeem,
        },
        {
          name: '__404__',
          path: '*',
          component: __404__,
        },
      ],
    },
  ],
  { base: '/', mode: 'hash' }
)

function Index() {
  return import(/* webpackChunkName: "index" */ '@/views/index.vue')
}
function AccountIndex() {
  return import(
    /* webpackChunkName: "account-index" */ '@/views/account/index.vue'
  )
}
function LiquidationIndex() {
  return import(
    /* webpackChunkName: "liquidation-index" */ '@/views/liquidation/index.vue'
  )
}
function AccountAccount() {
  return import(
    /* webpackChunkName: "account-account" */ '@/views/account/account.vue'
  )
}
function ProductId() {
  return import(/* webpackChunkName: "product-id" */ '@/views/product/id.vue')
}
function ProductList() {
  return import(
    /* webpackChunkName: "product-list" */ '@/views/product/list.vue'
  )
}
function TradeBusiness() {
  return import(
    /* webpackChunkName: "trade-business" */ '@/views/trade/business.vue'
  )
}
function TradePurchase() {
  return import(
    /* webpackChunkName: "trade-purchase" */ '@/views/trade/purchase.vue'
  )
}
function TradeRedeem() {
  return import(
    /* webpackChunkName: "trade-redeem" */ '@/views/trade/redeem.vue'
  )
}
function __404__() {
  return import(/* webpackChunkName: "__404__" */ '@/views/__404__.vue')
}
