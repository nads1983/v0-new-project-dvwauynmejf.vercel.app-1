export function StripeBuyButton() {
    return (
      <>
        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
        <stripe-buy-button
          buy-button-id="buy_btn_1RGcN0KTTMNdD9LUIopGtCuv"
          publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY} // loading strip key
        ></stripe-buy-button>
      </>
    )
  }
  