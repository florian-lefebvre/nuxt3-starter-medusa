<template>
  <div :class="$style.container">
    <div :class="$style.steps">
      <div :class="$style.breadcrumbs">
        <p :class="checkoutStep === 1 ? $style.activeStep : ''">Information</p>
        <p>/</p>
        <p :class="checkoutStep === 2 ? $style.activeStep : ''">Delivery</p>
        <p>/</p>
        <p :class="checkoutStep === 3 ? $style.activeStep : ''">Payment</p>
      </div>
      <CheckoutStepOverview v-if="checkoutStep !== 1" />
      <CheckoutInformationStep
        v-if="checkoutStep === 1"
        :isProcessing="isProcessingInfo"
        :savedValues="{
          ...cart.shipping_address,
          email: cart.email,
          country: cart.region?.countries.find(
            (country) => country.iso_2 === cart.shipping_address?.country_code
          )?.display_name,
        }"
        :handleSubmit="
          (submittedAddr, submittedEmail) =>
            handleShippingSubmit(submittedAddr, submittedEmail)
        "
      />
      <CheckoutShippingStep
        v-else-if="checkoutStep === 2"
        :isProcessing="isProcessingShipping"
        :cart="cart"
        :handleDeliverySubmit="handleDeliverySubmit"
        :savedMethods="cart.shipping_methods"
      />
      <CheckoutPaymentStep v-else-if="checkoutStep === 3" />
      <button
        :class="$style.orderBtn"
        @click="() => updateOrderSummaryDisplay()"
      >
        View Order Summary
      </button>
    </div>
    <div :class="$style.summary">
      <CheckoutSummary :cart="cart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "~/stores/useDisplay";
import { useStore } from "~/stores/useStore";

const { checkoutStep, updateCheckoutStep, updateOrderSummaryDisplay } =
  useDisplay();
const { cart, updateAddress, setShippingMethod } = useStore();
const isProcessingInfo = ref(false);
const isProcessingShipping = ref(false);

const handleShippingSubmit = async (address: string, email: string) => {
  isProcessingInfo.value = true;

  await updateAddress(address, email);

  isProcessingInfo.value = false;
  updateCheckoutStep(2);
};

const handleDeliverySubmit = async (option) => {
  isProcessingShipping.value = true;
  await setShippingMethod(option.id)
    .then(() => {
      updateCheckoutStep(3);
    })
    .finally(() => {
      isProcessingShipping.value = false;
    });
};
</script>

<style module>
.container {
  display: flex;
  height: 100vh;
}

.steps {
  width: 60%;
  height: 100vh;
  padding: 110px 88px 28px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: var(--logo-color-400) transparent;
}

.summary {
  width: 40%;
  display: flex;
  flex-direction: column;
}

.orderBtn {
  width: 100%;
  font-size: 1rem;
  min-height: 3rem;
  padding: 0.5rem 0;
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s ease-in;
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: none;
  justify-self: flex-end;
  background: transparent;
}

.orderBtn:hover {
  background: var(--logo-color-100);
}

.breadcrumbs {
  display: flex;
}

.breadcrumbs p {
  margin-right: 0.5rem;
  color: grey;
  transition: color 0.2s ease-in;
}

.breadcrumbs p:last-child {
  margin-right: 0;
}

.breadcrumbs p.activeStep {
  color: black;
}

@media (max-width: 876px) {
  .container {
    flex-direction: column;
  }
  .steps {
    padding: 0px 22px;
    width: 100%;
    height: 100%;
  }
  .breadcrumbs {
    margin-top: 6rem;
  }
  .orderBtn {
    margin-bottom: 2rem;
    display: block;
  }
}
</style>
